/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    name: string;
    email: string;
    role?: string;
    token: string;
  }

  interface Session {
    user: Omit<User, "token">;
    expires: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends Omit<User, "token"> {
    token: string;
    exp?: number;
  }
}
