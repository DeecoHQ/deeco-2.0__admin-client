'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  HiHome,
  HiShoppingBag,
  HiMiniSquaresPlus,
  HiUserGroup,
  HiMiniWrenchScrewdriver,
  HiMiniViewColumns,
  HiClipboardDocumentList,
  HiBuildingStorefront,
  HiQueueList,
  HiChartBar,
  HiCog6Tooth,
  HiPlusCircle,
  HiOutlineXMark,
  HiMiniQueueList,
  HiChatBubbleLeftRight,
} from 'react-icons/hi2';
import { useAppDispatch, useAppSelector } from '@/app/rtk-base/store';
import { FaRegBell } from 'react-icons/fa';
import { BiMessageDetail } from 'react-icons/bi';

const sidebarLinks = [
  { path: '/', label: 'Home', icon: <HiHome className='text-[18px]' /> },
  {
    path: '/orders',
    label: 'Orders',
    icon: <HiShoppingBag className='text-[18px]' />,
  },
  {
    path: '/products',
    label: 'Products',
    icon: <HiMiniViewColumns className='text-[18px]' />,
  },
  {
    path: '/customers',
    label: 'Customers',
    icon: <HiUserGroup className='text-[18px]' />,
  },
  {
    path: '/brands',
    label: 'Brands',
    icon: <HiMiniQueueList className='text-[18px]' />,
  },
  {
    path: '/categories',
    label: 'Categories',
    icon: <HiMiniSquaresPlus className='text-[18px]' />,
  },
  {
    path: '/analytics',
    label: 'Analytics',
    icon: <HiChartBar className='text-[18px]' />,
  },
];

type NavLinksProps = {
  toggleSideBar: () => void;
};

const MobileNavLinksArea = ({ toggleSideBar }: NavLinksProps) => {
  // const userInfo = useAppSelector((state) => state.auth.localStorageUserData);

  // after relaod, state is cleared, so get userInfo from local storage not from state.

  type ProfileImage = {
    image_url?: string;
    last_fetch?: string;
  };

  type UserInfoSpecs = {
    name: string;
    email: string;
    profile_image?: ProfileImage | null;
  };

  const [userInfo, setUserInfo] = useState<UserInfoSpecs>({
    profile_image: null,
    name: '',
    email: '',
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedData = localStorage.getItem('userInfo');
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setUserInfo({
            profile_image: parsedData.profile_image || null,
            name: parsedData.name || '',
            email: parsedData.email || '',
          });
        }
      } catch (error) {
        console.error('Error parsing myAppUserInfo from localStorage:', error);
      }
    }
  }, []);

  return (
    <aside className='py-4 px-3'>
      <div className='text-[12px] flex justify-end'>
        <div className='flex items-center justify-between w-full'>
          <section className='flex items-center gap-4'>
            {/* User avatar + Store */}
            <div className='flex items-center gap-2'>
              <div className='w-10 h-10 flex items-center justify-center rounded-full bg-[#3cac84] font-semibold'>
                {userInfo?.name
                  ? userInfo.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .toUpperCase()
                  : 'MS'}
              </div>
              <div className='flex flex-col justify-center text-[12px]'>
                <span className='truncate'>
                  {userInfo?.email || '---- ---- ---- ----'}
                </span>
                <span>---- ----</span>
              </div>
            </div>
          </section>
          <section
            onClick={toggleSideBar}
            className='w-[40px] h-[40px] border-[1px] rounded-full flex items-center justify-center'
          >
            <HiOutlineXMark className='text-[25px]' />
          </section>
        </div>
      </div>
      <div className='py-10'>
        <ul className='flex flex-col gap-y-1 mb-20'>
          {sidebarLinks.map(({ path, label, icon }) => (
            <li key={path}>
              <Link
                onClick={toggleSideBar}
                href={path}
                className='flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-200 text-sm text-gray-800'
              >
                {icon}
                <span>{label}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className='mt-6 text-xs font-semibold text-gray-500 px-3'>
          Store Front
        </div>
        <ul className='mt-2 flex flex-col gap-y-1'>
          <li>
            <Link
              href='/'
              className='flex gap-3 px-3 py-2 rounded-md text-sm text-gray-800 items-center'
            >
              <HiBuildingStorefront className='text-[20px] cursor-pointer text-[#2F2F30]' />
              <span>Visit Store</span>
            </Link>
          </li>
        </ul>

        <div className='mt-6 text-xs font-semibold text-gray-500 px-3'>
          Deeco Support
        </div>
        <ul className='mt-2 flex flex-col gap-y-1'>
          <li>
            <Link
              href='/'
              className='flex gap-3 px-3 py-2 rounded-md text-sm text-gray-800 items-center'
            >
              <HiChatBubbleLeftRight className='text-[20px] cursor-pointer text-[#2F2F30]' />
              <span>Start a chat</span>
            </Link>
          </li>
        </ul>

        {/*} <div className='mt-6 text-xs font-semibold text-gray-500 px-3'>
          Apps
        </div>
        <ul className='mt-2 flex flex-col gap-y-1'>
          <li>
            <Link
              href='/apps/add'
              className='flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-200 text-sm text-gray-800'
            >
              <HiPlusCircle className='text-[18px]' />
              <span>Add</span>
            </Link>
          </li>
        </ul> */}
      </div>

      {/* Bottom settings */}
      <div className='px-3 py-4 border-t border-gray-200 poppins'>
        <Link
          href='/'
          className='flex items-center gap-3 py-2 rounded-md hover:bg-gray-200 text-sm text-gray-800'
        >
          <HiCog6Tooth className='text-[18px]' />
          <span>Settings</span>
        </Link>
      </div>
      {/* // </nav> */}
    </aside>
  );
};

export default MobileNavLinksArea;
