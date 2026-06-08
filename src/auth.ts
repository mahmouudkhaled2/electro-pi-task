import { NextAuthOptions, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { AuthApiResponse, AuthSuccessResponse } from "./lib/types/auth";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/",
    error: "/",
  },

  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const response = await fetch(`${process.env.API}/api/v1/auth/signin`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        const payload: AuthApiResponse = await response.json();

        if (!response.ok || payload.message !== "success") {
          throw new Error(payload.message || "Failed to login");
        }

        const { user, token } = payload as AuthSuccessResponse;

        // The API doesn't return _id — decode it from the JWT payload instead
        const jwtBody = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());

        return {
          id: jwtBody.id ?? user.email,
          name: user.name,
          email: user.email,
          role: user.role,
          token,
        };
      },
    }),
  ],

  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.token = user.token;
      }
      return token;
    },

    session: ({ session, token }) => {
      if (token) {
        session.user = {
          id: token.id,
          name: token.name,
          email: token.email,
          role: token.role,
        } as User;
      }
      return session;
    },
  },
};
