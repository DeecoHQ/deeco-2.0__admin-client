import "@/app/styles/globals.css";
import type { Metadata } from "next";
import { Providers } from "@/app/rtk-base/providers";
import { nunito_sans, poppins, lato } from "./utils/font";
import EntityFormModal from "@/app/(routes)/(dashboard)/components/EntityFormModal";
import GlobalModal from "@/app/global-components/GlobalModal";
import { WalletProvider } from "@/app/lib/wallet/walletProvider";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  metadataBase: new URL('https://usedeeco.xyz'),
  title: 'Deeco: The Best Way To Buy Sell Anything Online',
  description: 'The on-chain engine for global e-commerce.',

  openGraph: {
    title: 'Deeco: The Best Way To Sell Anything Online',
    description: 'The on-chain engine for global e-commerce.',
    url: 'https://usedeeco.xyz',
    siteName: 'Deeco',
    images: [
      {
        url: 'https://deeco-platform-files-bucket.s3.eu-north-1.amazonaws.com/Deeco-01x.jpg',
        width: 1200,
        height: 630,
        alt: 'Deeco Platform Preview',
      },
    ],
    type: 'website',
    locale: 'en_US',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Deeco: The Best Way To Sell Anything Online',
    description: 'The on-chain engine for global e-commerce.',
    images: [
      'https://deeco-platform-files-bucket.s3.eu-north-1.amazonaws.com/Deeco-01x.jpg',
    ],
    creator: '@zedlabsHQ', // replace with your actual handle or remove
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${nunito_sans} ${poppins} ${lato}`}>
      <body>
        <Providers>
          <WalletProvider>
            {children}
            <EntityFormModal />
            <GlobalModal />
            <Toaster position="top-right" />
          </WalletProvider>
        </Providers>
      </body>
    </html>
  );
}
