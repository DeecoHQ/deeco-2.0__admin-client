'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '@/app/rtk-base/store';
import { RootState } from '@/app/rtk-base/store';
import { handleSignUp } from '@/app/rtk-base/slices/authSlice';

export type ApiError = {
  response?: {
    data?: {
      message?: string;
    };
  };
};

const SignUpForm = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((store: RootState) => store.auth);
  const router = useRouter();

  const [signUpForm, setSignUpForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  async function signUpUser(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    const { name, email, password, confirmPassword } = signUpForm;

    // 🔹 Validations
    if (!name || !email || !password || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

   const payload = {
      name: signUpForm.name, 
      email: signUpForm.email,
      password: signUpForm.password,
    };

    try {
      const resultAction = await dispatch(handleSignUp(payload));

      if (handleSignUp.fulfilled.match(resultAction)) {
        toast.success('Account created successfully!');

        setSignUpForm({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        });

        router.push('/');
      } else {
        const err = resultAction.payload as ApiError;
        toast.error(err?.response?.data?.message || 'Signup failed. Please try again.');
      }
    } catch (error) {
      const err = error as ApiError;
      toast.error(err?.response?.data?.message || 'Something went wrong!');
    }
  }

  return (
    <div>
      <form>
        <div className='full-name input-group flex flex-col mb-6 text-[14px] sm:text-[14px]'>
          <label htmlFor='full-name'>Full name</label>
          <input
            className='mt-2 px-3 py-3 border-gray-300 border outline-none rounded'
            type='text'
            placeholder='please input your full name'
            id='fullName'
            value={signUpForm.name}
            onChange={(e) =>
              setSignUpForm({
                ...signUpForm,
                name: e.target.value,
              })
            }
            required
          />
        </div>
        <div className='email input-group flex flex-col mb-6 text-[14px] sm:text-[14px]'>
          <label htmlFor='email'>Email</label>
          <input
            className='mt-2 px-3 py-3 border-gray-300 border outline-none rounded'
            type='email'
            placeholder='please add your email address'
            id='email'
            value={signUpForm.email}
            onChange={(e) =>
              setSignUpForm({
                ...signUpForm,
                email: e.target.value,
              })
            }
            required
          />
        </div>
        <div className='password input-group flex flex-col mb-6 text-[14px] sm:text-[14px]'>
          <label htmlFor='password'>Password</label>
          <input
            className='mt-2 px-3 py-3 border-gray-300 border outline-none rounded'
            type='password'
            placeholder='please input your password'
            id='password'
            value={signUpForm.password}
            onChange={(e) =>
              setSignUpForm({
                ...signUpForm,
                password: e.target.value,
              })
            }
            required
          />
        </div>
        <div className='confirm-password input-group flex flex-col mb-6 text-[14px] sm:text-[14px]'>
          <label htmlFor='confirm-password'>Confirm password</label>
          <input
            className='mt-2 px-3 py-3 border-gray-300 border outline-none rounded'
            type='password'
            required
            placeholder='re-enter password to confirm'
            id='confirm-password'
            value={signUpForm.confirmPassword}
            onChange={(e) =>
              setSignUpForm({
                ...signUpForm,
                confirmPassword: e.target.value,
              })
            }
          />
        </div>
        <button
          type='button'
          onClick={signUpUser}
          disabled={isLoading}
          className='submit poppins text-center bg-[#043D25] py-3 text-[14px] sm:text-[14px] text-white rounded w-full'
        >
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
        <p className='text-center text-[14px] sm:text-[14px] mt-4'>
          Have an account?{' '}
          <Link href='/log-in' className='underline text-purple-800'>
            log-in instead
          </Link>{' '}
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;
