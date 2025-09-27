"use client";

import { useState } from 'react';
import PageRoutesIndicator from '../components/PageRoutesIndicator';
import { MdLibraryAdd, MdOutlineNoteAlt } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { showModal } from '@/app/rtk-base/slices/entityFormSlice';
import FloatingActionGroup from './../components/FloatingActionGroup';
import ContractDetailsPopOver from '../components/ContractDetailsPopOver';

export default function ProductsPage() {
  const dispatch = useDispatch();
  // const [isContractDeployed, setIsContractDeployed] = useState(false);

  return (
    <main className='min-h-screen flex flex-col'>
      <section className='border-b-[1px] pb-1 border-gray-200 flex justify-between'>
        <PageRoutesIndicator
          pageRoutes='Admin / Products'
          pageTitle='Products'
        />
        <ContractDetailsPopOver
          contractName='Products Contract'
          contractAddress='0x1234567890abcdef1234567890abcdef12345678'
          status='active'
          blockExplorerLink='https://etherscan.io/address/0x1234567890abcdef1234567890abcdef12345678'
        />
      </section>

      {/* <div
        className={`${
          !isContractDeployed ? 'flex' : 'hidden'
        } flex items-center justify-center mt-[200px]`}
      >
        <div className='text-center'>
          <h2 className='text-2xl font-semibold mb-2'>Products Overview</h2>
          <p className='text-gray-600'>
            You have not activated the product management feature
          </p>
          <button className='mt-[30px] px-8 py-3 bg-[#043D25] rounded-[7px] text-white cursor-pointer'>
            Activate Feature
          </button>
        </div>
      </div> */}

      {/* ✅ Reusable Floating Buttons */}
      {/* <section className={`${isContractDeployed ? 'flex' : 'hidden'}`}> */}
      <FloatingActionGroup
        actions={[
          {
            icon: <MdOutlineNoteAlt size={32} />,
            onClick: () => {
              dispatch(
                showModal({
                  type: 'update',
                  entity: 'products',
                  productId: 1,
                })
              );
            },
            label: 'Update Product',
          },
          {
            icon: <MdLibraryAdd size={32} />,
            onClick: () =>
              dispatch(showModal({ type: 'create', entity: 'products' })),
            label: 'Create Product',
          },
        ]}
      />

      {/* </section> */}
    </main>
  );
}
