"use client";

import React from "react";

type Props = {
  type: "create" | "update";
};

const CategoryForm: React.FC<Props> = ({ type }) => {
  if (type === 'create') {
    return (
      <div className='w-full mx-auto px-3 pb-4'>
        <form className='flex flex-col'>
          <label
            htmlFor='category_name'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            Category Name
          </label>
          <input
            type='text'
            id='category_name'
            name='category_name'
            placeholder='Category Name'
            className='border border-gray-300 text-[12px] px-4 py-3 w-full rounded-[10px]'
            required
          />
          <label
            htmlFor='category_description'
            className='block text-sm font-medium text-gray-700 mt-3 mb-2'
          >
            Category Description
          </label>
          <textarea
            id='category_description'
            name='category_description'
            placeholder='Category Description'
            className='border border-gray-300 text-[12px] px-4 py-3 w-full rounded-[10px]'
            required
          />
          <label
            htmlFor='brand_image'
            className='block text-sm font-medium text-gray-700 mt-3 mb-2'
          >
            Category Image/Icon
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
            Create Category
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
            htmlFor='category_id'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            Category ID
          </label>
          <input
            type='text'
            id='category_id'
            name='category_id'
            placeholder='Category ID'
            className='border border-gray-300 text-[12px] px-4 py-3 w-full rounded-[10px]'
            required
          />
          <label
            htmlFor='updated_category_name'
            className='block text-sm font-medium text-gray-700 mt-3 mb-2'
          >
            Updated Category Name
          </label>
          <input
            type='text'
            id='updated_category_name'
            name='updated_category_name'
            placeholder='Updated Category Name'
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
            Category Image/Icon
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
            Update Category
          </button>
        </form>
      </div>
    );
  }

  return null;
};

export default CategoryForm;
