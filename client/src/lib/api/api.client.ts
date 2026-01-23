import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import * as SecureStore from "expo-secure-store";
import { AuthTokens } from "../services/learner/auth.service";

const API_URL =
  process.env.EXPO_PUBLIC_API_URL ||
  "https://factfinderbe.ronakpaul.com/api/v1";

interface QueuedRequest {
  resolve: (value: any) => void;
  reject: (error: any) => void;
  config: AxiosRequestConfig;
}

export class ApiClient {
  private client: AxiosInstance;
  private isRefreshing = false;
  private failedQueue: QueuedRequest[] = [];

  constructor(urlSuffix?: string) {
    this.client = axios.create({
      baseURL: urlSuffix ? API_URL + urlSuffix : API_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor to add auth token
    this.client.interceptors.request.use(
      async (config) => {
        const token = await SecureStore.getItemAsync("accessToken");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    // Response interceptor for handling 401 errors and token refresh
    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as any;

        // If the error is 401 and we haven't tried to refresh yet
        if (error.response?.status === 401 && !originalRequest._retry) {
          if (this.isRefreshing) {
            // If we're already refreshing, add the request to the queue
            return new Promise((resolve, reject) => {
              this.failedQueue.push({
                resolve,
                reject,
                config: originalRequest,
              });
            });
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            const refreshToken = await SecureStore.getItemAsync("refreshToken");
            if (!refreshToken) {
              return Promise.reject(error);
            }

            // Try to refresh the token
            const { data } = await axios.post(
              `${API_URL}/learner/refresh-token`,
              {},
              {
                headers: {
                  Authorization: `Bearer ${refreshToken}`,
                },
              },
            );

            // Save the new tokens
            await this.saveTokens(data);

            // Update the Authorization header
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
            }

            // Retry all queued requests
            this.processQueue(null, data.accessToken);

            // Retry the original request
            return this.client(originalRequest);
          } catch (refreshError) {
            // If refresh fails, clear everything and reject all queued requests
            await this.clearAuth();
            this.processQueue(refreshError, null);
            return Promise.reject(refreshError);
          } finally {
            this.isRefreshing = false;
          }
        }

        return Promise.reject(error);
      },
    );
  }

  private processQueue(error: any, token: string | null = null) {
    this.failedQueue.forEach((promise) => {
      if (error) {
        promise.reject(error);
      } else if (token) {
        // Update the token in the config and resolve the promise
        if (promise.config.headers) {
          promise.config.headers.Authorization = `Bearer ${token}`;
        }
        this.client(promise.config).then(promise.resolve).catch(promise.reject);
      }
    });
    this.failedQueue = [];
  }

  public get<T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.client.get<T>(url, config);
  }

  public post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.client.post<T>(url, data, config);
  }

  public put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.client.put<T>(url, data, config);
  }

  public delete<T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.client.delete<T>(url, config);
  }

  public upload<T = any>(
    url: string,
    data: FormData,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.client.post<T>(url, data, {
      ...config,
      headers: {
        "Content-Type": "multipart/form-data",
        ...config?.headers,
      },
    });
  }

  public async saveTokens(tokens: AuthTokens) {
    await SecureStore.setItemAsync("accessToken", tokens.accessToken);
    await SecureStore.setItemAsync("refreshToken", tokens.refreshToken);
    // await SecureStore.setItemAsync('expiresIn', tokens.expiresIn.toString());
  }

  public async clearAuth() {
    await SecureStore.deleteItemAsync("accessToken");
    await SecureStore.deleteItemAsync("refreshToken");
    await SecureStore.deleteItemAsync("expiresIn");
    await SecureStore.deleteItemAsync("tlsi");
  }
}
