import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none cursor-pointer [&_svg]:shrink-0 hover:transition-all hover:duration-300 h-12",
  {
    variants: {
      variant: {
        default: "bg-brand text-brand-fg hover:bg-brand-hover",
        accent: "bg-accent-brand text-accent-brand-fg hover:bg-accent-brand-hover",
        outline:
          "border border-brand bg-background text-brand hover:bg-zinc-50 hover:text-brand-hover",
        ghost: "border-none bg-transparent text-brand hover:bg-zinc-100 hover:text-brand-hover",
        secondary: "bg-zinc-100 text-zinc-700 hover:bg-zinc-200",
      },

      size: {
        xs: "px-2.5 py-1.5 text-xs",
        default: "px-4 py-2.5 h-12 text-sm",
        sm: "px-3 py-2 h-10 text-sm",
        md: "px-5 py-4 h-12 text-base",
        lg: "px-8 py-4 h-14 text-base",
        xl: "px-10 py-5 h-16 text-base",
        icon: "h-10 w-10",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  routable?: boolean;
  children?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, loading = false, children = "Button", asChild = false, ...props },
    ref,
  ) => {
    void loading;
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
        {loading ? <Loader2 size={18} className="animate-spin" /> : children}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
