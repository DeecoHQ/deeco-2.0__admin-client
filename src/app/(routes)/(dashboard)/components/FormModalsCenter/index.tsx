'use client';

import { useAppDispatch, useAppSelector } from '@/app/rtk-base/hook';
import { hideModal } from '@/app/rtk-base/slices/inventoryFormsSlice';
import Overlay from '@/app/global-components/OverlayComponent';
import { HiOutlineX } from 'react-icons/hi';
import ProductForm from '@/app/(routes)/(dashboard)/components/ProductForm';
import CategoriesForm from '@/app/(routes)/(dashboard)/components/CategoryForm';
import BrandsForm from '@/app/(routes)/(dashboard)/components/BrandForm';

export interface ModalData {
  type: 'create' | 'update' | 'delete';
  entity: 'product' | 'category' | 'brand' | 'orders';
  extraProps?: {
    id?: number;
  };
}

export default function FormModal() {
  const dispatch = useAppDispatch();
  const { isOpen, modalData } = useAppSelector((state) => state.formModal);

  if (!isOpen || !modalData) return null;

  const { entity, type, extraProps } = modalData;

  const renderForm = () => {
    switch (entity) {
      case 'product':
        return <ProductForm mode={type} id={extraProps?.id} />;

      case 'category':
        return <CategoriesForm mode={type} id={extraProps?.id} />;

      // case 'brand':
      //   return <BrandsForm mode={type} id={extraProps?.id} />; // 🔥 make BrandForm consistent too

      default:
        return null;
    }
  };

  return (
    <Overlay onClose={() => dispatch(hideModal())}>
      <div className="bg-white rounded-xl shadow-lg py-6 w-full sm:w-[400px] md:w-[500px] mx-auto h-[650px] md:h-[700px] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold capitalize pl-3">
            {type} {entity}
          </h2>
          <button
            onClick={() => dispatch(hideModal())}
            className="text-gray-500 hover:text-gray-800 cursor-pointer mr-3"
          >
            <HiOutlineX />
          </button>
        </div>
        {renderForm()}
      </div>
    </Overlay>
  );
}
