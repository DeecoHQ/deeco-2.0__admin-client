'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '@/app/rtk-base/store';
import { RootState } from '@/app/rtk-base/store';
// import { handleUpdatePassword } from '@/app/rtk-base/slices/authSlice';
import { HiMiniEyeSlash, HiMiniEye } from 'react-icons/hi2';

export type ApiError = {
  response?: {
    data?: {
      message?: string;
    };
  };
};

const PasswordSettingsForm = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((store: RootState) => store.auth);
  const router = useRouter();

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [form, setForm] = useState({
    oldPassword: '',
    password: '',
    confirmPassword: '',
  });

  // async function updatePassword(event: React.MouseEvent<HTMLButtonElement>) {
  //   event.preventDefault();

  //   const { oldPassword, password, confirmPassword } = form;

  //   // 🔹 Validations
  //   if (!oldPassword || !password || !confirmPassword) {
  //     toast.error('Please fill in all fields');
  //     return;
  //   }

  //   if (password !== confirmPassword) {
  //     toast.error('Passwords do not match');
  //     return;
  //   }

  //   if (password.length < 6) {
  //     toast.error('Password must be at least 6 characters');
  //     return;
  //   }

  //   const payload = {
  //     oldPassword: form.oldPassword,
  //     password: form.password,
  //   };

  //   try {
  //     const resultAction = await dispatch(handleUpdatePassword(payload));

  //     if (handleUpdatePassword.fulfilled.match(resultAction)) {
  //       setForm({ oldPassword: '', password: '', confirmPassword: '' });
  //       toast.success('Password updated successfully');
  //       router.push('/');
  //     } else {
  //       const err = resultAction.payload as ApiError;
  //       toast.error(
  //         err?.response?.data?.message ||
  //           'Password update failed. Please try again.'
  //       );
  //     }
  //   } catch (error) {
  //     const err = error as ApiError;
  //     toast.error(err?.response?.data?.message || 'Something went wrong!');
  //   }
  // }

  return (
    <div>
      <form>
        {/* Old Password */}
        <div className='old-password input-group flex flex-col mb-6 text-[14px] sm:text-[14px] relative'>
          <label htmlFor='old-password'>Old Password</label>
          <input
            className='mt-2 px-3 py-3 border-gray-300 border outline-none rounded-[10px]'
            type={showOldPassword ? 'text' : 'password'}
            placeholder='enter your current password'
            id='old-password'
            value={form.oldPassword}
            onChange={(e) =>
              setForm({
                ...form,
                oldPassword: e.target.value,
              })
            }
            required
          />
          <span
            className='absolute right-3 top-[45px] cursor-pointer'
            onClick={() => setShowOldPassword(!showOldPassword)}
          >
            {showOldPassword ? (
              <HiMiniEyeSlash className='text-gray-500' />
            ) : (
              <HiMiniEye className='text-gray-500' />
            )}
          </span>
        </div>

        {/* New Password */}
        <div className='password input-group flex flex-col mb-6 text-[14px] sm:text-[14px] relative'>
          <label htmlFor='password'>New Password</label>
          <input
            className='mt-2 px-3 py-3 border-gray-300 border outline-none rounded-[10px]'
            type={showPassword ? 'text' : 'password'}
            placeholder='please input your new password'
            id='password'
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
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

        {/* Confirm Password */}
        <div className='confirm-password input-group flex flex-col mb-6 text-[14px] sm:text-[14px] relative'>
          <label htmlFor='confirm-password'>Confirm New Password</label>
          <input
            className='mt-2 px-3 py-3 border-gray-300 border outline-none rounded-[10px]'
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder='re-enter password to confirm'
            id='confirm-password'
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({
                ...form,
                confirmPassword: e.target.value,
              })
            }
            required
          />
          <span
            className='absolute right-3 top-[45px] cursor-pointer'
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <HiMiniEyeSlash className='text-gray-500' />
            ) : (
              <HiMiniEye className='text-gray-500' />
            )}
          </span>
        </div>

        <section className='flex'>
          <button
            type='button'
            // onClick={updatePassword}
            disabled={isLoading}
            className='submit poppins text-center bg-[#043D25] py-3 text-[12px] text-white rounded-[10px] w-[150px]'
          >
            {isLoading ? 'Submitting...' : 'Update'}
          </button>
        </section>
      </form>
    </div>
  );
};

export default PasswordSettingsForm;
