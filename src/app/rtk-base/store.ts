import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import entityFormReducer from "@/app/rtk-base/slices/entityFormSlice";
import notificationModalReducer from "@/app/rtk-base/slices/notificationModalSlice";
import AuthReducer from "@/app/rtk-base/slices/authSlice";
import ProductReducer from "@/app/rtk-base/slices/Inventory/productSlice";

export const store = configureStore({
  reducer: {
    formModal: entityFormReducer,
    notificationModal: notificationModalReducer,
    auth:AuthReducer,
    products:ProductReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;;

// Custom hooks for typed dispatch and selector
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
