"use client";

import { Button } from "@/components/ui/button";

interface ProductsErrorProps {
  message?: string;
}

export function ProductsError({ message = "Something went wrong" }: ProductsErrorProps) {
  return (
    <div className="flex h-[80vh] flex-col items-center justify-center gap-3 text-center">
      <h2 className="text-2xl font-bold text-text-heading">Error: {message}</h2>
      <p className="text-text-muted text-sm">Please try again later.</p>
      <Button variant="outline" onClick={() => window.location.reload()}>
        Try again
      </Button>
    </div>
  );
}
