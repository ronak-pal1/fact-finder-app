import { learnerApiClient } from "@/lib/api/learner.client";
import * as SecureStore from "expo-secure-store";

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

class AuthService {
  public async login(email: string, password: string) {
    const response = await learnerApiClient.post<any>("/login", {
      email,
      password,
    });
    if (response.data.tlsi) {
      await SecureStore.setItemAsync("tlsi", response.data.tlsi);
    }
    await learnerApiClient.saveTokens(response.data);
    return response.data;
  }

  public async register(
    name: string,
    company: string,
    email: string,
    password: string,
    designation: string,
    address: string,
    phone: string,
  ) {
    const response = await learnerApiClient.post<any>("/register", {
      name,
      company,
      email,
      password,
      designation,
      address,
      phone,
    });

    if (response.data.tlsi) {
      await SecureStore.setItemAsync("tlsi", response.data.tlsi.toString());
    }
    await learnerApiClient.saveTokens(response.data);
    return response.data;
  }

  public async verifyOtp(email: string, otp: string) {
    const tlsi = await SecureStore.getItemAsync("tlsi");
    const response = await learnerApiClient.post<any>("/verify-otp", {
      email,
      otp,
      tlsi,
    });

    if (response.data.accessToken) {
      await learnerApiClient.saveTokens(response.data);
    }
    return response.data;
  }

  public async resendOtp(email: string) {
    const tlsi = await SecureStore.getItemAsync("tlsi");
    const response = await learnerApiClient.post<any>("/resend-otp", {
      email,
      tlsi,
    });

    if (response.data.tlsi) {
      await SecureStore.setItemAsync("tlsi", response.data.tlsi);
    }
    return response.data;
  }

  public async logout() {
    try {
      await learnerApiClient.post("/logout");
    } finally {
      await learnerApiClient.clearAuth();
    }
  }

  public async isAuthenticated(): Promise<boolean> {
    const token = await SecureStore.getItemAsync("accessToken");
    return !!token;
  }
}

export const authService = new AuthService();
