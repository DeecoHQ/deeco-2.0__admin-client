import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "@/app/rtk-base/slices/counter-slice";
import entityFormReducer from "@/app/rtk-base/slices/entityFormSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    formModal: entityFormReducer
  },
});

// Types for later use in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;;
