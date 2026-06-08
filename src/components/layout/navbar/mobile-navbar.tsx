"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, LogIn, LogOut, Menu, ShoppingBag, User, UserPlus, X } from "lucide-react";
import { signOut } from "next-auth/react";

type NavLink = {
  id: number;
  href: string;
  label: string;
};

type MobileNavbarProps = {
  logo: string;
  navLinks: NavLink[];
  cartCount: number;
  isAuthenticated: boolean;
};

type MobileActionLinkProps = {
  href: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
  onNavigate: () => void;
};

function MobileActionLink({ href, label, icon, badge, onNavigate }: MobileActionLinkProps) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className="group border-brand-primary/20 hover:bg-bg-brand-primary-hover flex items-center gap-4 px-1 py-1 transition-colors duration-300 last:border-b-0"
    >
      <span className="bg-bg-brand-primary/50 group-hover:bg-bg-brand-primary-hover flex size-10 items-center justify-center transition-colors duration-300">
        {icon}
      </span>
      <span className="text-heading flex-1 text-base">{label}</span>
      {badge !== undefined && badge > 0 && (
        <span className="text-brand-primary flex-center text-[13px] font-bold">
          {badge > 99 ? "99+" : badge}
        </span>
      )}
      <ChevronRight className="size-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rtl:rotate-180" />
    </Link>
  );
}

export function MobileNavbar({ logo, navLinks, cartCount, isAuthenticated }: MobileNavbarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const closeMenu = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="w-fit transition-opacity hover:bg-transparent hover:opacity-80"
          aria-label={"Open Menu"}
        >
          <Menu className="size-6" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="border-brand-primary/20 flex w-full flex-col gap-0 bg-white p-0 sm:max-w-sm"
      >
        <div className="border-brand-primary/20 flex items-center justify-between border-b px-6 py-5">
          <SheetTitle className="text-brand-primary text-xl font-medium tracking-widest uppercase">
            {logo}
          </SheetTitle>
          <SheetClose asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="hover:bg-bg-secondary size-9 rounded-sm"
              aria-label={"Close Menu"}
            >
              <X className="size-5" />
            </Button>
          </SheetClose>
        </div>

        <nav className="flex h-full flex-1 flex-col overflow-y-auto px-6 py-8">
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.id}>
                <Link
                  href={link.href}
                  onClick={closeMenu}
                  className={cn(
                    "block py-3 text-sm font-semibold tracking-[0.2em] uppercase transition-colors duration-300",
                    isActive(link.href)
                      ? "text-brand-primary border-brand-primary border-s-2 ps-4"
                      : "text-body hover:text-brand-primary ps-[calc(1rem+2px)]",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="border-border-primary/20 my-4 border-t" />

          <div>
            <MobileActionLink
              href="#"
              label={"Cart"}
              icon={<ShoppingBag className="size-6" />}
              badge={cartCount}
              onNavigate={closeMenu}
            />
            {isAuthenticated && (
              <>
                <MobileActionLink
                  href="#"
                  label={"Account"}
                  icon={<User className="size-6" />}
                  onNavigate={closeMenu}
                />
              </>
            )}
          </div>

          {isAuthenticated ? (
            <Button
              onClick={() => signOut({ callbackUrl: "/" })}
              variant="outline"
              className="mt-auto w-full gap-2 self-end rounded-none"
            >
              Logout
              <LogOut className="size-6" />
            </Button>
          ) : (
            <>
              <MobileActionLink
                href="/login"
                label={"Login"}
                icon={<LogIn className="size-6" />}
                onNavigate={closeMenu}
              />
              <MobileActionLink
                href="/register"
                label={"Register"}
                icon={<UserPlus className="size-6" />}
                onNavigate={closeMenu}
              />
            </>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
