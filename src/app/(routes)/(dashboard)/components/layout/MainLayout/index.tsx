'use client';
import React from 'react';
import DesktopSideNavbar from '../NavBar/components/DesktopSideNavbar';
import DesktopTopNavbar from '../NavBar/components/DesktopTopNavbar';
import MobileNavbar from '../NavBar/components/MobileNavbar';

const MainLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="w-screen h-screen overflow-auto bg-[#fcfcfc]">
    <div className="lg:hidden">
      <MobileNavbar />
    </div>
    <div className="hidden lg:block">
      <DesktopSideNavbar />
      <DesktopTopNavbar />
    </div>
    <main className="relative w-full lg:w-[calc(100%-250px)] mt-10 lg:mt-0 lg:ml-[250px] overflow-y-auto p-3 sm:p-6 lg:top-[65px]">{children}</main>
  </div>
);

export default MainLayout;
