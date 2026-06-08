import React from "react";
import { Poppins } from "next/font/google";
import Providers from "@/components/providers";
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Electro Store",
  description: "Electro Store",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth antialiased" suppressHydrationWarning>
      <body className={`${poppins.variable}`} suppressHydrationWarning>
        <Providers>
          {children}
          <Toaster duration={4000} />
        </Providers>
      </body>
    </html>
  );
}
