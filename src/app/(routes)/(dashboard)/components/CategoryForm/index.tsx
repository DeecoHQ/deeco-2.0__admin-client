"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/rtk-base/hook";
import {
  createCategory,
  updateCategory,
  getCategory,
  selectCategory,
} from "@/app/rtk-base/slices/Inventory/categorySlice";
import toast from "react-hot-toast";


type ModalType = 'create' | 'update';

interface CategoryFormProps {
  mode: ModalType;
  id?: number;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ mode, id }) => {
  const dispatch = useAppDispatch();
  const category = useAppSelector(selectCategory);

  const [formDataState, setFormDataState] = useState({
    category_name: "",
    category_description: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [isFilePicked, setIsFilePicked] = useState(false);

  // Fetch category if in update mode and id is provided
  useEffect(() => {
  if (mode === "update" && id) {
    dispatch(getCategory({ id }));
  }
}, [mode, id, dispatch]);

  // Prefill form when category is loaded
  useEffect(() => {
    if (mode === "update" && category && id && category.id === id) {
      setFormDataState({
        category_name: category.category_name || "",
        category_description: category.category_description || "",
      });
    }
  }, [category, mode, id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormDataState({
      ...formDataState,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setIsFilePicked(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formDataState.category_name || !formDataState.category_description) {
      toast.error("Please fill in all required fields", { duration: 3000 });
      return;
    }

    const formData = new FormData();
    formData.append("category_name", formDataState.category_name);
    formData.append("category_description", formDataState.category_description);

    if (file) {
      // same client-side checks as your product form
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        toast.error("Only JPG or PNG allowed");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size must be less than 2MB");
        return;
      }
      formData.append("category_image", file);
    } else if (mode === "create") {
      // optional: you required file for products; for categories you said no storeIdentifier,
      // but left requirement flexible — if you want file required for create, add a check here.
    }

    try {
      if (mode === "create") {
        await dispatch(createCategory({ formData: formData }));
        // reset after create
        setFormDataState({ category_name: "", category_description: "" });
        setFile(null);
        setIsFilePicked(false);
      } else if (mode === "update" && id) {
        await dispatch(updateCategory({ id, formData: formData }));
      }
    } catch (err) {
      console.error("Category submit error:", err);
      toast.error("Failed to submit");
    }
  };

  return (
      <form onSubmit={handleSubmit} className='w-full mx-auto px-3 pb-4'>
        <label
          htmlFor="category_name"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {mode === "create" ? "Category Name" : "Updated Category Name"}
        </label>
        <input
          type="text"
          id="category_name"
          name="category_name"
          placeholder={mode === "create" ? "Category Name" : "Updated Category Name"}
          value={formDataState.category_name}
          onChange={handleChange}
          className="border border-gray-300 text-[12px] px-4 py-3 w-full rounded-[10px]"
          required
        />

        <label
          htmlFor="category_description"
          className="block text-sm font-medium text-gray-700 mt-3 mb-2"
        >
          {mode === "create" ? "Category Description" : "Updated Description"}
        </label>
        <textarea
          id="category_description"
          name="category_description"
          placeholder={
            mode === "create" ? "Category Description" : "Updated Category Description"
          }
          value={formDataState.category_description}
          onChange={handleChange}
          className="border border-gray-300 text-[12px] px-4 py-3 w-full rounded-[10px]"
          required
          rows={10}
          cols={60}
        />

        <label
          htmlFor="category_image"
          className="block text-sm font-medium text-gray-700 mt-3 mb-2"
        >
          Category Image/Icon
        </label>
        <input
          type="file"
          accept="image/*"
          id="category_image"
          onChange={handleFileChange}
        />

        <button
          type="submit"
          className="mt-6 bg-[#043D25] text-white px-4 py-2.5 rounded-[10px] w-full hover:bg-[#043D25] disabled:opacity-50"
        >
          {mode === "create" ? "Create Category" : "Update Category"}
        </button>
      </form>
  );
};

export default CategoryForm;
