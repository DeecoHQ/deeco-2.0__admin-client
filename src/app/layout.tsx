import "@/app/styles/globals.css";
import type { Metadata } from "next";
import { Providers } from "@/app/rtk-base/providers";
import { nunito_sans, poppins, lato } from "./utils/font";
import EntityFormModal from "@/app/(routes)/(dashboard)/components/EntityFormModal";
import GlobalModal from "@/app/global-components/GlobalModal";
import { WalletProvider } from "@/app/lib/wallet/walletProvider";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  metadataBase: new URL("https://deeco-platform-files-bucket.s3.eu-north-1.amazonaws.com"), 
  title: "Deeco: The Best Way To Buy And Sell Anything Online",
  description: "Deeco Platform",

  openGraph: {
    title: "Deeco: The Best Way To Buy And Sell Anything Online",
    description: "Deeco Platform",
    url: "https://deeco-platform-files-bucket.s3.eu-north-1.amazonaws.com",
    siteName: "Deeco",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "Deeco Platform Preview",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Deeco: The Best Way To Buy And Sell Anything Online",
    description: "Deeco Platform",
    images: ["/opengraph-image.jpg"], 
    creator: "@YourTwitterHandle",
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
