"use client";

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { RootState } from "../../store";
import { setAccessToken } from "../authSlice";
import axiosInstance from "@/app/utils/axiosConfig";

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
  rating: string;
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
  loading: boolean;
  error?: string;
}

const initialState: ProductState = {
  products: [],
  product: undefined,
  loading: false,
  error: undefined,
};

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL_BASE;

// ========================
// Thunks
// ========================
export const createProduct = createAsyncThunk(
  "products/create",
  async (productData: FormData, thunkAPI) => {
    try {
      toast.dismiss();
      toast.loading("Creating product...");

      const url = `/api/v1/inventory/products/create-product`;

      // Log FormData keys and values
      console.log("FormData to send:");
      productData.forEach((value, key) => {
        console.log(key, value);
      });

      // Log current access token before request
      const currentToken = localStorage.getItem("accessToken");
      console.log("Current access token before request:", currentToken);

      const response = await axiosInstance.post(url, productData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Log full response from server
      console.log("Response from createProduct:", response);

      const data = response.data.response;

      // Log if access_token exists in response
      if (data.access_token) {
        console.log("New access token received:", data.access_token);
        thunkAPI.dispatch(setAccessToken(data.access_token));
      } else {
        console.log("No access token in response.");
      }

      toast.dismiss();
      toast.success("Product created successfully", { duration: 3000 });

      return data.product as Product;
    } catch (error) {
      console.error("Error caught in createProduct thunk:", error);

      toast.dismiss();
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : "An unexpected error occurred.";
      toast.error(errorMessage);

      // Log error response for detailed debugging
      if (axios.isAxiosError(error) && error.response) {
        console.log("Axios error response headers:", error.response.headers);
        console.log("Axios error response data:", error.response.data);
        console.log("Axios error response status:", error.response.status);
      }

      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);



export const getProductById = createAsyncThunk<
  Product,
  number,
  { state: RootState }
>("products/getById", async (id, { getState, dispatch, rejectWithValue }) => {
  try {
    const { userAccessToken } = getState().auth;
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL_BASE}/api/v1/inventory/products/get-product/${id}`,
      { headers: { Authorization: `Bearer ${userAccessToken}` } }
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

export const getAllProducts = createAsyncThunk<
  Product[],
  void,
  { state: RootState }
>("products/getAll", async (_, { getState, dispatch, rejectWithValue }) => {
  try {
    const { userAccessToken } = getState().auth;
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL_BASE}/api/v1/inventory/products/get-all-products`,
      { headers: { Authorization: `Bearer ${userAccessToken}` } }
    );

    const data = response.data.response;
    if (data.access_token) dispatch(setAccessToken(data.access_token));

    return data.products as Product[];
  } catch (error) {
    toast.dismiss();
    const errorMessage =
      axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : "Failed to fetch products";
    toast.error(errorMessage);
    return rejectWithValue(errorMessage);
  }
});

export const updateProduct = createAsyncThunk<
  Product,
  { id: number; formData: FormData },
  { state: RootState }
>("products/update", async ({ id, formData }, { getState, dispatch, rejectWithValue }) => {
  try {
    const { userAccessToken } = getState().auth;
    console.log("Access Token being used:", userAccessToken);
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL_BASE}/api/v1/inventory/products/update-product/${id}`,
      formData,
      { headers: { Authorization: `Bearer ${userAccessToken}` } }
    );

    const data = response.data.response;
    if (data.access_token) dispatch(setAccessToken(data.access_token));

    toast.dismiss();
    toast.success("Product updated successfully");
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

export const deleteProduct = createAsyncThunk<
  number,
  number,
  { state: RootState }
>("products/delete", async (id, { getState, dispatch, rejectWithValue }) => {
  try {
    const { userAccessToken } = getState().auth;
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL_BASE}/api/v1/inventory/products/delete-product/${id}`,
      { headers: { Authorization: `Bearer ${userAccessToken}` } }
    );

    const data = response.data.response;
    if (data.access_token) dispatch(setAccessToken(data.access_token));

    toast.dismiss();
    toast.success("Product deleted successfully");
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
      // Get All
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
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

export const { clearProductError } = productSlice.actions;
export default productSlice.reducer;
