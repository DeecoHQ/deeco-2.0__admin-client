import { configureStore } from "@reduxjs/toolkit";
import entityFormReducer from "@/app/rtk-base/slices/entityFormSlice";

export const store = configureStore({
  reducer: {
    formModal: entityFormReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;;
