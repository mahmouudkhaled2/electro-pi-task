import { withAuth } from "next-auth/middleware";
import type { NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const AUTH_PAGES = ["/login", "/register"];
const PUBLIC_PAGES = ["/", ...AUTH_PAGES];
const PROTECTED_PREFIXES = ["/products"];

function matchesPath(pathname: string, path: string): boolean {
  if (path === "/") return pathname === "/";
  return pathname === path || pathname.startsWith(`${path}/`);
}

function isAuthPage(pathname: string): boolean {
  return AUTH_PAGES.some((page) => matchesPath(pathname, page));
}

function isPublicPage(pathname: string): boolean {
  return PUBLIC_PAGES.some((page) => matchesPath(pathname, page));
}

function isProtectedPage(pathname: string): boolean {
  return PROTECTED_PREFIXES.some((prefix) => matchesPath(pathname, prefix));
}

export default withAuth(
  function proxy(req: NextRequestWithAuth) {
    const { pathname } = req.nextUrl;
    const isAuthenticated = !!req.nextauth.token;

    if (isAuthenticated && isAuthPage(pathname)) {
      const callbackUrl = req.nextUrl.searchParams.get("callbackUrl");
      const isSafeCallback =
        callbackUrl &&
        callbackUrl.startsWith("/") &&
        !AUTH_PAGES.some((page) => matchesPath(callbackUrl, page));

      const destination = isSafeCallback ? callbackUrl : "/";
      return NextResponse.redirect(new URL(destination, req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        if (isPublicPage(pathname)) {
          return true;
        }

        if (isProtectedPage(pathname)) {
          return !!token;
        }

        return true;
      },
    },
    pages: {
      signIn: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
  },
);

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
