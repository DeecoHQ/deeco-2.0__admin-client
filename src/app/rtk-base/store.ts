import { configureStore } from "@reduxjs/toolkit";
import entityFormReducer from "@/app/rtk-base/slices/entityFormSlice";
import notificationModalReducer from "@/app/rtk-base/slices/globalModalSlice";

export const store = configureStore({
  reducer: {
    formModal: entityFormReducer,
    notificationModal: notificationModalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;;
