// components/ui/NotificationModal.tsx (or wherever you keep it)
"use client";

import { useAppDispatch, useAppSelector } from "@/app/rtk-base/hook";
import { RootState } from "@/app/rtk-base/store";
import { hideNotificationModal } from "@/app/rtk-base/slices/notificationModalSlice";
import { HiOutlineX } from "react-icons/hi";
import Overlay from "@/app/global-components/OverlayComponent";

type NotificationModalProps = {
  onConfirm?: (extraData?: { id?: number }) => void;
  onCancel?: () => void;
};
export default function NotificationModal({ onConfirm, onCancel }: NotificationModalProps) {
  const dispatch = useAppDispatch();

  const {
    isOpen,
    type = "info",
    title = "",
    message = "",
    confirmText = "Okay",
    cancelText = "Cancel",
    extraData,
  } = useAppSelector((state: RootState) => state.notificationModal);

  if (!isOpen) return null;

  const handleClose = () => dispatch(hideNotificationModal());

  const handleConfirm = () => {
  if (onConfirm) onConfirm(extraData); // pass object
  handleClose();
};
  const handleCancel = () => {
    if (onCancel) onCancel?.();
    handleClose();
  };


  return (
    <Overlay onClose={handleClose}>
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2
            className={`text-lg font-semibold capitalize ${
              type === "success"
                ? "text-[#3cac84]"
                : type === "error"
                ? "text-red-600"
                : type === "warning"
                ? "text-[#021d12]"
                : "text-gray-800"
            }`}
          >
            {title}
          </h2>

          {type !== "loading" && (
            <button onClick={handleClose} className="text-gray-500 hover:text-[#021d12] cursor-pointer">
              <HiOutlineX size={20} />
            </button>
          )}
        </div>

        {/* message / loading */}
        <div className="mb-6">
          {type === "loading" ? (
            <div className="flex items-center gap-3">
              <span className="w-5 h-5 border-2 border-t-transparent border-[#3cac84] rounded-full animate-spin" />
              <span className="text-[#021d12]">Loading, please wait...</span>
            </div>
          ) : (
            <p className="text-gray-700">{message}</p>
          )}
        </div>

        {/* actions */}
        {type !== "loading" && (
          <div className="flex justify-end gap-3">
            {/* Cancel button (Tea Green hover) */}
            <button
              onClick={handleCancel}
              className="px-4 py-2 rounded-md border border-[#021d12] text-[#021d12] hover:bg-[#a6e0ab] transition"
            >
              {cancelText}
            </button>

            {/* Confirm button (Zomp) */}
            <button
              onClick={handleConfirm}
              className="px-4 py-2 bg-[#3cac84] hover:bg-[#2f8f6f] text-white rounded-md transition"
            >
              {confirmText}
            </button>
          </div>
        )}
      </div>
    </Overlay>
  );
}
