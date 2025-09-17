'use client';

import { JSX, useState } from 'react';
import { HiSquares2X2 } from 'react-icons/hi2';
import MobileNavLinksArea from '../MobileNavLinksArea';
import Image from 'next/image';
import Logo from '@/app/assets/logo-black.png';
import { HiClock, HiBell, HiOutlineBars3BottomLeft } from 'react-icons/hi2';
import { BiMessageDetail } from 'react-icons/bi';
import Link from 'next/link';

function MobileNavBar(): JSX.Element {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);

  const toggleSideBar = (): void => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <>
      {/* Top mobile navbar */}
      <div className='lg:hidden w-full bg-white shadow-sm z-30 fixed top-0 left-0 right-0'>
        <div className='flex items-center justify-between py-1 px-3'>
          {/* Logo */}
          <section className='flex gap-x-2.5 items-center'>
            <div className='flex justify-center items-center'>
              <HiOutlineBars3BottomLeft
                onClick={toggleSideBar}
                className='w-6 h-6 cursor-pointer text-[#2F2F30]'
              />
            </div>
            <div className='relative h-[40px] w-[80px] flex items-center'>
              <Image
                src={Logo}
                alt='platform logo'
                width={80}
                height={40}
                className='mx-auto'
              />
            </div>
          </section>

          <section className='flex gap-x-3 items-center'>
            {/* <div>
              <BiMessageDetail className='text-[25px] cursor-pointer text-[#2F2F30]' />
            </div> */}
            <Link href='/notifications' className='relative'>
              <div
                className='notifications-count w-[20px] h-[20px] rounded-full bg-[#FE6F48] text-white
                  flex items-center justify-center text-[10px] font-semibold absolute top-[-8px] right-[-5px]'
              >
                5
              </div>
              <HiBell className='text-[25px] cursor-pointer text-[#2F2F30]' />
            </Link>
            <button className='py-2 px-3 bg-[#043D25] text-white rounded-[10px] text-[12px]'>
              Connect Wallet
            </button>
          </section>
        </div>
      </div>

      {/* Overlay */}
      {isNavOpen && (
        <div
          className='fixed inset-0 bg-black/30 backdrop-blur-sm z-40'
          onClick={toggleSideBar}
        ></div>
      )}

      {/* Sidebar */}
      <section
        className={`sidenav-content-wrapper ${
          isNavOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-500 fixed top-0 left-0 w-[80%] sm:w-[40%] h-full bg-white border-r border-gray-200 flex flex-col z-50`}
      >
        <div>
          <MobileNavLinksArea toggleSideBar={toggleSideBar} />
        </div>
      </section>
    </>
  );
}

export default MobileNavBar;
