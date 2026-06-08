import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import Image from "next/image";

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  const isAuthenticated = !!session;

  return (
    <main className="mx-auto flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <section className="relative h-screen w-full">
        {/* Background Image */}
        <Image
          src="/hero-section-bg.png"
          alt="Hero Section Background"
          fill
          priority
          quality={100}
          className="object-cover object-[70%_15%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40" />

        {/* Hero Section Content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
          <h1 className="text-4xl font-bold text-zinc-50">Electro Store</h1>
          <p className="max-w-lg text-base font-normal text-zinc-200">
            Welcome to our electro store. Browse products after signing in.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {isAuthenticated ? (
              <Button asChild variant="accent" className="min-w-32">
                <Link href="/products">Browse Products</Link>
              </Button>
            ) : (
              <>
                <Button variant={"accent"} asChild className="min-w-28">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild variant="outline" className="min-w-32">
                  <Link href="/register">Register</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
