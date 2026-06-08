"use client";

import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { LoginFormFields, loginSchema } from "@/lib/schemas/auth.schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

const baselineInputClassName =
  "text-text-heading placeholder:text-text-subtle focus-visible:border-primary h-auto rounded-none border-0 border-b border-border bg-transparent px-0 py-2 shadow-none focus-visible:ring-0 aria-invalid:border-destructive";

const labelClassName =
  "text-text-muted mb-0.5 block text-xs font-semibold tracking-widest uppercase";

type ErrorMessageType = {
  title: string;
  description: string;
};

export default function LoginWrapper() {
  // States
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<ErrorMessageType | null>(null);

  const form = useForm<LoginFormFields>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormFields) => {
    const login = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (login?.error) {
      setErrorMessage({
        title: "Login failed",
        description: login.error,
      });
      return;
    }

    setErrorMessage(null);
    toast.success("Successfully logged in");
    const callbackUrl = new URLSearchParams(location.search).get("callbackUrl") || "/products";
    location.href = callbackUrl;
  };

  return (
    <div className="flex flex-1 items-center justify-center overflow-y-auto px-4 py-8 sm:px-6 sm:py-12">
      <div className="bg-card border-border w-full max-w-[500px] border p-6 shadow-sm sm:p-8 md:p-12 lg:p-16">
        {errorMessage && (
          <div className="bg-destructive/10 text-destructive mb-4 p-4">
            <span className="flex items-center gap-2 text-sm font-medium">
              <AlertTriangle size={16} />
              {errorMessage.title}
            </span>
            <span className="text-sm font-normal">{errorMessage.description}</span>
          </div>
        )}

        <div className="mb-8 text-center">
          <h1 className="text-text-heading mb-2 text-3xl font-medium tracking-tight">
            Welcome Back
          </h1>
          <p className="text-text-muted text-sm">Enter your credentials to access your account.</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="pb-3">
                  <FormLabel className={labelClassName}>EMAIL</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="enter your email"
                      inputSize="md"
                      className={baselineInputClassName}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="pb-3">
                  <div className="mb-2 flex items-end justify-between">
                    <FormLabel className={`${labelClassName} mb-0`}>PASSWORD</FormLabel>
                  </div>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        inputSize="md"
                        className={`${baselineInputClassName} pr-8`}
                        {...field}
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-muted-foreground hover:text-muted-foreground absolute right-0 bottom-2 transition-colors"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              loading={form.formState.isSubmitting}
              disabled={form.formState.isSubmitting}
              className="bg-primary text-primary-foreground hover:bg-brand-hover mt-2 h-auto w-full rounded-none py-3 text-xs font-semibold tracking-widest uppercase hover:opacity-90 active:scale-[0.98]"
            >
              LOGIN
            </Button>
          </form>
        </Form>

        <div className="mt-8 text-center">
          <p className="text-text-muted text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-primary ml-1 font-bold underline decoration-1 underline-offset-4 transition-all hover:opacity-70"
            >
              Create an Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
