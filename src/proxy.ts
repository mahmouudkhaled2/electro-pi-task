import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

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

function redirectToLogin(req: NextRequest, callbackPath?: string) {
  const loginUrl = new URL("/login", req.url);

  if (callbackPath) {
    loginUrl.searchParams.set("callbackUrl", callbackPath);
  }

  return NextResponse.redirect(loginUrl);
}

export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = await getToken({ req });
  const isAuthenticated = !!token && !token.error;

  if (isAuthenticated && isAuthPage(pathname)) {
    const callbackUrl = req.nextUrl.searchParams.get("callbackUrl");
    const isSafeCallback =
      callbackUrl &&
      callbackUrl.startsWith("/") &&
      !AUTH_PAGES.some((page) => matchesPath(callbackUrl, page));

    const destination = isSafeCallback ? callbackUrl : "/";
    return NextResponse.redirect(new URL(destination, req.url));
  }

  if (isProtectedPage(pathname)) {
    if (!isAuthenticated) {
      return redirectToLogin(req, pathname);
    }

    return NextResponse.next();
  }

  if (isPublicPage(pathname)) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
