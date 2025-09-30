"use client";

import React from "react";

type Props = {
  type: "create" | "update";
};

const BrandForm: React.FC<Props> = ({ type }) => {
  if (type === 'create') {
    return (
      <div className='w-full mx-auto px-3 pb-4'>
        <form className='flex flex-col'>
          <label
            htmlFor='brand_name'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            Brand Name
          </label>
          <input
            type='text'
            id='brand_name'
            name='brand_name'
            placeholder='Brand Name'
            className='border border-gray-300 text-[12px] px-4 py-3 w-full rounded-[10px]'
            required
          />
          <label
            htmlFor='brand_description'
            className='block text-sm font-medium text-gray-700 mt-3 mb-2'
          >
            Brand Description
          </label>
          <textarea
            id='brand_description'
            name='brand_description'
            placeholder='Brand Description'
            className='border border-gray-300 text-[12px] px-4 py-3 w-full rounded-[10px]'
            required
          />
          <label
            htmlFor='brand_image'
            className='block text-sm font-medium text-gray-700 mt-3 mb-2'
          >
            Brand Image/Icon
          </label>
          <input
            type='file'
            accept='image/*'
            id='product_image'
            // onChange={handleFileChange}
            // required={mode === 'create'}
          />
          <button
            type='submit'
            className='mt-6 bg-[#043D25] text-white px-4 py-2.5 rounded-[10px] w-full hover:bg-[#043D25] disabled:opacity-50'
          >
            Create Brand
          </button>
        </form>
      </div>
    );
  }

  if (type === 'update') {
    return (
      <div className='w-full mx-auto px-3 pb-4'>
        <form className='flex flex-col'>
          <label
            htmlFor='brand_id'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            Brand ID
          </label>
          <input
            type='text'
            id='brand_id'
            name='brand_id'
            placeholder='Brand ID'
            className='border border-gray-300 text-[12px] px-4 py-3 w-full rounded-[10px]'
            required
          />
          <label
            htmlFor='updated_brand_name'
            className='block text-sm font-medium text-gray-700 mt-3 mb-2'
          >
            Updated Brand Name
          </label>
          <input
            type='text'
            id='updated_brand_name'
            name='updated_brand_name'
            placeholder='Updated Brand Name'
            className='border border-gray-300 text-[12px] px-4 py-3 w-full rounded-[10px]'
            required
          />
          <label
            htmlFor='updated_description'
            className='block text-sm font-medium text-gray-700 mt-3 mb-2'
          >
            Updated Description
          </label>
          <textarea
            id='updated_description'
            name='updated_description'
            placeholder='Updated Description'
            className='border border-gray-300 text-[12px] px-4 py-3 w-full rounded-[10px]'
            required
          />
          <label
            htmlFor='brand_image'
            className='block text-sm font-medium text-gray-700 mt-3 mb-2'
          >
            Brand Image/Icon
          </label>
          <input
            type='file'
            accept='image/*'
            id='product_image'
            // onChange={handleFileChange}
            // required={mode === 'create'}
          />
          <button
            type='submit'
            className='mt-6 bg-[#043D25] text-white px-4 py-2.5 rounded-[10px] w-full hover:bg-[#043D25] disabled:opacity-50'
          >
            Update Brand
          </button>
        </form>
      </div>
    );
  }

  return null;
};

export default BrandForm;
