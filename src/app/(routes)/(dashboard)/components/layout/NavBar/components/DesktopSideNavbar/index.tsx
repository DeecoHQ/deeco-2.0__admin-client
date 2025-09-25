'use client';
import Link from 'next/link';
import { useWallet } from '@/app/lib/wallet/walletProvider';
import { useState } from 'react';
import {
  HiHome,
  HiShoppingBag,
  HiMiniSquaresPlus,
  HiUserGroup,
  HiMiniViewColumns,
  HiMiniQueueList,
  HiChartBar,
  HiCog6Tooth,
  HiChatBubbleLeftRight,
  HiBuildingStorefront,
} from 'react-icons/hi2';

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

const AdminSidebar = () => {
  const { connect, disconnect, address } = useWallet();
  const [loading, setLoading] = useState(false);

  const handleConnect = async () => {
    try {
      setLoading(true);
      await connect();
    } catch (err) {
      console.error('Wallet connect error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside className='fixed pt-16 left-0 w-[250px] h-full bg-[#f6f6f7] rounded-tl-4xl border-gray-200 flex flex-col'>
      {/* Main content */}
      <div className='h-[80%] px-3'>
        <ul className='flex flex-col gap-y-1'>
          {sidebarLinks.map(({ path, label, icon }) => (
            <li key={path}>
              <Link
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
              href='/online-store'
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
              href='/online-store'
              className='flex gap-3 px-3 py-2 rounded-md text-sm text-gray-800 items-center'
            >
              <HiChatBubbleLeftRight className='text-[20px] cursor-pointer text-[#2F2F30]' />
              <span>Start a chat</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Bottom settings */}
      <div className='px-3 py-4 border-t border-gray-200'>
        <Link
          href='/settings'
          className='flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-200 text-sm text-gray-800'
        >
          <HiCog6Tooth className='text-[18px]' />
          <span>Settings</span>
        </Link>
      </div>
      <section className='px-3 w-full mb-4'>
        {address ? (
          <button
            onClick={disconnect}
            className='py-3 px-3 bg-red-700 text-white w-full rounded-[10px] text-[14px] text-center cursor-pointer'
          >
            Disconnect ({address.slice(0, 6)}...{address.slice(-4)})
          </button>
        ) : (
          <button
            onClick={handleConnect}
            className='cursor-pointer py-3 px-3 bg-[#043D25] text-white w-full rounded-[10px] text-[14px] text-center flex items-center justify-center gap-2'
          >
            {loading && (
              <span className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></span>
            )}
            {loading ? 'Connecting...' : 'Connect Wallet'}
          </button>
        )}
      </section>
    </aside>
  );
};

export default AdminSidebar;
