import * as React from "react";

import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

export const inputVariants = cva(
  "text-brand-primary file:text-brand-primary placeholder:text-text-placeholder flex h-12 w-full min-w-0 rounded-xs border bg-transparent px-3 py-1 text-sm transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-sm disabled:text-text-disabled disabled:bg-bg-disabled disabled:border-border-disabled disabled:pointer-events-none aria-invalid:border-border-error disabled:cursor-not-allowed focus-visible:border-border-brand-primary shadow-none focus-visible:ring-0",
  {
    variants: {
      variant: {
        default: "border-border-primary bg-bg-brand-primary-foreground",
        error:
          "border-border-error bg-bg-brand-primary-foreground hover:border-border-error-hover text-brand-primary placeholder:text-text-placeholder focus:border-pink-900 disabled:bg-gray-200 disabled:border-none",
      },
      inputSize: {
        default: "h-12 px-4",
        md: "h-10 px-3",
        sm: "h-8 px-2",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
    },
  },
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {
  placeholder?: string;
  inputSize?: "default" | "md" | "sm";
  icon?: {
    src: string;
    alt: string;
    color?: string;
    size?: number;
    className?: string;
  } | null;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, variant, inputSize = "default", placeholder, icon = null, ...props },
    ref,
  ) => {
    return (
      <input
        ref={ref}
        placeholder={placeholder}
        type={type}
        data-slot="input"
        className={cn(inputVariants({ variant, inputSize }), className)}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";
