"use client";

import React from "react";
import Image from "next/image";
import { useAppDispatch } from "@/app/rtk-base/hook";
import { showModal } from '@/app/rtk-base/slices/inventoryFormsSlice';
import {
  getProductById,
  deleteProduct,
} from '@/app/rtk-base/slices/Inventory/productSlice';
import { ProductSpecs } from '../../types';
import { showNotificationModal } from '@/app/rtk-base/slices/notificationModalSlice';

function ProductCard({ productData }: { productData: ProductSpecs }) {
  const dispatch = useAppDispatch();

  const handleUpdateProcess = () => {
    dispatch(getProductById(productData.id));

    dispatch(
      showModal({
        type: 'update',
        entity: 'product',
        extraProps: { id: productData.id },
      })
    );
  };

  const openModal = () => {
    dispatch(
      showNotificationModal({
        type: 'warning',
        title: 'Are you sure?',
        message: 'This action cannot be undone.',
        confirmText: 'Yes',
        cancelText: 'No',
      })
    );
  };

  return (
    <div className='product-card relative'>
      {productData.discount && (
        <div className='discount-wrapper flex items-center justify-center absolute top-[10px] right-[10px] bg-[#fe6f48] text-[10px] text-white py-1 px-2 rounded-[7px]'>
          -25%
        </div>
      )}
      <div className='image-area w-full h-[50%]'>
        {productData.product_image?.image_url ? (
          <Image
            src={productData.product_image.image_url || '/fallback.png'}
            width={300}
            height={50}
            alt={productData.product_name || 'Product image'}
            className='w-full h-full rounded-tr-[10px] rounded-tl-[10px] object-cover'
          />
        ) : (
          <div className='w-full h-[200px] flex items-center justify-center bg-gray-200 rounded-tr-[7px] rounded-tl-[7px]'>
            <span>No image available</span>
          </div>
        )}
      </div>
      <div className='product-details flex flex-col mt-1.5'>
        <div className='name-wrapper uppercase poppins text-[12px] min-h-[50px]'>
          {productData.product_name}
        </div>
        <div className='price-wrapper flex gap-x-6 items-center mt-1 poppins font-light text-[12px]'>
          <div className='selling-price text-red-500 flex items-center'>
            ₦ <span className='line-through'>{productData.real_price}</span>
          </div>
          {productData.discount_price && (
            <div className='slashed-price text-gray-500 flex items-center'>
              ₦ <span>{productData.discount_price}</span>
            </div>
          )}
        </div>
        <div className='product-stock-history text-[12px] mt-1.5'>
          <div className='count-area'>{productData.stock} items remaining</div>
        </div>
        <section className='mt-6 action-buttons flex flex-col gap-y-2 justify-center text-[12px] poppins text-white'>
          <button
            onClick={handleUpdateProcess}
            className='px-4 py-3 bg-[#043D25] w-full rounded-[10px] cursor-pointer'
          >
            Update Product
          </button>
          <button
            onClick={() =>
              dispatch(
                showNotificationModal({
                  type: 'warning',
                  title: 'Are you sure?',
                  message: 'This action cannot be undone.',
                  confirmText: 'Yes',
                  cancelText: 'No',
                  extraData: { id: productData.id },
                })
              )
            }
            className='px-4 py-3 border-[1px] border-[#043D25] bg-white text-[#043D25] w-full rounded-[10px] cursor-pointer'
          >
            Delete Product
          </button>
        </section>
      </div>
    </div>
  );
}

export default ProductCard;
