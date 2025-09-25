"use client";

import Link from "next/link";
import Image from 'next/image';
import Logo from '@/app/assets/main-logo_vector-and-text.png';

export default function LoginPage() {
  return (
    <section className='relative h-screen w-full bg-cover bg-center bg-no-repeat log-in-screen-background-image flex justify-center items-center'>
      {/* Gradient Overlay */}
      <div className='absolute inset-0 bg-gradient-to-b from-black/60 to-black/90'></div>

      {/* Content */}
      <main className='page-content relative pt-24 pb-16 sm:pt-12 sm:mb-32 min-h-screen sm:min-h-[100px] px-3 rounded-[10px] border w-full sm:w-[400px] sm:mx-auto bg-white'>
        <div className='flex flex-col sm:px-3 gap-8'>
          <section>
            <Image
              src={Logo}
              alt='Deeco Logo'
              width={120}
              height={50}
              className='mx-auto'
            />
            <div className='poppins mt-6 text-center'>
              Log into your account
            </div>
          </section>
          <form>
            <div className='input-group flex flex-col mb-6 text-[14px] sm:text-[14px]'>
              <label htmlFor='email'>Email</label>
              <input
                className='mt-2 px-3 py-3 border-gray-300 border outline-none rounded-[10px]'
                type='email'
                required
                placeholder='please input your username'
                id='email'
              />
            </div>

            <div className='input-group flex flex-col mb-6 text-[14px] sm:text-[14px]'>
              <label htmlFor='password'>Password</label>
              <input
                className='mt-2 px-3 py-3 border-gray-300 border outline-none rounded-[10px]'
                type='password'
                required
                placeholder='please input your password'
                id='password'
              />
            </div>

            <button
              type='submit'
              className='submit poppins text-center bg-[#043D25] py-3 text-[14px] sm:text-[14px] text-white rounded-[10px] w-full'
            >
              Submit
            </button>

            <p className='text-center text-[14px] sm:text-[14px] mt-4'>
              New to Deeco?{' '}
              <Link href='/sign-up' className='underline text-purple-800'>
                sign-up instead
              </Link>
            </p>
          </form>
        </div>
      </main>
    </section>
  );
}
