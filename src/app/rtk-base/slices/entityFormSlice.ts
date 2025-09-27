// store/slices/formModalSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ModalType = "create" | "update";
type ModalEntity = "orders" | "products" | "categories" | "brands";

interface ModalData {
  type: ModalType;
  entity: ModalEntity;
  productId?: number; 
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
