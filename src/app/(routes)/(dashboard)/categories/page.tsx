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
      <section className='border-b-[1px] pb-1 border-gray-200'>
        <PageRoutesIndicator
          pageRoutes='Admin / Categories'
          pageTitle='Categories'
        />
      </section>

      <div className='flex mt-[150px] items-center justify-center mt-[200px'>
        <div className='text-center md:w-[80%] xl:w-[70%] md:mx-auto'>
          <h2 className='text-2xl font-semibold mb-2'>Categories</h2>
          <p className='text-gray-600'>
            Categories help you customize the experience of your users. <br />
            Add details of the brands you support, and we will display them on
            your store.
            <br /> <br />
            Ensure to use consistent designs for each category image/icon you
            want.
            <br />
            Good Luck!!!
          </p>
        </div>
      </div>

      {/* ✅ Reusable Floating Buttons */}
      <FloatingActionGroup
        actions={[
          // {
          //   icon: <MdOutlineNoteAlt size={32} className='hidden' />,
          //   onClick: () =>
          //     dispatch(showModal({ type: 'update', entity: 'categories' })),
          //   label: 'Update Category',
          // },
          {
            icon: <MdLibraryAdd size={32} />,
            onClick: () =>
              dispatch(showModal({ type: 'create', entity: 'categories' })),
            label: 'Create Category',
          },
        ]}
      />
    </main>
  );
}
