"use client";

import PageRoutesIndicator from "../components/PageRoutesIndicator";
import { MdLibraryAdd, MdOutlineNoteAlt } from "react-icons/md";
import { useDispatch } from "react-redux";
import { showModal } from "@/app/rtk-base/slices/entityFormSlice";
import FloatingActionGroup from "./../components/FloatingActionGroup";

export default function BrandsPage() {
  const dispatch = useDispatch();

  return (
    <main className='min-h-screen flex flex-col'>
      <PageRoutesIndicator
        pageRoutes='Admin / Brands Page'
        pageTitle='Brands Page'
      />

      <div className='flex-1 flex items-center justify-center'>
        <div className='text-center'>
          <h2 className='text-2xl font-semibold mb-2'>Brands Overview</h2>
          <p className='text-gray-600'>
            This is some dummy text for the Brands page.
          </p>
        </div>
      </div>

      {/* ✅ Reusable Floating Buttons */}
      <FloatingActionGroup
        actions={[
          {
            icon: <MdOutlineNoteAlt size={32} />,
            onClick: () =>
              dispatch(showModal({ type: 'update', entity: 'brands' })),
            label: 'Update Brands',
          },
          {
            icon: <MdLibraryAdd size={32} />,
            onClick: () =>
              dispatch(showModal({ type: 'create', entity: 'brands' })),
            label: 'Create Brands',
          },
        ]}
      />
    </main>
  );
}
