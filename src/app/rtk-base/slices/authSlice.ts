import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/app/utils/axiosConfig';


// export type UserType = 'staff' | 'admin' | 'student';

export interface ProfileImage {
  image_url?: string;
  last_fetch?: string;
}

export interface Level {
  id: number;
  name: string;
  // add other fields from your Level model here if needed
}

export interface User {
  id: number; // Django auto-increment PK
  name?: string;
  email: string;
  password?: string | null;
  access_token?: string | null;
  refresh_token?: string | null;
  // user_type: UserType;
  level?: Level | null;
  student_id?: string | null;
  staff_id?: string | null;
  age?: string | null;
  address?: string | null;
  phone_number?: string | null;
  profile_image?: ProfileImage | null;
  is_admin: boolean;
  is_active: boolean;
  created_at: string; // ISO datetime string
  updated_at: string; // ISO datetime string
}

export interface LocalStorageUserDataSpecs {
  name: string;
  email: string;
  access_token: string | null;
  refresh_token?: string | null;
  // user_type?: UserType;
  level?: Level | null;
  student_id?: string | null;
  staff_id?: string | null;
  age?: string | null;
  address?: string | null;
  phone_number?: string | null;
  profile_image?: ProfileImage | null;
  is_admin?: boolean;
  is_active?: boolean;
}

type InitialStateSpecs = {
  isLoading: boolean;
  userData: User | null;
  localStorageUserData: LocalStorageUserDataSpecs | null;
  userEmail: string | null | undefined;
  userAccessToken: string | null | undefined;
};

const initialState: InitialStateSpecs = {
  isLoading: false,
  userData: null,
  userEmail: null,
  userAccessToken: null,
  localStorageUserData: null,
};

type LoginSpecs = {
  //   name: string;
  email: string;
  password: string;
};

// export type SignUpDataSpecs = {
//   name: string;
//   email: string;
//   password: string;
//   //   confirmPassword: string;
//   profileImage: File | null;
// };

export const handleLogin = createAsyncThunk(
  'auth/handleLogin',
  async (loginData: LoginSpecs, thunkAPI) => {
    try {
      toast.dismiss();

      if (loginData.email == '' || loginData.password == '') {
        toast.error('Please fill in all fields', { duration: 3000 });
        return;
      }

      const loginUrl = `${process.env.NEXT_PUBLIC_API_URL_BASE}/auth/log-in`;

      const loadingId = toast.loading('processing request...');

      const response = await axiosInstance.post(loginUrl, loginData);

      console.log(response);

      const { access_token, user_profile } = response.data.response;

      // Dispatching setUserInfo with both accessToken and userInfo
      thunkAPI.dispatch(
        setUserInfo({
          userInfo: { ...user_profile, access_token: access_token },
        })
      );

      toast.dismiss(loadingId);
      console.log(user_profile);

      return response;
    } catch (error) {
      // Check if `error` is an AxiosError
      console.log(error);

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
  async (signUpData: FormData, thunkAPI) => {
    try {
      toast.dismiss();

      //   const { name, email, password, confirmPassword } = signUpData;

      const signUpUrl = `${process.env.NEXT_PUBLIC_API_URL_BASE}/auth/staff-registration`;

      toast.loading('processing request...');

      const response = await axiosInstance.post(signUpUrl, signUpData);

      console.log(response);

      const { access_token, user_profile } = response.data.response;

      // Dispatching setUserInfo with both accessToken and userInfo
      thunkAPI.dispatch(
        setUserInfo({
          userInfo: { ...user_profile, access_token: access_token },
        })
      );

      toast.dismiss();

      toast.success(
        'Registration was successful. Kindly wait for an admin to approve and grant you access.',
        { duration: 7000 }
      );

      return response;
    } catch (error) {
      // Check if `error` is an AxiosError
      console.log(error);

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
      action: PayloadAction<{
        userInfo: LocalStorageUserDataSpecs;
      }>
    ) => {
      state.localStorageUserData = action.payload.userInfo;
      state.userAccessToken = action.payload.userInfo.access_token;

      try {
        localStorage.setItem(
          'accessToken',
          action.payload.userInfo.access_token || ''
        );
        localStorage.setItem('email', action.payload.userInfo?.email || '');
        localStorage.setItem(
          'userInfo',
          JSON.stringify(action.payload.userInfo)
        );
      } catch (error) {
        console.error('Error saving user info to localStorage:', error);
      }
    },
    clearUserInfo: (state) => {
      try {
        localStorage.clear();
      } catch (error) {
        console.error('Error clearing user info:', error);
      }
    },
    toggleIsLoading: (state, action) => {
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
    builder.addCase(handleSignUp.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(handleSignUp.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(handleSignUp.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { clearUserInfo, setUserInfo, toggleIsLoading } =
  authSlice.actions;

export default authSlice.reducer;
