'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '@/app/rtk-base/store';
import { RootState } from '@/app/rtk-base/store';
// import { handleSignUp } from '@/app/rtk-base/slices/authSlice';

export type ApiError = {
  response?: {
    data?: {
      message?: string;
    };
  };
};

const ProfileSettingsForm = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((store: RootState) => store.auth);
  const router = useRouter();

  const [profileForm, setProfileForm] = useState({
    name: '',
    email: '',
  });

  // async function updateProfile(event: React.MouseEvent<HTMLButtonElement>) {
  //   event.preventDefault();

  //   const { name, email } = profileForm;

  //   // 🔹 Validations
  //   if (!name || !email) {
  //     toast.error('Please fill in all fields');
  //     return;
  //   }

  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   if (!emailRegex.test(email)) {
  //     toast.error('Please enter a valid email address');
  //     return;
  //   }

  //   const payload = {
  //     name,
  //     email,
  //   };

  //   try {
  //     const resultAction = await dispatch(handleSignUp(payload));

  //     if (handleSignUp.fulfilled.match(resultAction)) {
  //       setProfileForm({
  //         name: '',
  //         email: '',
  //       });

  //       router.push('/');
  //     } else {
  //       const err = resultAction.payload as ApiError;
  //       toast.error(
  //         err?.response?.data?.message || 'Update failed. Please try again.'
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
        <div className='full-name input-group flex flex-col mb-6 text-[14px] sm:text-[14px]'>
          <label htmlFor='full-name'>Full name</label>
          <input
            className='mt-2 px-3 py-3 border-gray-300 border outline-none rounded-[10px]'
            type='text'
            placeholder='please input your full name'
            id='fullName'
            value={profileForm.name}
            onChange={(e) =>
              setProfileForm({
                ...profileForm,
                name: e.target.value,
              })
            }
            required
          />
        </div>
        <div className='email input-group flex flex-col mb-6 text-[14px] sm:text-[14px]'>
          <label htmlFor='email'>Email</label>
          <input
            className='mt-2 px-3 py-3 border-gray-300 border outline-none rounded-[10px]'
            type='email'
            placeholder='please add your email address'
            id='email'
            value={profileForm.email}
            onChange={(e) =>
              setProfileForm({
                ...profileForm,
                email: e.target.value,
              })
            }
            required
          />
        </div>
        <section className='flex'>
          <button
            type='button'
            // onClick={updateProfile}
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

export default ProfileSettingsForm;
