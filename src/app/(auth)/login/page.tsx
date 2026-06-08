import type { Metadata } from "next";
import LoginWrapper from "./_components/login-wrapper";

export const metadata: Metadata = {
  title: "Login | Electro Store",
  description: "Sign in to your Electro Store account",
};

export default function LoginPage() {
  return <LoginWrapper />;
}
