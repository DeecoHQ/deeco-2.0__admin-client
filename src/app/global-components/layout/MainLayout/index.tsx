"use client";

import React from 'react';
import DesktopSideNavbar from '../NavBar/components/DesktopSideNavbar';
import DesktopTopNavbar from '../NavBar/components/DesktopTopNavbar';
import MobileNavbar from '../NavBar/components/MobileNavbar';
import FormModalsCenter from '@/app/(routes)/(dashboard)/components/FormModalsCenter';
import GlobalModal from '@/app/global-components/NotificationModal';
import DeecoRouteProtector from '@/app/global-components/DeecoRouteProtector';
import { useAppDispatch } from '@/app/rtk-base/hook';
import { deleteProduct } from '@/app/rtk-base/slices/Inventory/productSlice';
import { deleteCategory } from '@/app/rtk-base/slices/Inventory/categorySlice';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  return (
    <DeecoRouteProtector>
      <div className='w-screen h-screen overflow-auto bg-[#fcfcfc]'>
        <div className='lg:hidden'>
          <MobileNavbar />
        </div>
        <div className='hidden lg:block'>
          <DesktopSideNavbar />
          <DesktopTopNavbar />
        </div>
        <main className='relative w-full lg:w-[calc(100%-250px)] mt-10 lg:mt-0 lg:ml-[250px] pt-4 lg:pt-6 px-3 sm:px-[20px] overflow-y-auto lg:top-[40px]'>
          {children}
        </main>
      </div>

      <GlobalModal
        onConfirm={(extraData) => {
          if (extraData?.id) {
            dispatch(deleteProduct({ id: extraData.id }));
            dispatch(deleteCategory({ id: extraData.id }));
          }
        }}
      />
      <FormModalsCenter />
    </DeecoRouteProtector>
  );
};

export default MainLayout;
