'use client';
import Image from 'next/image';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import Logo from '@/app/assets/logo-white.png';
import { FaRegBell } from 'react-icons/fa';
import { BiMessageDetail } from 'react-icons/bi';
import Link from 'next/link';

const AdminTopBar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 h-[65px] bg-[#021d12] text-white flex items-center justify-between px-4 shadow z-10">
       <Link href="/" className="relative h-[32px] w-[120px] flex items-center">
          <Image
            src={Logo}
            alt="platform logo"
            fill
            style={{ objectFit: "contain" }}
            sizes="100px"
            priority
          />
      </Link>

      {/* Middle: Search */}
      <div className='flex items-center w-[400px] max-w-md bg-[#303030] rounded-md px-3 py-1'>
        <HiMagnifyingGlass className='text-gray-400 text-lg mr-2' />
        <input
          type='text'
          placeholder='Search'
          className='flex-1 bg-transparent outline-none text-sm placeholder-gray-400'
        />
        <div className='hidden sm:flex items-center text-xs text-gray-400 gap-1'>
          <span className='px-1 py-0.5 rounded bg-[#1C1C1C] border border-[#3a3a3a]'>
            search
          </span>
        </div>
      </div>

      {/* Right: Icons & Store */}
      <div className='flex items-center gap-4'>
        <BiMessageDetail className='text-lg cursor-pointer' />
        <FaRegBell className='text-lg cursor-pointer' />

        {/* User avatar + Store */}
        <section className='flex items-center gap-4'>
          {/* User avatar + Store */}
          <div className='flex items-center gap-4'>
            <div className='flex flex-col justify-center text-[12px]'>
              <span>ikechukwupowei21@gmai...</span>
              <span>My Store</span>
            </div>
            <div className='w-8 h-8 flex items-center justify-center rounded-full bg-[#3cac84]'>
              MS
            </div>
          </div>
        </section>
      </div>
    </header>
  );
};

export default AdminTopBar;
