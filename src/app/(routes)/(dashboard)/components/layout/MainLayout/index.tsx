'use client';

import React from 'react';
import DesktopSideNavbar from '../NavBar/components/DesktopSideNavbar';
import DesktopTopNavbar from '../NavBar/components/DesktopTopNavbar';
import MobileNavbar from '../NavBar/components/MobileNavbar';
import DeecoRouteProtector from '@/app/global-components/DeecoRouteProtector';

const MainLayout = ({ children }: { children: React.ReactNode }) => (
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
  </DeecoRouteProtector>
);

export default MainLayout;
