import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-brand-primary/20 flex w-full flex-col items-center justify-center gap-1 border-t py-5 h-20">
      <p className="text-sm text-muted-foreground">
        © 2026 ELECTRO STORE. ALL RIGHTS RESERVED.
      </p>
      <div className="text-sm gap-4 flex">
        <Link
          className="text-muted-foreground hover:text-primary transition-colors"
          href="#"
        >
          Privacy Policy
        </Link>
        <Link
          className="text-sm text-muted-foreground hover:text-primary transition-colors"
          href="#"
        >
          Terms of Service
        </Link>
      </div>
    </footer>
  );
}
