'use client';

import React from 'react';
import PageRoutesIndicator from '../components/PageRoutesIndicator';
import ProfileSettingsForm from './components/ProfileSettingsForm';
import PasswordSettingsForm from './components/PasswordSettingsForm';
import StoreSettingsForm from './components/StoreSettingsForm';
import OnchainAdministratorSettingsForm from './components/OnchainAdministratorSettingsForm';

type Props = {
  address: string;
  onRemove?: (address: string) => void;
};

const AdminAddressItem: React.FC<Props> = ({ address, onRemove }) => {
  return (
    <section className='w-full mt-3'>
      <div className='flex items-center justify-between gap-3 bg-white rounded-[10px] py-2'>
        <span className='text-[13px] sm:text-[14px] font-mono text-gray-800 truncate'>
          {address}
        </span>

        <button
          type='button'
          aria-label={`Remove admin ${address}`}
          onClick={() => onRemove?.(address)}
          className='flex items-center gap-2 px-2 py-1 rounded-lg text-sm font-medium bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-200'
        >
          {/* small x icon */}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-3.5 w-3.5'
            viewBox='0 0 20 20'
            fill='currentColor'
            aria-hidden='true'
          >
            <path
              fillRule='evenodd'
              d='M10 8.586L15.293 3.293a1 1 0 111.414 1.414L11.414 10l5.293 5.293a1 1 0 01-1.414 1.414L10 11.414l-5.293 5.293a1 1 0 01-1.414-1.414L8.586 10 3.293 4.707A1 1 0 014.707 3.293L10 8.586z'
              clipRule='evenodd'
            />
          </svg>

          <span className='leading-none'>Remove</span>
        </button>
      </div>
    </section>
  );
};

function SettingsPage() {
  return (
    <main>
      <section className='border-b-[1px] pb-1 border-gray-200 flex justify-between'>
        <PageRoutesIndicator
          pageRoutes='Admin / Settings'
          pageTitle='Settings'
        />
      </section>
      <section className='mt-3 w-full sm:w-[500px] mb-[200px]'>
        <section className='settings-group'>
          <h3 className='settings-header text-base font-bold'>
            Profile Settings
          </h3>
          <div className='mt-3'>
            <ProfileSettingsForm />
          </div>
        </section>
        <section className='settings-group mt-6 sm:mt-8'>
          <h3 className='settings-header text-base font-bold'>Security</h3>
          <div className='mt-3'>
            {' '}
            <PasswordSettingsForm />
          </div>
        </section>
        <section className='settings-group mt-6 sm:mt-8'>
          <h3 className='settings-header text-base font-bold'>
            Store Settings
          </h3>
          <div className='mt-3'>
            <StoreSettingsForm />
          </div>
        </section>
        <section className='settings-group mt-6 sm:mt-8'>
          <h3 className='settings-header text-base font-bold'>
            On-chain Administrator Settings
          </h3>
          <AdminAddressItem
            address='0xdfhdj97734837437hfdhfd8474djdgf347'
            onRemove={(addr) => console.log('remove', addr)}
          />
          <AdminAddressItem
            address='0xdfhdj97734837437hfdhfd8474djdgf347'
            onRemove={(addr) => console.log('remove', addr)}
          />
          <AdminAddressItem
            address='0xdfhdj97734837437hfdhfd8474djdgf347'
            onRemove={(addr) => console.log('remove', addr)}
          />
          <div className='mt-6'>
            <OnchainAdministratorSettingsForm />
          </div>
        </section>
      </section>
    </main>
  );
}

export default SettingsPage;
