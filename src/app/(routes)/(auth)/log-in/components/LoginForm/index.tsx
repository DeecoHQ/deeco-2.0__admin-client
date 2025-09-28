'use client';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/rtk-base/store';
import { RootState } from '@/app/rtk-base/store';
import { handleLogin } from '@/app/rtk-base/slices/authSlice';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import { HiMiniEyeSlash, HiMiniEye } from 'react-icons/hi2';

export type ApiError = {
  response?: {
    data?: {
      message?: string;
    };
  };
};

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const { isLoading } = useAppSelector((store: RootState) => store.auth);
  const [showPassword, setShowPassword] = useState(false);

  async function loginUser(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    if (!loginForm.email || !loginForm.password) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      const payload = {
        email: loginForm.email,
        password: loginForm.password,
      };

      const response = await dispatch(handleLogin(payload));

      const loginResponse = response.payload as
        | { data?: { response?: boolean; message?: string } }
        | undefined;

      if (
        handleLogin.fulfilled.match(response) &&
        loginResponse?.data?.response
      ) {
        setLoginForm({ email: '', password: '' });
        router.push('/');
      } else {
        toast.error(
          loginResponse?.data?.message ||
            'Invalid credentials. Please try again.'
        );
      }
    } catch (error) {
      const err = error as ApiError;
      toast.error(err?.response?.data?.message || 'Something went wrong!');
    }
  }

  return (
    <form>
      <div className='input-group flex flex-col mb-6 text-[14px] sm:text-[14px]'>
        <label htmlFor='email'>Email</label>
        <input
          className='mt-2 px-3 py-3 border-gray-300 border outline-none rounded-[10px]'
          type='email'
          placeholder='please input your username'
          id='email'
          value={loginForm.email}
          onChange={(e) => {
            setLoginForm({
              ...loginForm,
              email: e.target.value,
            });
          }}
          required
        />
      </div>

      <div className='input-group flex flex-col mb-6 text-[14px] sm:text-[14px] relative'>
        <label htmlFor='password'>Password</label>
        <input
          className='mt-2 px-3 py-3 border-gray-300 border outline-none rounded-[10px]'
          type={showPassword ? 'text' : 'password'}
          placeholder='please input your password'
          id='password'
          value={loginForm.password}
          onChange={(e) => {
            setLoginForm({
              ...loginForm,
              password: e.target.value,
            });
          }}
          required
        />
        <span
          className='absolute right-3 top-[45px] cursor-pointer'
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <HiMiniEyeSlash className='text-gray-500' />
          ) : (
            <HiMiniEye className='text-gray-500' />
          )}
        </span>
      </div>

      <button
        type='button'
        onClick={loginUser}
        disabled={isLoading}
        className='submit poppins text-center bg-[#043D25] py-3 text-[14px] sm:text-[14px] text-white rounded-[10px] w-full'
      >
        {isLoading ? 'Logging in...' : 'Submit'}
      </button>

      <p className='text-center text-[14px] sm:text-[14px] mt-4'>
        New to Deeco?{' '}
        <Link href='/sign-up' className='underline text-purple-800'>
          sign-up instead
        </Link>
      </p>
    </form>
  );
}
