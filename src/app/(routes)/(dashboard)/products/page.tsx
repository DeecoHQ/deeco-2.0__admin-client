"use client";

import React from "react";
import { ProductSpecs } from "./types";
import useSWR from "swr";
import ProductCard from "./components/ProductCard";
import axiosInstance from "@/app/utils/axiosConfig";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { getProductById } from "@/app/rtk-base/slices/Inventory/productSlice";
import { useAppDispatch } from "@/app/rtk-base/hook";
import { useAppSelector } from "@/app/rtk-base/store";
import { selectStoreIdentifier } from "@/app/rtk-base/slices/Inventory/productSlice";
import { showModal } from "@/app/rtk-base/slices/entityFormSlice";
import FloatingActionGroup from "./../components/FloatingActionGroup";
import PageRoutesIndicator from "../components/PageRoutesIndicator";
import { MdLibraryAdd, MdOutlineNoteAlt } from "react-icons/md";
import ContractDetailsPopOver from '../components/ContractDetailsPopOver';

function ProductsPage() {
  const dispatch = useAppDispatch();
  const store_identifier = useAppSelector(selectStoreIdentifier);

  const fetchProducts = async (url: string) => {
    toast.dismiss();

    try {
      const res = await axiosInstance.get(url, {
        withCredentials: true,
      });
      toast.dismiss();
      return res.data.response;
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to fetch products");
      throw error;
    }
  };

  console.log("Store Identifier:", store_identifier);

  const { data } = useSWR(
    store_identifier
      ? `${process.env.NEXT_PUBLIC_API_URL_BASE}/api/v1/inventory/products/get-user-products?store_identifier=${store_identifier}`
      : null,
    fetchProducts,
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
    }
  );

  // New helper: handleUpdateProcess for FloatingActionGroup
  const handleUpdateProcess = (productId: number) => {
    dispatch(getProductById(productId));
    dispatch(
      showModal({
        type: "update",
        entity: "products",
        extraProps: { productId },
      })
    );
  };

  return (
    <main className='min-h-screen flex flex-col'>
      <section className='border-b-[1px] pb-1 border-gray-200 flex justify-between'>
        <PageRoutesIndicator
          pageRoutes='Admin / Products'
          pageTitle='Products'
        />
        <ContractDetailsPopOver
          contractName='Product Management Contract'
          contractAddress='0x000000000000000000000000000000000'
          status='inactive'
          blockExplorerLink='/'
        />
      </section>

      <div className='mt-[10px] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-x-[20px] gap-y-[30px]'>
        {data?.products?.map((product: ProductSpecs) => (
          <ProductCard key={product.id} productData={product} />
        ))}
      </div>

      {/* Reusable Floating Buttons */}
      <FloatingActionGroup
        actions={[
          {
            icon: <MdOutlineNoteAlt size={32} />,
            onClick: () => {
              // Here you need to pass a product ID. You could select the first product as default, or show a picker.
              if (data?.products?.length) {
                handleUpdateProcess(data.products[0].id); // Example: first product
              } else {
                toast.error('No products available to update');
              }
            },
            label: 'Update Product',
          },
          {
            icon: <MdLibraryAdd size={32} className='hidden' />,
            onClick: () =>
              dispatch(showModal({ type: 'create', entity: 'products' })),
            label: 'Create Product',
          },
        ]}
      />
    </main>
  );
}

export default ProductsPage;
