"use client";

import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import axios from 'axios';
import axiosInstance from '@/app/utils/axiosConfig';

export interface ProfileImage {
  image_url?: string;
  last_fetch?: string;
}

export interface Level {
  id: number;
  name: string;
}

export interface User {
  id: number;
  name?: string;
  email: string;
  password?: string | null;
  access_token?: string | null;
  refresh_token?: string | null;
  level?: Level | null;
  student_id?: string | null;
  staff_id?: string | null;
  age?: string | null;
  address?: string | null;
  phone_number?: string | null;
  profile_image?: ProfileImage | null;
  is_admin: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface StoredUserData {
  id: string;
  name: string;
  email: string;
  is_admin: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  access_token: string;
  refresh_token: string;
  store_identifier?: string; // added here
}

type InitialStateSpecs = {
  isLoading: boolean;
  userData: User | null;
  localStorageUserData: StoredUserData | null;
  userEmail: string | null;
  userAccessToken: string | null;
  userRefreshToken: string | null;
  storeIdentifier?: string; // added here
};

const initialState: InitialStateSpecs = {
  isLoading: false,
  userData: null,
  userEmail: null,
  userAccessToken: null,
  userRefreshToken: null,
  localStorageUserData: null,
  storeIdentifier: undefined,
};

type LoginSpecs = {
  email: string;
  password: string;
};

export const handleLogin = createAsyncThunk(
  'auth/handleLogin',
  async (loginData: LoginSpecs, thunkAPI) => {
    try {
      toast.dismiss();

      if (!loginData.email || !loginData.password) {
        toast.error('Please fill in all fields', { duration: 3000 });
        return;
      }

      const loginUrl = `/api/v1/auth/log-in`;
      const loadingId = toast.loading('processing request...');
      const response = await axiosInstance.post(loginUrl, loginData);

      const { access_token, refresh_token, user_profile } = response.data.response;

      thunkAPI.dispatch(
        setUserInfo({
          userInfo: { ...user_profile, access_token, refresh_token },
        })
      );

      // store store_identifier immediately if present
      if (user_profile.store_identifier) {
        thunkAPI.dispatch(setStoreIdentifier(user_profile.store_identifier));
      }

      toast.dismiss(loadingId);
      toast.success('Login successful!', { duration: 4000 });

      return response;
    } catch (error) {
      toast.dismiss();
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : 'An unexpected error occurred.';
      toast.error(errorMessage);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const handleSignUp = createAsyncThunk(
  'auth/handleStaffRegistration',
  async (signUpData: { email: string; password: string }, thunkAPI) => {
    try {
      toast.dismiss();

      const signUpUrl = `/api/v1/auth/register`;

      const loadingId = toast.loading('processing request...');

      const response = await axiosInstance.post(signUpUrl, signUpData, {
        headers: { 'Content-Type': 'application/json' },
      });

      const { access_token, refresh_token, user_profile } =
        response.data.response;

      thunkAPI.dispatch(
        setUserInfo({
          userInfo: { ...user_profile, access_token, refresh_token },
        })
      );

      toast.dismiss(loadingId);
      toast.success('Registration successful!', { duration: 5000 });

      return response;
    } catch (error) {
      toast.dismiss();
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : 'An unexpected error occurred.';
      toast.error(errorMessage);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserInfo: (
      state,
      action: PayloadAction<{ userInfo: StoredUserData }>
    ) => {
      state.localStorageUserData = action.payload.userInfo;
      state.userAccessToken = action.payload.userInfo.access_token;
      state.userRefreshToken = action.payload.userInfo.refresh_token || null;
      state.userEmail = action.payload.userInfo.email;
      if (action.payload.userInfo.store_identifier) {
        state.storeIdentifier = action.payload.userInfo.store_identifier;
        localStorage.setItem('storeIdentifier', action.payload.userInfo.store_identifier);
      }

      try {
        localStorage.setItem('accessToken', action.payload.userInfo.access_token || '');
        localStorage.setItem('refreshToken', action.payload.userInfo.refresh_token || '');
        localStorage.setItem('email', action.payload.userInfo.email || '');
        localStorage.setItem('userInfo', JSON.stringify(action.payload.userInfo));
        localStorage.setItem('accessTokenSetTime', Date.now().toString());
      } catch (error) {
        console.error('Error saving user info to localStorage:', error);
      }
    },

    setAccessToken: (state, action: PayloadAction<string>) => {
      state.userAccessToken = action.payload;
      try {
        localStorage.setItem('accessToken', action.payload);
        localStorage.setItem('accessTokenSetTime', Date.now().toString());
      } catch (error) {
        console.error('Error saving access token:', error);
      }
    },

    setStoreIdentifier: (state, action: PayloadAction<string>) => {
      state.storeIdentifier = action.payload;
      try {
        localStorage.setItem('storeIdentifier', action.payload);
      } catch (error) {
        console.error('Error saving store identifier:', error);
      }
    },

    clearUserInfo: (state) => {
      try {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('email');
        localStorage.removeItem('userInfo');
        localStorage.removeItem('accessTokenSetTime');
        localStorage.removeItem('storeIdentifier');

        state.localStorageUserData = null;
        state.userAccessToken = null;
        state.userRefreshToken = null;
        state.userEmail = null;
        state.storeIdentifier = undefined;
      } catch (error) {
        console.error('Error clearing user info:', error);
      }
    },

    toggleIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(handleLogin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(handleLogin.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(handleLogin.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { clearUserInfo, setUserInfo, toggleIsLoading, setAccessToken, setStoreIdentifier } =
  authSlice.actions;

export default authSlice.reducer;
