"use client";

import PageRoutesIndicator from "../components/PageRoutesIndicator";
import { HiPlus } from 'react-icons/hi2';
import { useDispatch } from 'react-redux';
import { showModal } from '@/app/rtk-base/slices/inventoryFormsSlice';
import FloatingActionGroup from './../components/FloatingActionGroup';

export default function BrandsPage() {
  const dispatch = useDispatch();

  return (
    <main className='min-h-screen flex flex-col'>
      <section className='border-b-[1px] pb-1 border-gray-200'>
        <PageRoutesIndicator pageRoutes='Admin / Brands' pageTitle='Brands' />
      </section>
      <div className='flex mt-[150px] items-center justify-center mt-[200px'>
        <div className='text-center md:w-[80%] xl:w-[70%] md:mx-auto'>
          <h2 className='text-2xl font-semibold mb-2'>Brands</h2>
          <p className='text-gray-600'>
            Brands help you customize the experience of your users. <br />
            Add details of the brands you support, and we will display them on
            your store.
            <br /> <br />
            Ensure to maintain a consistent design pattern across every brand
            image/icon you add.
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
          //     dispatch(showModal({ type: 'update', entity: 'brands' })),
          //   label: 'Update Brands',
          // },
          {
            icon: <HiPlus size={32} />,
            onClick: () =>
              dispatch(showModal({ type: 'create', entity: 'brand' })),
            label: 'Create Brand',
          },
        ]}
      />
    </main>
  );
}
