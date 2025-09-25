"use client";

import PageRoutesIndicator from "../components/PageRoutesIndicator";
import { useAppDispatch } from "@/app/rtk-base/hook";
import { showNotificationModal } from "@/app/rtk-base/slices/globalModalSlice";
import GlobalModal from "@/app/global-components/GlobalModal";

export default function Home() {
const dispatch = useAppDispatch();

  const openModal = () => {
    dispatch(
      showNotificationModal({
        type: "warning",
        title: "Are you sure?",
        message: "This action cannot be undone.",
        confirmText: "Yes",
        cancelText: "No",
      })
    );
  };


  return (
    <>
      <main className="p-6 min-h-screen flex flex-col">
        <PageRoutesIndicator
          pageRoutes="Admin / Dashboard Home"
          pageTitle="Dashboard Home"
        />
        <div className="flex-1 flex flex-col items-center justify-center gap-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">Home Overview</h2>
            <p className="text-gray-600">
              This is some dummy text for the Home page.
            </p>
          </div>

          {/* Demo Buttons to trigger modal */}
          <button
            onClick={openModal}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
        Open Modal
          </button>

      <GlobalModal
        onConfirm={() => console.log("Confirmed!")}
        onCancel={() => console.log("Cancelled!")}
      />
        </div>
      </main>
    </>
  );
}
