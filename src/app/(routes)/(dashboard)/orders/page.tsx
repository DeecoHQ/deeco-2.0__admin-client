'use client';

import { useState } from 'react';
import ContractDetailsPopOver from '../components/ContractDetailsPopOver';
import PageRoutesIndicator from '../components/PageRoutesIndicator';
// import { MdLibraryAdd, MdOutlineNoteAlt } from "react-icons/md";

export default function OrdersPage() {
  // const dispatch = useDispatch();
  const [isContractDeployed, setIsContractDeployed] = useState(false);

  return (
    <main className='min-h-screen flex flex-col'>
      <section className='border-b-[1px] pb-3 border-gray-200 flex justify-between'>
        <PageRoutesIndicator
          pageRoutes='Admin / Orders Page'
          pageTitle='Orders Page'
        />
        <ContractDetailsPopOver
          contractName='Order Management Contract'
          contractAddress='0x1234567890abcdef1234567890abcdef12345678'
          status='active'
          blockExplorerLink='https://etherscan.io/address/0x1234567890abcdef1234567890abcdef12345678'
        />
      </section>

      <div
        className={`${
          !isContractDeployed ? 'flex' : 'hidden'
        } flex items-center justify-center mt-[200px]`}
      >
        <div className='text-center'>
          <h2 className='text-2xl font-semibold mb-2'>Order Management</h2>
          <p className='text-gray-600'>
            You have not activated the order management feature
          </p>
          <button className='mt-[30px] px-8 py-3 bg-[#043D25] rounded-[7px] text-white cursor-pointer'>
            Activate Feature
          </button>
        </div>
      </div>
    </main>
  );
}
