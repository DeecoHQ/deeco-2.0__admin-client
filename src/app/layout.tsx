import '@/app/styles/globals.css';
import type { Metadata } from 'next';
import { Providers } from '@/app/rtk-base/providers';
import { nunito_sans, poppins, lato } from './utils/font';
import EntityFormModal from '@/app/(routes)/(dashboard)/components/EntityFormModal';

export const metadata: Metadata = {
  title: 'Deeco: The Best Way To Buy And Sell Anything Online',
  description: 'Deeco Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={`${nunito_sans} ${poppins} ${lato}`}>
      <body>
        <Providers>
          {children}
          <EntityFormModal />
        </Providers>
      </body>
    </html>
  );
}
