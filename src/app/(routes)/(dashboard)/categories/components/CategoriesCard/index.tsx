"use client";

import React from "react";
import { useAppDispatch } from "@/app/rtk-base/hook";
import Image from "next/image";
import { showModal } from "@/app/rtk-base/slices/inventoryFormsSlice";
import { getCategory } from "@/app/rtk-base/slices/Inventory/categorySlice";
import { CategorySpecs } from "../../types";
import { showNotificationModal } from "@/app/rtk-base/slices/notificationModalSlice";

function CategoriesCard({ categoryData }: { categoryData: CategorySpecs }) {
  const dispatch = useAppDispatch();

  const handleUpdateProcess = () => {
    dispatch(getCategory({ id: categoryData.id }));

    dispatch(
      showModal({
        type: "update",
        entity: "category",
        extraProps: { id: categoryData.id },
      })
    );
  };

  return (
    <div className="category-card relative rounded-[7px] shadow-sm bg-white overflow-hidden">
      {/* Image section */}
      <div className="image-area relative w-full h-[180px]">
        {categoryData.category_image?.image_url ? (
          <Image
            src={categoryData.category_image.image_url || "/fallback.png"}
            alt={categoryData.category_name || "Category image"}
            fill
            className="rounded-tr-[7px] rounded-tl-[7px] object-cover bg-gray-100"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span>No image available</span>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="category-details flex flex-col p-3">
        <div className="name-wrapper uppercase poppins text-[14px] font-semibold">
          {categoryData.category_name}
        </div>
        {categoryData.category_description && (
          <div className="description-wrapper text-[12px] text-gray-600 mt-1 line-clamp-2 font-meduim poppins">
            {categoryData.category_description}
          </div>
        )}

        {/* Action buttons */}
        <section className="mt-4 flex flex-col gap-y-2 text-[12px] poppins text-white">
          <button
            onClick={handleUpdateProcess}
            className="px-4 py-3 bg-[#3cac84] w-full rounded-[7px] cursor-pointer"
          >
            Update Category
          </button>
          <button
            onClick={() =>
              dispatch(
                showNotificationModal({
                  type: "warning",
                  title: "Are you sure?",
                  message: "This action cannot be undone.",
                  confirmText: "Yes",
                  cancelText: "No",
                  extraData: { id: categoryData.id },
                })
              )
            }
            className="px-4 py-3 border-[1px] border-[#3cac84] bg-white text-[#3cac84] w-full rounded-[7px] cursor-pointer"
          >
            Delete Category
          </button>
        </section>
      </div>
    </div>
  );
}

export default CategoriesCard;
