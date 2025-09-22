import Link from "next/link";
import Image from 'next/image';
import Logo from '@/app/assets/main-logo_vector-and-text.png';

export default function SignUpPage() {
  return (
    <section className='relative h-screen w-full bg-cover bg-center bg-no-repeat sign-up-screen-background-image flex justify-center items-center'>
      {/* Gradient Overlay */}
      <div className='absolute inset-0 bg-gradient-to-b from-black/60 to-black/90'></div>

      {/* Content */}
      <main className='page-content w-full relative pt-12 pb-16 mb-20 sm:mb-32 mx-3 px-3 rounded-[10px] border sm:w-[400px] sm:mx-auto bg-white'>
        <div className='flex flex-col sm:px-3 gap-8'>
          <section>
            <Image
              src={Logo}
              alt='Deeco Logo'
              width={120}
              height={50}
              className='mx-auto'
            />
            <div className='poppins mt-6 text-center'>Create a new account</div>
          </section>
          <form>
            <div className='full-name input-group flex flex-col mb-6 text-[14px] sm:text-[14px]'>
              <label htmlFor='full-name'>Full name</label>
              <input
                className='mt-2 px-3 py-2 border outline-none rounded'
                type='text'
                required
                placeholder='please input your full name'
                id='fullName'
              />
            </div>
            <div className='email input-group flex flex-col mb-6 text-[14px] sm:text-[14px]'>
              <label htmlFor='email'>Email</label>
              <input
                className='mt-2 px-3 py-2 border outline-none rounded'
                type='email'
                required
                placeholder='please add your email address'
                id='email'
              />
            </div>
            <div className='password input-group flex flex-col mb-6 text-[14px] sm:text-[14px]'>
              <label htmlFor='password'>Password</label>
              <input
                className='mt-2 px-3 py-2 border outline-none rounded'
                type='password'
                required
                placeholder='please input your password'
                id='password'
              />
            </div>
            <div className='confirm-password input-group flex flex-col mb-6 text-[14px] sm:text-[14px]'>
              <label htmlFor='confirm-password'>Confirm password</label>
              <input
                className='mt-2 px-3 py-2 border outline-none rounded'
                type='password'
                required
                placeholder='re-enter password to confirm'
                id='confirm-password'
              />
            </div>
            <button
              type='button'
              className='submit poppins text-center bg-[#043D25] py-3 text-[14px] sm:text-[14px] text-white rounded w-full'
            >
              Submit
            </button>
            <p className='text-center text-[14px] sm:text-[14px] mt-4'>
              Have an account?{' '}
              <Link href='/log-in' className='underline text-purple-800'>
                log-in instead
              </Link>{' '}
            </p>
          </form>
        </div>
      </main>
    </section>
  );
}
