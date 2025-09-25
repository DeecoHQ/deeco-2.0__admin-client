"use client";

import { useAppDispatch, useAppSelector } from "@/app/rtk-base/hook";
import { hideModal } from "@/app/rtk-base/slices/entityFormSlice";
import Overlay from "@/app/global-components/OverlayComponent";
import { HiOutlineX } from "react-icons/hi";
// import OrdersForm from "@/app/(routes)/(dashboard)/components/OrderForm";
import ProductForm from "@/app/(routes)/(dashboard)/components/ProductForm";
import CategoriesForm from "@/app/(routes)/(dashboard)/components/CategoryForm";
import BrandsForm from "@/app/(routes)/(dashboard)/components/BrandForm";

export default function FormModal() {
 const dispatch = useAppDispatch();   
 const { isOpen, modalData } = useAppSelector((state) => state.formModal);

  if (!isOpen || !modalData) return null;

  const { entity, type } = modalData;

  const renderForm = () => {
    switch (entity) {
      // case "orders":
      //   return <OrdersForm type={type} />;
      case "products":
        return <ProductForm type={type} />;
      case "categories":
        return <CategoriesForm type={type} />;
      case "brands":
        return <BrandsForm type={type} />;
      default:
        return null;
    }
  };

  return (
    <Overlay onClose={() => dispatch(hideModal())}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold capitalize">
          {type} {entity}
        </h2>
        <button
          onClick={() => dispatch(hideModal())}
          className="text-gray-500 hover:text-gray-800 cursor-pointer"
        >
          <HiOutlineX />
        </button>
      </div>
      {renderForm()}
    </Overlay>
  );
}
