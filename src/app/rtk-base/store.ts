import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "@/app/rtk-base/slices/counter-slice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

// Types for later use in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;;
