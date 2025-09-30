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
      <section className='border-b-[1px] pb-1 border-gray-200 flex justify-between'>
        <PageRoutesIndicator pageRoutes='Admin / Orders' pageTitle='Orders' />
        <ContractDetailsPopOver
          contractName='Order Management Contract'
          contractAddress='0x0000000000000000000000000'
          status='inactive'
          blockExplorerLink='/'
        />
      </section>

      <div
        className={`${
          !isContractDeployed ? 'flex' : 'hidden'
        } flex items-center justify-center mt-[150px]`}
      >
        <div className='text-center md:w-[70%] xl:w-[50%] md:mx-auto'>
          <h2 className='text-2xl font-semibold mb-2'>Order Management</h2>
          <p className='text-gray-600'>
            You have not activated the order management feature. <br /> Activate
            this feature, and we will deploy your own order management
            smart-contract on-chain, so you can track orders and start receiving
            payments.
          </p>
          <button className='mt-[30px] px-8 py-3 bg-[#043D25] rounded-[7px] text-white cursor-pointer'>
            Activate Feature
          </button>
        </div>
      </div>
    </main>
  );
}
