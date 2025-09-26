import Image from 'next/image';
import Logo from '@/app/assets/main-logo_vector-and-text.png';
import LoginForm from "./components/LoginForm";

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
          <LoginForm />
        </div>
      </main>
    </section>
  );
}
