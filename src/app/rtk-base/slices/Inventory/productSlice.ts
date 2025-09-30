"use client";

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { RootState } from "../../store";
import { setAccessToken } from "../authSlice";
import axiosInstance from "@/app/utils/axiosConfig";
import { mutate } from "swr";
import { hideModal } from '../inventoryFormsSlice';

// ========================
// Types
// ========================
export interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export interface Product {
  id: number;
  store_identifier?: string;
  product_name: string;
  product_type: string;
  product_description: string;
  brand: string;
  overview: string;
  warranty_information: string;
  real_price: string;
  discount_price: string;
  discount: string;
  stock: number;
  rating: number;
  deals: { discount: number; deal_name: string }[];
  extra_selections_data: { size: string; color: string }[];
  categories: string[];
  color_options: string[];
  size_options: string[];
  is_free_delivery_available: boolean;
  weight: string;
  product_image: { image_url: string; lastFetch: string };
  product_gallery_image_1?: string | null;
  product_gallery_image_2?: string | null;
  product_gallery_image_3?: string | null;
  product_gallery_image_4?: string | null;
  created_by: number;
  created_at: string;
  updated_at: string;
}

interface ProductState {
  products: Product[];
  product?: Product;
  store_identifier?: string | null;
  loading: boolean;
  error?: string;
}

const initialState: ProductState = {
  products: [],
  product: undefined,
  store_identifier:
    typeof window !== "undefined"
      ? localStorage.getItem("storeIdentifier")
      : null,
  loading: false,
  error: undefined,
};

// ========================
// Thunks (unchanged)
// ========================
export const createProduct = createAsyncThunk<
  Product,
  { productData: FormData; store_identifier?: string },
  { state: RootState }
>("products/create", async ({ productData, store_identifier }, thunkAPI) => {
  try {
    toast.dismiss();
    toast.loading("Creating product...");

    const url = `/api/v1/inventory/products/create-product`;

    const response = await axiosInstance.post(url, productData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const data = response.data.response;

    const finalIdentifier =
      store_identifier || thunkAPI.getState().products.store_identifier;

    if (finalIdentifier) {
      mutate(
        `${process.env.NEXT_PUBLIC_API_URL_BASE}/api/v1/inventory/products/get-user-products?store_identifier=${finalIdentifier}`
      );
    }

    if (data.access_token) thunkAPI.dispatch(setAccessToken(data.access_token));

    toast.dismiss();
    toast.success("Product created successfully", { duration: 3000 });

    if (response.data.response.product) {
      thunkAPI.dispatch(hideModal());
    }

    return data.product as Product;
  } catch (error) {
    toast.dismiss();
    const errorMessage =
      axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : "An unexpected error occurred.";
    toast.error(errorMessage);
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const getProductById = createAsyncThunk<
  Product,
  number,
  { state: RootState }
>("products/getById", async (id, { getState, dispatch, rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_API_URL_BASE}/api/v1/inventory/products/get-product/${id}`,
    );

    const data = response.data.response;
    if (data.access_token) dispatch(setAccessToken(data.access_token));

    return data.product as Product;
  } catch (error) {
    toast.dismiss();
    const errorMessage =
      axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : "Failed to fetch product";
    toast.error(errorMessage);
    return rejectWithValue(errorMessage);
  }
});

export const updateProduct = createAsyncThunk<
  Product,
  { id: number; formData: FormData; store_identifier?: string },
  { state: RootState }
>("products/update", async ({ id, formData, store_identifier }, { dispatch, rejectWithValue, getState }) => {
  try {
    toast.dismiss();
    toast.loading("Updating product...");

    const response = await axiosInstance.post(
      `${process.env.NEXT_PUBLIC_API_URL_BASE}/api/v1/inventory/products/update-product/${id}`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    const data = response.data.response;

    const finalIdentifier =
      store_identifier || getState().products.store_identifier;

    if (finalIdentifier) {
      mutate(
        `${process.env.NEXT_PUBLIC_API_URL_BASE}/api/v1/inventory/products/get-user-products?store_identifier=${finalIdentifier}`
      );
    }

    toast.dismiss();
    toast.success("Product updated successfully");

    if (response.data.response.product) {
      dispatch(hideModal());
    }

    return data.product as Product;
  } catch (error) {
    toast.dismiss();
    const errorMessage =
      axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : "Failed to update product";
    toast.error(errorMessage);
    return rejectWithValue(errorMessage);
  }
});

// Delete Product
export const deleteProduct = createAsyncThunk<
  number,
  { id: number; store_identifier?: string }, 
  { state: RootState }
>("products/delete", async ({ id, store_identifier }, { dispatch, rejectWithValue, getState }) => {
  try {
    toast.dismiss();
    toast.loading("Deleting product...");

    const response = await axiosInstance.delete(
      `${process.env.NEXT_PUBLIC_API_URL_BASE}/api/v1/inventory/products/delete-product/${id}`,
    );

    const data = response.data.response;

    const finalIdentifier =
      store_identifier || getState().products.store_identifier;

    if (finalIdentifier) {
      mutate(
        `${process.env.NEXT_PUBLIC_API_URL_BASE}/api/v1/inventory/products/get-user-products?store_identifier=${finalIdentifier}`
      );
    }

    toast.dismiss();
    toast.success("Product deleted successfully");

    if (response.data.response.product) {
      dispatch(hideModal());
    }

    return data.product_id as number;
  } catch (error) {
    toast.dismiss();
    const errorMessage =
      axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : "Failed to delete product";
    toast.error(errorMessage);
    return rejectWithValue(errorMessage);
  }
});
// ========================
// Slice
// ========================
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearProductError: (state) => {
      state.error = undefined;
    },
    setStoreIdentifier: (state, action: PayloadAction<string>) => {
      state.store_identifier = action.payload;
      try {
        if (action.payload) {
          localStorage.setItem("store_identifier", action.payload);
        } else {
          localStorage.removeItem("store_identifier");
        }
      } catch (error) {
        console.error("Error persisting store_identifier:", error);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Get One
      .addCase(getProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductById.fulfilled, (state, action: PayloadAction<Product>) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.loading = false;
        const index = state.products.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) state.products[index] = action.payload;
        if (state.product?.id === action.payload.id) state.product = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.products = state.products.filter((p) => p.id !== action.payload);
        if (state.product?.id === action.payload) state.product = undefined;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearProductError, setStoreIdentifier } = productSlice.actions;
export const selectStoreIdentifier = (state: RootState) =>
  state.products.store_identifier;
export default productSlice.reducer;
