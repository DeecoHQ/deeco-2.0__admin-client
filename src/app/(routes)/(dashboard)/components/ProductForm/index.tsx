"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/rtk-base/hook";
import {
  createProduct,
  updateProduct,
  getProductById,
} from "@/app/rtk-base/slices/Inventory/productSlice";
import toast from "react-hot-toast";

type ProductFormProps = {
  mode: "create" | "update";
  productId?: number;
};

const ProductForm: React.FC<ProductFormProps> = ({ mode, productId }) => {
  const dispatch = useAppDispatch();
  const { product, loading } = useAppSelector((state) => state.products);

  // 👇 single form state (renamed to avoid redeclare issue)
  const [formDataState, setFormDataState] = useState({
    product_name: "",
    product_type: "physical product",
    product_description: "",
    real_price: "",
    discount_price: "",
    stock: "",
    is_free_delivery_available: false,
    rating: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [isFilePicked, setIsFilePicked] = useState(false);

  // Fetch product if in update mode
  useEffect(() => {
    if (mode === "update" && productId) {
      dispatch(getProductById(productId));
    }
  }, [mode, productId, dispatch]);

  // Prefill form when product is loaded
  useEffect(() => {
    if (mode === "update" && product && product.id === productId) {
      setFormDataState({
        product_name: product.product_name || "",
        product_type: product.product_type || "physical product",
        product_description: product.product_description || "",
        real_price: product.real_price?.toString() || "",
        discount_price: product.discount_price?.toString() || "",
        stock: product.stock?.toString() || "",
        is_free_delivery_available: !!product.is_free_delivery_available,
        rating: product.rating?.toString() || "",
      });
    }
  }, [product, mode, productId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox" && e.target instanceof HTMLInputElement) {
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
      toast.error("Please fill in all required fields", { duration: 3000 });
      return;
    }

    if (!isFilePicked && mode === "create") {
      toast.error("Please upload a product image", { duration: 3000 });
      return;
    }

    const formData = new FormData();
    formData.append('product_name',  formDataState.product_name)
    formData.append('product_type',  formDataState.product_type)
    formData.append('product_description',  formDataState.product_description)
    formData.append('real_price',  formDataState.real_price)
    formData.append('discount_price',  formDataState.discount_price)
    formData.append('stock',  formDataState.stock)
    formData.append('rating',  formDataState.rating)
    formData.append(
  'is_free_delivery_available',formDataState.is_free_delivery_available.toString()
);
if (file) {
  formData.append('product_image', file); // 
}
    // Object.entries(formDataState).forEach(([key, value]) => {
    //   formData.append(
    //     key,
    //     typeof value === "boolean" ? value.toString() : value
    //   );
    // });
    // if (file) formData.append("product_image", file);

    console.log(formData);
    console.log(file);

    try {
      if (mode === "create") {
        await dispatch(createProduct(formData))

        // ✅ Reset
        setFormDataState({
          product_name: "",
          product_type: "",
          product_description: "",
          real_price: "",
          discount_price: "",
          stock: "",
          is_free_delivery_available: false,
          rating: "",
        });
        setFile(null);
        setIsFilePicked(false);
      } else if (mode === "update" && productId) {
        await dispatch(updateProduct({ id: productId, formData }));
        toast.success("Product updated successfully!");
      }
    } catch (err) {
      console.error("Submit error:", err);
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Failed to submit");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 space-y-4">
      <input
        type="text"
        name="product_name"
        placeholder="Product Name"
        value={formDataState.product_name}
        onChange={handleChange}
        required
        className="border border-gray-300 px-4 py-2 w-full rounded-md"
      />

      <select
        name="product_type"
        value={formDataState.product_type}
        onChange={handleChange}
        required
        className="border border-gray-300 px-4 py-2 w-full rounded-md"
      >
        <option value="physical product">Physical Product</option>
        <option value="digital product">Digital Product</option>
      </select>

      <textarea
        name="product_description"
        placeholder="Product Description"
        value={formDataState.product_description}
        onChange={handleChange}
        required
        className="border border-gray-300 px-4 py-2 w-full rounded-md"
      />

      <input
        type="number"
        step="0.01"
        name="real_price"
        placeholder="Real Price"
        value={formDataState.real_price}
        onChange={handleChange}
        required
        className="border border-gray-300 px-4 py-2 w-full rounded-md"
      />

      <input
        type="number"
        step="0.01"
        name="discount_price"
        placeholder="Discount Price"
        value={formDataState.discount_price}
        onChange={handleChange}
        required
        className="border border-gray-300 px-4 py-2 w-full rounded-md"
      />

      <input
        type="number"
        name="stock"
        placeholder="Stock Quantity"
        value={formDataState.stock}
        onChange={handleChange}
        required
        className="border border-gray-300 px-4 py-2 w-full rounded-md"
      />

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="is_free_delivery_available"
          checked={formDataState.is_free_delivery_available}
          onChange={handleChange}
          className="h-4 w-4"
        />
        Free Delivery Available
      </label>

      <input
        name="rating"
        type="number"
        step="0.1"
        min="0"
        max="5"
        placeholder="Rating (0 - 5)"
        value={formDataState.rating}
        onChange={handleChange}
        required
        className="border border-gray-300 px-4 py-2 w-full rounded-md"
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="border border-gray-300 px-4 py-2 w-full rounded-md"
        required={mode === "create"}
      />

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700 disabled:opacity-50"
      >
        {mode === "create" ? "Create Product" : "Update Product"}
      </button>
    </form>
  );
};

export default ProductForm;
