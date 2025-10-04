// slices/globalModalSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type NotificationModalState = {
  isOpen: boolean;
  type: "success" | "error" | "warning" | "loading";
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  extraData?: { id?: number }; 
};

const initialState: NotificationModalState = {
  isOpen: false,
  type: "success",
  title: "",
  message: "",
};

const notificationModalSlice = createSlice({
  name: "notificationModal",
  initialState,
  reducers: {
    showNotificationModal: (state, action: PayloadAction<Partial<NotificationModalState>>) => {
      return { ...state, ...action.payload, isOpen: true };
    },
    hideNotificationModal: () => initialState,
  },
});

export const { showNotificationModal, hideNotificationModal } =
  notificationModalSlice.actions;

export default notificationModalSlice.reducer;
