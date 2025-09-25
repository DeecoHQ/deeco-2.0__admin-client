import React from 'react';
import { HiMiniEllipsisVertical } from 'react-icons/hi2';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';

function StatusIndicator({ status }: { status: string }) {
  return (
    <section className='flex items-center gap-2'>
      <div className='font-semibold'>Status:</div>
      <div
        className={`
        relative pl-4 after:content-[''] after:w-[10px] after:h-[10px] after:rounded-full after:absolute after:left-0 after:top-1/2 after:-translate-y-1/2
        ${
          status === 'active'
            ? 'after:bg-green-500 text-green-600'
            : 'after:bg-red-500 text-red-600'
        }
      `}
      >
        {status === 'active' ? 'Active' : 'Inactive'}
      </div>
    </section>
  );
}

function shortenAddress(address: string) {
  if (!address) return '';
  const first = address.slice(0, 15);
  const last = address.slice(-7);
  return `${first}...${last}`;
}

function ContractDetailsPopOver({
  contractName,
  contractAddress,
  status,
  blockExplorerLink,
}: {
  contractName: string;
  contractAddress: string;
  status: string;
  blockExplorerLink: string;
}) {
  return (
    <section
      className='relative w-[250px] flex flex-row-reverse'
      // onClick={toggleSideBar}
    >
      <Popover className='relative'>
        <PopoverButton className='outline-none'>
          {' '}
          <button className='w-[35px] h-[35px] border-[1px] rounded-full flex items-center justify-center outline-none'>
            <HiMiniEllipsisVertical className='text-[22px] outline-none' />
          </button>
        </PopoverButton>
        <PopoverPanel anchor='bottom'>
          <div className='flex flex-col gap-y-3 text-[12px] relative bg-gray-200 w-[250px] p-3 rounded-[7px] mr-3 mt-2 sm:mr-6 lg:mr-8 xl:mr-6'>
            <div className='flex gap-2 flex-col'>
              <span className='font-semibold'>Contract Name:</span>{' '}
              <span>{contractName}</span>
            </div>
            <section className='flex gap-2 flex-col'>
              <div className='font-semibold'>Address:</div>
              <div>{shortenAddress(contractAddress)}</div>
            </section>
            <section className='flex gap-2'>
              <StatusIndicator status={status} />
            </section>
            <div className='mt-2'>
              <a
                href={blockExplorerLink}
                className='inline-block outline-none px-5 py-1 rounded-md bg-slate-600 text-white text-sm font-medium hover:bg-slate-700 transition-colors'
              >
                View contract
              </a>
            </div>
          </div>
        </PopoverPanel>
      </Popover>
    </section>
  );
}

export default ContractDetailsPopOver;
