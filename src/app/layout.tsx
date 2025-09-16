import "@/app/styles/globals.css";
import type { Metadata } from "next";
import { Providers } from "@/app/rtk-base/providers";
import { nunito_sans, poppins } from "./utils/font";

export const metadata: Metadata = {
  title: "My Next.js App",
  description: "Deeco Platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${nunito_sans} ${poppins}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
