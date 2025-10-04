"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/rtk-base/hook";
import {
  createProduct,
  updateProduct,
  getProductById,
} from "@/app/rtk-base/slices/Inventory/productSlice";
import toast from "react-hot-toast";
import { selectStoreIdentifier } from "@/app/rtk-base/slices/Inventory/productSlice";

type ProductFormProps = {
  mode: "create" | "update";
  id?: number;
};


const ProductForm: React.FC<ProductFormProps> = ({ mode, id }) => {
  const dispatch = useAppDispatch();
  const store_identifier = useAppSelector(selectStoreIdentifier);
  const { product, loading } = useAppSelector((state) => state.products);

  // 👇 single form state (renamed to avoid redeclare issue)
  const [formDataState, setFormDataState] = useState({
    product_name: '',
    product_type: 'physical product',
    product_description: '',
    real_price: '',
    discount_price: '',
    stock: '',
    is_free_delivery_available: false,
    rating: 0,
  });

  const [file, setFile] = useState<File | null>(null);
  const [isFilePicked, setIsFilePicked] = useState(false);

  // Fetch product if in update mode
  useEffect(() => {
    if (mode === 'update' && id) {
      dispatch(getProductById(id));
    }
  }, [mode, id, dispatch]);

  // Prefill form when product is loaded
  useEffect(() => {
    if (mode === 'update' && product && product.id === id) {
      setFormDataState({
        product_name: product.product_name || '',
        product_type: product.product_type || 'physical product',
        product_description: product.product_description || '',
        real_price: product.real_price?.toString() || '',
        discount_price: product.discount_price?.toString() || '',
        stock: product.stock?.toString() || '',
        is_free_delivery_available: !!product.is_free_delivery_available,
        rating: product.rating,
      });
    }
  }, [product, mode, id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox' && e.target instanceof HTMLInputElement) {
      setFormDataState({
        ...formDataState,
        [name]: e.target.checked,
      });
    } else {
      setFormDataState({
        ...formDataState,
        [name]: value,
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setIsFilePicked(true);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!formDataState.product_name || !formDataState.product_description) {
      toast.error('Please fill in all required fields', { duration: 3000 });
      return;
    }

    if (!isFilePicked && mode === 'create') {
      toast.error('Please upload a product image', { duration: 3000 });
      return;
    }

    const formData = new FormData();
    formData.append('product_name', formDataState.product_name);
    formData.append('product_type', formDataState.product_type);
    formData.append('product_description', formDataState.product_description);
    formData.append('real_price', formDataState.real_price);
    formData.append('discount_price', formDataState.discount_price);
    formData.append('stock', formDataState.stock);
    formData.append('rating', String(formDataState.rating));
    formData.append(
      'is_free_delivery_available',
      formDataState.is_free_delivery_available.toString()
    );
    // if (file) {
    //   formData.append('product_image', file); //
    // }
    if (file) {
        if (!['image/jpeg', 'image/png'].includes(file.type)) {
          toast.error("Only JPG or PNG allowed");
          return;
        }
        if (file.size > 2 * 1024 * 1024) {
          toast.error("File size must be less than 2MB");
          return;
        }
        formData.append("product_image", file);
      }


    console.log(formData);
    console.log(file);

    try {
      if (mode === 'create') {
        await dispatch(
          createProduct({
            productData: formData,
            store_identifier: store_identifier || '',
          })
        );

        // reset state after successful create
        setFormDataState({
          product_name: '',
          product_type: '',
          product_description: '',
          real_price: '',
          discount_price: '',
          stock: '',
          is_free_delivery_available: false,
          rating: 0,
        });
        setFile(null);
        setIsFilePicked(false);
      } else if (mode === 'update' && id) {
        await dispatch(
          updateProduct({
            id: id,
            formData,
            store_identifier: store_identifier || '',
          })
        );
      }
    } catch (err) {
      console.error('Submit error:', err);
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error('Failed to submit');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className='w-full mx-auto px-3 pb-4'>
      <label
        htmlFor='product_name'
        className='block text-sm font-medium text-gray-700 mb-2'
      >
        Product Name
      </label>
      <input
        type='text'
        name='product_name'
        id='product_name'
        placeholder='Product Name'
        value={formDataState.product_name}
        onChange={handleChange}
        required
        className='border border-gray-300 text-[12px] px-4 py-3 w-full rounded-[10px]'
      />

      <label
        htmlFor='product_type'
        className='block text-sm font-medium text-gray-700 mt-3 mb-2'
      >
        Product Type
      </label>
      <select
        name='product_type'
        id='product_type'
        value={formDataState.product_type}
        onChange={handleChange}
        required
        className='border border-gray-300 text-[12px] px-4 py-3 w-full rounded-[10px]'
      >
        <option value='physical product'>Physical Product</option>
        <option value='digital product'>Digital Product</option>
      </select>

      <label
        htmlFor='product_description'
        className='block text-sm font-medium text-gray-700 mt-3 mb-2'
      >
        Product Description
      </label>
      <textarea
        name='product_description'
        id='product_description'
        placeholder='Product Description'
        value={formDataState.product_description}
        onChange={handleChange}
        required
        className='border border-gray-300 text-[12px] px-4 py-3 w-full rounded-[10px]'
        rows={10}
        cols={40}
      />

      <label
        htmlFor='real_price'
        className='block text-sm font-medium text-gray-700 mt-3 mb-2'
      >
        Real Price
      </label>
      <input
        type='number'
        step='0.01'
        name='real_price'
        id='real_price'
        placeholder='Real Price'
        value={formDataState.real_price}
        onChange={handleChange}
        required
        className='border border-gray-300 text-[12px] px-4 py-3 w-full rounded-[10px]'
      />

      <label
        htmlFor='discount_price'
        className='block text-sm font-medium text-gray-700 mt-3 mb-2'
      >
        Discount Price
      </label>
      <input
        type='number'
        step='0.01'
        name='discount_price'
        id='discount_price'
        placeholder='Discount Price'
        value={formDataState.discount_price}
        onChange={handleChange}
        required
        className='border border-gray-300 text-[12px] px-4 py-3 w-full rounded-[10px]'
      />

      <label
        htmlFor='stock'
        className='block text-sm font-medium text-gray-700 mt-3 mb-2'
      >
        Stock Quantity
      </label>
      <input
        type='number'
        name='stock'
        id='stock'
        placeholder='Stock Quantity'
        value={formDataState.stock}
        onChange={handleChange}
        required
        className='border border-gray-300 text-[12px] px-4 py-3 w-full rounded-[10px]'
      />

      <label
        className='flex items-center gap-2 mt-4 text-sm'
        htmlFor='is_free_delivery_available'
      >
        <input
          type='checkbox'
          name='is_free_delivery_available'
          id='is_free_delivery_available'
          checked={formDataState.is_free_delivery_available}
          onChange={handleChange}
          className='h-4 w-4'
        />
        Free Delivery Available?
      </label>

      <label
        htmlFor='product_image'
        className='block text-sm font-medium text-gray-700 mt-3 mb-2'
      >
        Product Image
      </label>
      {/* <input
        type='file'
        accept='image/*'
        id='product_image'
        onChange={handleFileChange}
        className='border border-gray-300 text-[12px] px-4 py-3 w-full rounded-[10px]'
        required={mode === 'create'}
      /> */}
      <input
        type='file'
        accept='image/*'
        id='product_image'
        onChange={handleFileChange}
        required={mode === 'create'}
      />
      <button
        type='submit'
        className='mt-6 bg-[#043D25] text-white px-4 py-2.5 rounded-[10px] w-full hover:bg-[#043D25] disabled:opacity-50'
      >
        {mode === 'create' ? 'Create Product' : 'Update Product'}
      </button>
    </form>
  );
};

export default ProductForm;
