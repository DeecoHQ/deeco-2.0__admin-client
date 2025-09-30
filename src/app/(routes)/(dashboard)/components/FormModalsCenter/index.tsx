'use client';

import { useAppDispatch, useAppSelector } from '@/app/rtk-base/hook';
import { hideModal } from '@/app/rtk-base/slices/inventoryFormsSlice';
import Overlay from '@/app/global-components/OverlayComponent';
import { HiOutlineX } from 'react-icons/hi';
// import OrdersForm from "@/app/(routes)/(dashboard)/components/OrderForm";
import ProductForm from '@/app/(routes)/(dashboard)/components/ProductForm';
import CategoriesForm from '@/app/(routes)/(dashboard)/components/CategoryForm';
import BrandsForm from '@/app/(routes)/(dashboard)/components/BrandForm';

export interface ModalData {
  type: 'create' | 'update' | 'delete';
  entity: string;
  extraProps?: {
    productId?: number;
  };
}

export default function FormModal() {
  const dispatch = useAppDispatch();
  const { isOpen, modalData } = useAppSelector((state) => state.formModal);

  if (!isOpen || !modalData) return null;

  const { entity, type } = modalData;

  const renderForm = () => {
    switch (entity) {
      // case "orders":
      //   return <OrdersForm type={type} />;
      case 'product':
      case 'product':
        // return <ProductForm mode={type} productId={modalData.productId} />;
        return (
          <ProductForm
            mode={type}
            productId={modalData.extraProps?.productId}
          />
        );

      case 'category':
        return <CategoriesForm type={type} />;
      case 'brand':
        return <BrandsForm type={type} />;
      default:
        return null;
    }
  };

  return (
    <Overlay onClose={() => dispatch(hideModal())}>
      <div className='bg-white rounded-xl shadow-lg py-6 w-full sm:w-[400px] md:w-[500px] mx-auto h-[650px] md:h-[700px] overflow-y-auto'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-lg font-semibold capitalize pl-3'>
            {type} {entity}
          </h2>
          <button
            onClick={() => dispatch(hideModal())}
            className='text-gray-500 hover:text-gray-800 cursor-pointer mr-3'
          >
            <HiOutlineX />
          </button>
        </div>
        {renderForm()}
      </div>
    </Overlay>
  );
}
