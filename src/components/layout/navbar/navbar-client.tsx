"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { MobileNavbar } from "./mobile-navbar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import ProfileDropdown from "./profile-dropdown";
import { ShoppingBag } from "lucide-react";

type NavLink = {
  id: number;
  href: string;
  label: string;
};

type NavbarClientProps = {
  logo: string;
  navLinks: NavLink[];
  cartCount: number;
  isAuthenticated: boolean;
};

export default function NavbarClient({ logo, navLinks, cartCount, isAuthenticated }: NavbarClientProps) {
  // Navigation
  const pathname = usePathname();

  // States
  const [scrolled, setScrolled] = useState(false);

  // Helpers
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  // Side Effects
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "bg-white/90 full-width sticky top-0 z-50 border-b backdrop-blur-sm transition-colors duration-300",
        scrolled ? "whisper-shadow border-border-primary/10" : "border-border-primary/30",
      )}
    >
      <nav className="mx-auto grid h-20 w-full max-w-7xl grid-cols-3 items-center px-6">
        {/* Logo */}
        <div className="col-span-2 lg:col-span-1">
          <Link href="/" className="text-brand-primary text-2xl font-medium uppercase">
            {logo}
          </Link>
        </div>

        {/* Navbar Links */}
        <div className="hidden items-center justify-center gap-5 lg:flex xl:gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className={cn(
                "hover:text-brand-primary text-xs font-semibold tracking-[0.15em] uppercase transition-colors duration-300",
                isActive(link.href)
                  ? "text-brand-primary border-border-brand-primary border-b"
                  : "text-text-secondary-700",
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Navbar Actions */}
        <div className="flex items-center justify-end gap-3 md:gap-4 lg:gap-6">
          {/* Cart */}
          <Link
            href="/#"
            className="relative hidden items-center transition-opacity hover:opacity-80 lg:flex"
            aria-label={"Cart"}
          >
            <ShoppingBag className="size-6" />
            {cartCount > 0 && (
              <span className="bg-bg-brand-primary text-text-brand-primary absolute -top-2 -right-4 flex h-4 w-4 items-center justify-center text-[11px] font-bold">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>

          {/* Account */}
          <div className="hidden items-center transition-opacity hover:opacity-80 lg:flex">
            <ProfileDropdown isAuthenticated={isAuthenticated} />
          </div>

          {/* Mobile Navigation Bar */}
          <div className="lg:hidden">
            <MobileNavbar logo={logo} navLinks={navLinks} cartCount={cartCount} isAuthenticated={isAuthenticated} />
          </div>
        </div>
      </nav>
    </header>
  );
}
