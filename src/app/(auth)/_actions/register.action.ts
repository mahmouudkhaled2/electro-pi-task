"use server";

import { RegisterFormFields } from "@/lib/schemas/auth.schema";
import { AuthApiResponse, AuthSuccessResponse } from "@/lib/types/auth";

export async function register(credentials: RegisterFormFields) {
  try {
    const response = await fetch(`${process.env.API}/api/v1/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        phone: credentials.phone,
        password: credentials.password,
        rePassword: credentials.passwordConfirm,
      }),
    });

    const payload: AuthApiResponse = await response.json();

    if (!response.ok || payload.message !== "success") {
      return {
        status: "fail" as const,
        message: payload.message || "Registration failed",
      };
    }

    const { user, token } = payload as AuthSuccessResponse;

    return {
      status: "success" as const,
      message: "Registration successful",
      user,
      token,
    };
  } catch (error) {
    console.error(error);
    return { status: "error" as const, message: "Failed to register" };
  }
}
