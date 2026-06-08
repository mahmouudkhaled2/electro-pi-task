import type { Metadata } from "next";
import RegisterWrapper from "./_components/register-wrapper";

export const metadata: Metadata = {
  title: "Register | Electro Store",
  description: "Create your Electro Store account",
};

export default function RegisterPage() {
  return <RegisterWrapper />;
}
