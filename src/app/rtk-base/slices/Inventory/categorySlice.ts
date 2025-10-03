"use client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { RootState } from "../../store";
import { setAccessToken } from "../authSlice";
import axiosInstance from "@/app/utils/axiosConfig";
import { mutate } from "swr";
import { hideModal } from "../inventoryFormsSlice";

type Category = {
  id: number;
  category_name: string;
  category_description: string;
  category_image?: { imageUrl?: string };
  created_by: {
    id: number;
    name: string;
    email: string;
  };
  created_at: string;
  updated_at: string;
};

interface CategoriesState {
  categories: Category[];
  category: Category | null;
  loading: boolean;
  error: string | null;
}

const initialState: CategoriesState = {
  categories: [],
  category: null,
  loading: false,
  error: null,
};

// CREATE CATEGORY
export const createCategory = createAsyncThunk<
  Category,
  { formData: FormData }
>("categories/create", async ({ formData }, thunkAPI) => {
  try {
    toast.dismiss();
    toast.loading("Creating category...");

    const url = `/api/v1/inventory/categories/create-category`;
    const response = await axiosInstance.post(url, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const data = response.data.response;

    mutate(
      `${process.env.NEXT_PUBLIC_API_URL_BASE}/api/v1/inventory/categories/get-all-categories`
    );

    if (data.access_token) thunkAPI.dispatch(setAccessToken(data.access_token));

    toast.dismiss();
    toast.success("Category created successfully", { duration: 3000 });

    thunkAPI.dispatch(hideModal());

    return data.category as Category;
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

// UPDATE CATEGORY
export const updateCategory = createAsyncThunk<
  Category,
  { id: number; formData: FormData }
>("categories/update", async ({ id, formData }, thunkAPI) => {
  try {
    toast.dismiss();
    toast.loading("Updating category...");

    const response = await axiosInstance.post(
      `${process.env.NEXT_PUBLIC_API_URL_BASE}/api/v1/inventory/categories/update-category/${id}`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    const data = response.data.response;

    mutate(
      `${process.env.NEXT_PUBLIC_API_URL_BASE}/api/v1/inventory/categories/get-all-categories`
    );

    if (data.access_token) thunkAPI.dispatch(setAccessToken(data.access_token));

    toast.dismiss();
    toast.success("Category updated successfully");

    thunkAPI.dispatch(hideModal());

    return data.category as Category;
  } catch (error) {
    toast.dismiss();
    const errorMessage =
      axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : "Failed to update category";
    toast.error(errorMessage);
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

// GET SINGLE CATEGORY
export const getCategory = createAsyncThunk<Category, { id: number }>(
  "categories/get",
  async ({ id }, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_API_URL_BASE}/api/v1/inventory/categories/get-category/${id}`
      );

      const data = response.data.response;

      if (data.access_token)
        thunkAPI.dispatch(setAccessToken(data.access_token));

      return data.category as Category;
    } catch (error) {
      toast.dismiss();
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : "Failed to fetch category";
      toast.error(errorMessage);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// DELETE CATEGORY
export const deleteCategory = createAsyncThunk<
  { id: number },
  { id: number }
>("categories/delete", async ({ id }, thunkAPI) => {
  try {
    toast.dismiss();
    toast.loading("Deleting category...");

    const response = await axiosInstance.delete(
      `${process.env.NEXT_PUBLIC_API_URL_BASE}/api/v1/inventory/categories/delete-category/${id}`
    );

    const data = response.data.response;

    mutate(
      `${process.env.NEXT_PUBLIC_API_URL_BASE}/api/v1/inventory/categories/get-all-categories`
    );

    if (data.access_token) thunkAPI.dispatch(setAccessToken(data.access_token));

    toast.dismiss();
    toast.success("Category deleted successfully");

    thunkAPI.dispatch(hideModal());

    return { id };
  } catch (error) {
    toast.dismiss();
    const errorMessage =
      axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : "Failed to delete category";
    toast.error(errorMessage);
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.map((c) =>
          c.id === action.payload.id ? action.payload : c
        );
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter(
          (c) => c.id !== action.payload.id
        );
      });
  },
});

export const selectCategories = (state: RootState) =>
  state.categories.categories;
export const selectCategory = (state: RootState) => state.categories.category;
export const selectCategoriesLoading = (state: RootState) =>
  state.categories.loading;

export default categoriesSlice.reducer;
