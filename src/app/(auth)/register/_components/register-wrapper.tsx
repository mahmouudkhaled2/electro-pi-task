"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, Eye, EyeOff } from "lucide-react";
import { RegisterFormFields, registerSchema } from "@/lib/schemas/auth.schema";
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
import { register } from "../../_actions/register.action";
import { toast } from "sonner";

const baselineInputClassName =
  "text-text-heading placeholder:text-text-subtle focus-visible:border-primary h-11 rounded-none border-0 border-b border-border bg-transparent px-0 py-1 shadow-none focus-visible:ring-0 aria-invalid:border-destructive";

const labelClassName =
  "text-text-muted mb-0.5 block text-xs font-semibold tracking-widest uppercase";

function PasswordField({
  name,
  label,
  showPassword,
  onToggle,
  control,
}: {
  name: "password" | "passwordConfirm";
  label: string;
  showPassword: boolean;
  onToggle: () => void;
  control: ReturnType<typeof useForm<RegisterFormFields>>["control"];
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="pb-3">
          <FormLabel className={labelClassName}>{label}</FormLabel>
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
              onClick={onToggle}
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
  );
}

export default function RegisterWrapper() {
  // States
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<{ title: string; description: string } | null>(
    null,
  );

  // Navigation
  const router = useRouter();

  // Form & Validation
  const form = useForm<RegisterFormFields>({
    resolver: zodResolver(registerSchema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      phone: "",
    },
  });

  const onSubmit = async (data: RegisterFormFields) => {
    setErrorMessage(null);

    const result = await register(data);

    if (result.status !== "success") {
      setErrorMessage({ title: "Registration Failed", description: result.message });
      return;
    }

    setErrorMessage(null);
    toast.success("Registration successful");
    router.push("/login");
  };

  return (
    <div className="flex flex-1 items-center justify-center overflow-y-auto px-4 py-8 sm:px-6 sm:py-12">
      <div className="bg-card border-border my-auto w-full max-w-[500px] border p-6 shadow-sm sm:p-8 md:p-12">
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
            Create Account
          </h1>
          <p className="text-text-muted text-sm">Fill in your details to join Electro Store.</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="pb-3">
                  <FormLabel className={labelClassName}>FULL NAME</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="e.g. Mahmouud Khaled"
                      inputSize="md"
                      className={baselineInputClassName}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="pb-3">
                  <FormLabel className={labelClassName}>EMAIL ADDRESS</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      inputSize="md"
                      className={baselineInputClassName}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone Field */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="pb-3">
                  <FormLabel className={labelClassName}>PHONE</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="+201019215879"
                      inputSize="md"
                      className={baselineInputClassName}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <PasswordField
              name="password"
              label="PASSWORD"
              showPassword={showPassword}
              onToggle={() => setShowPassword(!showPassword)}
              control={form.control}
            />

            {/* Confirm Password Field */}
            <PasswordField
              name="passwordConfirm"
              label="CONFIRM PASSWORD"
              showPassword={showRePassword}
              onToggle={() => setShowRePassword(!showRePassword)}
              control={form.control}
            />

            <Button
              type="submit"
              loading={form.formState.isSubmitting}
              disabled={form.formState.isSubmitting}
              className="bg-primary text-primary-foreground hover:bg-brand-hover mt-4 h-auto w-full rounded-none py-3 text-xs font-semibold tracking-widest uppercase hover:opacity-90 active:scale-[0.98]"
            >
              REGISTER
            </Button>
          </form>
        </Form>

        <div className="mt-8 text-center">
          <p className="text-text-muted text-sm">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary ml-1 font-bold underline decoration-1 underline-offset-4 transition-all hover:opacity-70"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
