import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";
import { learnerApiClient } from "../../lib/api/learner.client";

export interface Learner {
  id: string;
  name: string;
  email: string;
  profileImg?: string;
}

export interface AuthState {
  learner: Learner | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  learner: null,
  accessToken: null,
  refreshToken: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

// Async thunks
export const registerLearner = createAsyncThunk(
  "learner/register",
  async (
    {
      name,
      email,
      password,
      company,
      designation,
      address,
      phone,
    }: { name: string; email: string; password: string; company: string; designation: string; address: string; phone: string },
    thunkAPI
  ) => {
    try {
      const response = await learnerApiClient.register(
        name,
        company,
        email,
        password,
        designation,
        address,
        phone
      );
      const { ...learner } = response;

      console.log(response)

      await SecureStore.setItemAsync("learner", JSON.stringify(learner));

      return { learner };
    } catch (error: any) {
      console.log(error)
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const loginLearner = createAsyncThunk(
  "learner/login",
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      const response = await learnerApiClient.login(email, password);
      const { accessToken, refreshToken, ...learner } = response;

      await SecureStore.setItemAsync("learner", JSON.stringify(learner));

      return { learner, accessToken, refreshToken };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const logoutLearner = createAsyncThunk(
  "learner/logout",
  async (_, thunkAPI) => {
    try {
      await learnerApiClient.logout();
      await SecureStore.deleteItemAsync("learner");
      return true;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "learner/verify-otp",
  async ({ email, otp }: { email: string; otp: string }, thunkAPI) => {
    try {
      const response = await learnerApiClient.verifyOtp(email, otp);
      const { accessToken, refreshToken } = response;

      return { accessToken, refreshToken };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const resendOtp = createAsyncThunk(
  "learner/resend-otp",
  async ({ email }: { email: string }, thunkAPI) => {
    try {
      const response = await learnerApiClient.resendOtp(email);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

const authSlice = createSlice({
  name: "learner",
  initialState,
  reducers: {
    loadLearnerFromStorage: (
      state,
      action: PayloadAction<{
        learner: Learner;
        accessToken: string;
        refreshToken: string;
      }>
    ) => {
      state.learner = action.payload.learner;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerLearner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerLearner.fulfilled, (state, action) => {
        state.loading = false;
        state.learner = action.payload.learner;
        state.isAuthenticated = true;
      })
      .addCase(registerLearner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loginLearner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginLearner.fulfilled, (state, action) => {
        state.loading = false;
        state.learner = action.payload.learner;
      })
      .addCase(loginLearner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutLearner.fulfilled, (state) => {
        state.learner = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = true;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(resendOtp.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { loadLearnerFromStorage } = authSlice.actions;
export default authSlice.reducer;
