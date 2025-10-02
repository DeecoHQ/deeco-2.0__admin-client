'use client';

import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '@/app/rtk-base/store';
import { RootState } from '@/app/rtk-base/store';
// import { handleUpdateAdmin } from '@/app/rtk-base/slices/adminSlice'; // 🔹 new slice/action

export type ApiError = {
  response?: {
    data?: {
      message?: string;
    };
  };
};

const OnchainAdministratorSettingsForm = () => {
  const dispatch = useAppDispatch();
  const isLoading = false;
  // const { isLoading } = useAppSelector((store: RootState) => store.admin);

  const [adminForm, setAdminForm] = useState({
    admin: '',
  });

  // async function updateAdmin(event: React.MouseEvent<HTMLButtonElement>) {
  //   event.preventDefault();

  //   const { admin } = adminForm;

  //   // 🔹 Validations
  //   if (!admin) {
  //     toast.error('Admin address is required');
  //     return;
  //   }

  //   // Basic Ethereum address validation (0x + 40 hex chars)
  //   const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;
  //   if (!ethAddressRegex.test(admin)) {
  //     toast.error('Please enter a valid Ethereum address');
  //     return;
  //   }

  //   const payload = {
  //     admin,
  //   };

  //   try {
  //     const resultAction = await dispatch(handleUpdateAdmin(payload));

  //     if (handleUpdateAdmin.fulfilled.match(resultAction)) {
  //       setAdminForm({ admin: '' });
  //       toast.success('Admin updated successfully!');
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
        <div className='admin input-group flex flex-col mb-6 text-[14px] sm:text-[14px]'>
          <label htmlFor='admin'>Add New Admin</label>
          <input
            className='mt-2 px-3 py-3 border-gray-300 border outline-none rounded-[10px]'
            type='text'
            placeholder='Enter admin address (0x...)'
            id='admin'
            value={adminForm.admin}
            onChange={(e) =>
              setAdminForm({
                ...adminForm,
                admin: e.target.value,
              })
            }
            required
          />
        </div>

        <section className='flex'>
          <button
            type='button'
            // onClick={updateAdmin}
            disabled={isLoading}
            className='submit poppins text-center bg-[#043D25] py-3 text-[12px] text-white rounded-[10px] w-[150px]'
          >
            {isLoading ? 'Submitting...' : 'Add Admin'}
          </button>
        </section>
      </form>
    </div>
  );
};

export default OnchainAdministratorSettingsForm;
