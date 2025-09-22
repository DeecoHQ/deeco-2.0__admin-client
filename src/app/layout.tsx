import "@/app/styles/globals.css";
import type { Metadata } from "next";
import { Providers } from "@/app/rtk-base/providers";
import {nunitoSans, poppins} from "@/app/utils/font";
import EntityFormModal from "@/app/(routes)/(dashboard)/components/EntityFormModal";

export const metadata: Metadata = {
  title: 'Deeco: The Best Way To Sell Online',
  description: 'Deeco Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${nunitoSans.className} ${poppins.className}`}>
      <body>
        <Providers>
          {children}
          <EntityFormModal />
         </Providers>
      </body>
    </html>
  );
}
