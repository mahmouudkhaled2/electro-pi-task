import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required").min(8, "At least 8 characters"),
});

export type LoginFormFields = z.infer<typeof loginSchema>;
export type LoginFormType = UseFormReturn<LoginFormFields>;

export const registerSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().min(1, "Email is required").email("Invalid email address"),
    password: z.string().min(1, "Password is required").min(8, "At least 8 characters"),
    passwordConfirm: z.string().min(1, "Please confirm your password"),
    phone: z.string().min(1, "Phone is required"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  });

export type RegisterFormFields = z.infer<typeof registerSchema>;
export type RegisterFormType = UseFormReturn<RegisterFormFields>;
