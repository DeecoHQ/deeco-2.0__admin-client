// store/slices/formModalSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ModalType = "create" | "update";
type ModalEntity = 'product' | 'category' | 'brand';

interface ModalData {
  type: ModalType;
  entity: ModalEntity;
  extraProps?: {
    productId?: number; // <-- move productId here
  };
}


interface FormModalState {
  isOpen: boolean;
  modalData: ModalData | null;
}

const initialState: FormModalState = {
  isOpen: false,
  modalData: null,
};

const formModalSlice = createSlice({
  name: "formModal",
  initialState,
  reducers: {
    showModal: (state, action: PayloadAction<ModalData>) => {
      state.isOpen = true;
      state.modalData = action.payload;
    },
    hideModal: (state) => {
      state.isOpen = false;
      state.modalData = null;
    },
  },
});

export const { showModal, hideModal } = formModalSlice.actions;
export default formModalSlice.reducer;
