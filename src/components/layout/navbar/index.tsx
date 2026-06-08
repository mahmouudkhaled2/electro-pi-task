
import { authOptions } from "@/auth";
import NavbarClient from "@/components/layout/navbar/navbar-client";
import { getServerSession } from "next-auth";

export default async function Navbar() {
  // Session
  const session = await getServerSession(authOptions);
  const isAuthenticated = !!session;

  const navLinks = [
    { id:1, href: "/products", label: "Products" },
    { id:2, href: "/#", label: "About"},
    { id:3, href: "/#", label: "Contact"},
  ];

  return <NavbarClient logo={"Electro Store"} navLinks={navLinks} cartCount={888} isAuthenticated={isAuthenticated} />;
}
