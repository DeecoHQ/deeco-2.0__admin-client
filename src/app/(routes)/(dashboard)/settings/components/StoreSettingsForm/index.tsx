'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '@/app/rtk-base/store';
import { RootState } from '@/app/rtk-base/store';
// import { handleUpdateStoreSettings } from '@/app/rtk-base/slices/storeSlice';

export type ApiError = {
  response?: {
    data?: {
      message?: string;
    };
  };
};

const StoreSettingsForm = () => {
  const dispatch = useAppDispatch();
  const isLoading = false;
  // const { isLoading } = useAppSelector((store: RootState) => store.store);
  const router = useRouter();

  const [storeForm, setStoreForm] = useState({
    storeIdentifier: '',
    storeName: '',
    storeIntro: '',
  });

  return (
    <div>
      <form>
        {/* Store Identifier */}
        <div className='store-identifier input-group flex flex-col mb-6 text-[14px] sm:text-[14px]'>
          <label htmlFor='storeIdentifier'>
            Store Identifier{' '}
            <span className='text-[12px] text-red-500'>
              (Do not add any spaces. Only alphanumerics with hyphens or
              underscores)
            </span>
          </label>
          <input
            className='mt-2 px-3 py-3 border-gray-300 border outline-none rounded-[10px]'
            type='text'
            placeholder='please input your store identifier'
            id='storeIdentifier'
            value={storeForm.storeIdentifier}
            onChange={(e) =>
              setStoreForm({
                ...storeForm,
                storeIdentifier: e.target.value,
              })
            }
            required
          />
        </div>

        {/* Store Name */}
        <div className='store-name input-group flex flex-col mb-6 text-[14px] sm:text-[14px]'>
          <label htmlFor='storeName'>Store Name</label>
          <input
            className='mt-2 px-3 py-3 border-gray-300 border outline-none rounded-[10px]'
            type='text'
            placeholder='please input your store name'
            id='storeName'
            value={storeForm.storeName}
            onChange={(e) =>
              setStoreForm({
                ...storeForm,
                storeName: e.target.value,
              })
            }
            required
          />
        </div>
        {/* Store Intro */}
        <div className='store-intro input-group flex flex-col mb-6 text-[14px] sm:text-[14px]'>
          <label htmlFor='storeIntro'>Store Intro</label>
          <textarea
            className='mt-2 px-3 py-3 border-gray-300 border outline-none rounded-[10px] resize-none'
            placeholder='brief introduction about your store'
            id='storeIntro'
            rows={4}
            value={storeForm.storeIntro}
            onChange={(e) =>
              setStoreForm({
                ...storeForm,
                storeIntro: e.target.value,
              })
            }
          />
        </div>
        <div className='profile-image input-group flex flex-col mb-6 text-[14px] sm:text-[14px]'>
          <label htmlFor='profile-image'>Store Avatar</label>{' '}
          <input
            type='file'
            accept='image/*'
            id='product_image'
            className='mt-3'
            // onChange={handleFileChange}
            // required={mode === 'create'}
          />
        </div>
        {/* Submit Button */}
        <section className='flex'>
          <button
            type='button'
            // onClick={saveStoreSettings}
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

export default StoreSettingsForm;
