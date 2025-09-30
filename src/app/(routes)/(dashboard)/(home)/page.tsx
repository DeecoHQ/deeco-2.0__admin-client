"use client";

import PageRoutesIndicator from "../components/PageRoutesIndicator";
import { useAppDispatch } from "@/app/rtk-base/hook";
import { showNotificationModal } from "@/app/rtk-base/slices/notificationModalSlice";
import {
  HiMiniUsers,
  HiMiniSquaresPlus,
  HiMiniRectangleGroup,
} from 'react-icons/hi2';
import Link from 'next/link';

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
      <main className='min-h-screen flex flex-col'>
        <section className='border-b-[1px] pb-1 border-gray-200'>
          <PageRoutesIndicator
            pageRoutes='Admin / Dashboard Home'
            pageTitle='Home'
          />
        </section>
        <div className='w-full pt-12 pb-20 mb-20 md:mt-20'>
          <div className='text-center'>
            <h2 className='text-3xl p-4 md:text-4xl font-semibold mb-2 leading-[40px] sm:leading-[50px]'>
              The best way to sell anything online. <br /> Right in your
              hands!!!
            </h2>
            <section className='mt-4 mb-4 flex flex-col sm:flex-row items-center justify-center sm:space-x-8 space-y-4 sm:space-y-0'>
              <div className="relative after:content-[''] after:w-[6px] after:h-[6px] after:bg-black after:rounded-full after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 sm:after:top-1/2 sm:after:left-auto sm:after:-right-4 sm:after:-translate-y-1/2 sm:after:translate-x-0 last:after:hidden">
                Zero Subscription Fees
              </div>
              <div className="relative after:content-[''] after:w-[6px] after:h-[6px] after:bg-black after:rounded-full after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 sm:after:top-1/2 sm:after:left-auto sm:after:-right-4 sm:after:-translate-y-1/2 sm:after:translate-x-0 last:after:hidden">
                Instant Payouts
              </div>
              <div className="relative after:content-[''] after:w-[6px] after:h-[6px] after:bg-black after:rounded-full after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 sm:after:top-1/2 sm:after:left-auto sm:after:-right-4 sm:after:-translate-y-1/2 sm:after:translate-x-0 last:after:hidden">
                Just Sell!!!
              </div>
            </section>
          </div>
          {/* Demo Buttons to trigger modal */}
          <div className='text-center hidden'>
            <button
              onClick={openModal}
              className='px-4 py-2 bg-green-600 cursor-pointer text-white rounded-md'
            >
              Open Modal
            </button>
          </div>
          <section className='md:w-[75%] lg:w-[60%] mx-auto grid sm:grid-cols-2 2xl:grid-cols-3 gap-4 py-5'>
            <div className='data-card bg-slate-100 flex flex-col p-4 rounded-[7px]'>
              <section className='flex gap-y-12 flex-col'>
                <div className='top flex items-center justify-between'>
                  <div className='poppins text-[16px] font-normal'>
                    Customers
                  </div>
                  <div>
                    <HiMiniUsers className='text-[30px]' />
                  </div>
                </div>
                <div className='base flex gap-x-1'>
                  <span className='text-[25px] sm:text-[30px] font-medium'>
                    12
                  </span>
                  <div className='h-[15px] mt-[15px] text-[14px]'>
                    +3 in the last 30 days
                  </div>
                </div>
              </section>
              <div className='mt-3'>
                <Link
                  href='/customers'
                  className='inline-block px-5 py-1 rounded-md bg-slate-600 text-white text-sm font-medium hover:bg-slate-700 transition-colors'
                >
                  View all
                </Link>
              </div>
            </div>
            <div className='data-card bg-green-100 flex flex-col p-4 rounded-[7px]'>
              <section className='flex gap-y-12 flex-col'>
                <div className='top flex items-center justify-between'>
                  <div className='poppins text-[16px] font-normal'>
                    Products
                  </div>
                  <div>
                    <HiMiniSquaresPlus className='text-[30px]' />
                  </div>
                </div>
                <div className='base flex gap-x-1'>
                  <span className='text-[25px] sm:text-[30px] font-medium'>
                    25
                  </span>
                  <div className='h-[15px] mt-[15px] text-[14px]'>
                    +3 in the last 30 days
                  </div>
                </div>
              </section>
              <div className='mt-3'>
                <Link
                  href='/products'
                  className='inline-block px-5 py-1 rounded-md bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors'
                >
                  Go to products
                </Link>
              </div>
            </div>
            <div className='data-card bg-blue-100 flex flex-col justify-between p-4 rounded-[7px] min-h-[200px]'>
              <section className='flex gap-y-12 flex-col'>
                <div className='top flex items-center justify-between'>
                  <div className='poppins text-[16px] font-normal'>
                    Analytics
                  </div>
                  <div>
                    <HiMiniRectangleGroup className='text-[30px]' />
                  </div>
                </div>
              </section>
              <section>
                <div className='base flex gap-x-1'>
                  {/* <span className='text-[25px] sm:text-[30px] font-medium'>
                    1000
                  </span> */}
                  <div className='h-[15px] text-[14px]'>
                    +7 new orders in the last 24 hours
                  </div>
                </div>
                <div className='mt-3'>
                  <Link
                    href='/analytics'
                    className='inline-block px-5 py-1 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors'
                  >
                    View your store analytics
                  </Link>
                </div>
              </section>
            </div>
          </section>{' '}
        </div>
      </main>
    </>
  );
}
