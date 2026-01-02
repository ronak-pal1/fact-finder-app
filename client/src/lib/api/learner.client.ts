import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import * as SecureStore from 'expo-secure-store';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'https://factfinderbe.ronakpaul.com/api/v1';

// Types
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  tlsi: string;
  expiresIn: number;
}

interface QueuedRequest {
  resolve: (value: any) => void;
  reject: (error: any) => void;
  config: AxiosRequestConfig;
}

class LearnerApiClient {
  private client: AxiosInstance;
  private isRefreshing = false;
  private failedQueue: QueuedRequest[] = [];

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor to add auth token
    this.client.interceptors.request.use(
      async (config) => {
        const token = await SecureStore.getItemAsync('accessToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
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
              this.failedQueue.push({ resolve, reject, config: originalRequest });
            });
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            const refreshToken = await SecureStore.getItemAsync('refreshToken');
            if (!refreshToken) {
              // No refresh token available, clear everything and redirect to login
              await this.clearAuth();
              return Promise.reject(error);
            }
            
            // Try to refresh the token
            const { data } = await axios.post(`${API_URL}/learner/refresh-token`, {}, {
              headers: {
                'Authorization': `Bearer ${refreshToken}`
              }
            });

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
      }
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

  public async saveTokens(tokens: AuthTokens) {
    await SecureStore.setItemAsync('accessToken', tokens.accessToken);
    await SecureStore.setItemAsync('refreshToken', tokens.refreshToken);
    await SecureStore.setItemAsync('expiresIn', tokens.expiresIn.toString());
  }

  public async clearAuth() {
    await SecureStore.deleteItemAsync('accessToken');
    await SecureStore.deleteItemAsync('refreshToken');
    await SecureStore.deleteItemAsync('expiresIn');
    // You might want to redirect to login here
  }

  // Auth methods
  public async login(email: string, password: string) {
    const response = await this.client.post('/learner/login', { email, password });
    await SecureStore.setItemAsync('tlsi', response.data.tlsi);
    await this.saveTokens(response.data);
    return response.data;
  }

  public async register(name: string, company: string, email: string, password: string, designation: string, address: string, phone: string) {
    const response = await this.client.post('/learner/register', { name, company, email, password, designation, address, phone });

    console.log('Register response:', response.data);
    await SecureStore.setItemAsync('tlsi', response.data.tlsi.toString());
    await this.saveTokens(response.data);
    return response.data;
  }

  public async verifyOtp(email: string, otp: string) {
    const tlsi = await SecureStore.getItemAsync('tlsi');
    const response = await this.client.post('/learner/verify-otp', { email, otp, tlsi });
    await this.saveTokens(response.data);
    return response.data;
  }

  public async resendOtp(email: string) {
    const tlsi = await SecureStore.getItemAsync('tlsi');
    const response = await this.client.post('/learner/resend-otp', { email, tlsi });
    await SecureStore.setItemAsync('tlsi', response.data.tlsi);
    return response.data;
  }

  public async logout() {
    try {
      // Call your backend logout endpoint if you have one
      await this.client.post('/learner/logout');
    } finally {
      await this.clearAuth();
    }
  }

  // Generic HTTP methods
  public get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.get<T>(url, config);
  }

  public post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.client.post<T>(url, data, config);
  }

  public put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.client.put<T>(url, data, config);
  }

  public delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.delete<T>(url, config);
  }
}

export const learnerApiClient = new LearnerApiClient();
