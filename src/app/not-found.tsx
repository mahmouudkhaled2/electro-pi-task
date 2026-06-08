import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="animate-fadeIn relative flex h-[80vh] flex-col items-center justify-center gap-5 overflow-hidden p-6 text-center md:gap-6 lg:gap-8">
      <h2 className="text-text-heading text-4xl font-bold md:text-5xl lg:text-6xl">
        Page not Found
      </h2>
      <p className="text-text-body max-w-lg text-lg leading-normal lg:text-xl">
        Sorry, the page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="text-md bg-brand text-brand-fg hover:bg-brand-hover w-60 rounded-md py-2 font-semibold md:w-72 md:text-lg lg:w-80 lg:py-3"
      >
        Return to Home Page
      </Link>
    </div>
  );
}
