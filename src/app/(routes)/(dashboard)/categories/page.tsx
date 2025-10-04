"use client";

import React from "react";
import useSWR from "swr";
import PageRoutesIndicator from "../components/PageRoutesIndicator";
import { HiPlus } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { showModal } from "@/app/rtk-base/slices/inventoryFormsSlice";
import FloatingActionGroup from "./../components/FloatingActionGroup";
import CategoriesCard from "./components/CategoriesCard";
import { CategorySpecs } from "./types";
import axiosInstance from "@/app/utils/axiosConfig";
import toast from "react-hot-toast";

export default function CategoryPage() {
  const dispatch = useDispatch();

  const fetchCategories = async (url: string) => {
    toast.dismiss();
    try {
      const res = await axiosInstance.get(url, {
        withCredentials: true,
      });
      toast.dismiss();
      return res.data.response;
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to fetch categories");
      throw error;
    }
  };

  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL_BASE}/api/v1/inventory/categories/get-all-categories`,
    fetchCategories,
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
    }
  );

  const categories = data?.categories || [];

  return (
    <main className="min-h-screen flex flex-col">
      <section className="border-b-[1px] pb-1 border-gray-200">
        <PageRoutesIndicator
          pageRoutes="Admin / Categories"
          pageTitle="Categories"
        />
      </section>

      {/* ✅ Conditional Rendering */}
      {categories.length === 0 ? (
        <div className="flex mt-[150px] items-center justify-center">
          <div className="text-center md:w-[80%] xl:w-[70%] md:mx-auto">
            <h2 className="text-2xl font-semibold mb-2">Categories</h2>
            <p className="text-gray-600">
              Categories help you customize the experience of your users. <br />
              Add the various categories you sell in, and we will display them
              on your store.
              <br /> <br />
              Ensure to maintain a consistent design pattern across every
              category image/icon you add.
              <br />
              Good Luck!!!
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-[10px] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-x-[20px] gap-y-[30px]">
          {categories.map((category: CategorySpecs) => (
            <CategoriesCard key={category.id} categoryData={category} />
          ))}
        </div>
      )}

      {/* ✅ Reusable Floating Buttons */}
      <FloatingActionGroup
        actions={[
          {
            icon: <HiPlus size={32} />,
            onClick: () =>
              dispatch(showModal({ type: "create", entity: "category" })),
            label: "Create Category",
          },
        ]}
      />
    </main>
  );
}
