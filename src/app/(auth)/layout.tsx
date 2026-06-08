import React from "react";
import Footer from "@/components/layout/footer";
import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background flex min-h-dvh flex-col">
      <header className="border-brand-primary/20 shrink-0 border-b">
        <div className="mx-auto grid h-14 w-full max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-4 sm:h-16 sm:px-6 lg:px-10">
          <Link
            href="/"
            className="text-brand hover:text-brand-hover flex items-center gap-1.5 justify-self-start transition-colors sm:gap-2"
            aria-label="Back to home"
          >
            <ArrowLeft className="size-5 shrink-0 sm:size-6" />
            <Home className="size-5 shrink-0 sm:size-6" />
          </Link>

          <Link
            href="/"
            className="text-brand justify-self-center text-center text-xl font-medium tracking-wide whitespace-nowrap sm:text-2xl lg:text-3xl"
          >
            Electro Store
          </Link>

          <div className="justify-self-end" aria-hidden="true" />
        </div>
      </header>

      <main className="flex flex-1 flex-col">{children}</main>

      <Footer />
    </div>
  );
}
