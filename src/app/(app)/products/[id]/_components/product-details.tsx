"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

interface ProductDetailsProps {
  title: string;
  price: number;
  description: string;
  categoryName?: string;
}

const SIZES = ["XS", "S", "M", "L", "XL"] as const;

type Size = (typeof SIZES)[number];

export function ProductDetails({ title, price, description, categoryName }: ProductDetailsProps) {
  const [selectedSize, setSelectedSize] = useState<Size>("M");
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = () => {
    toast.success(`${title} (${selectedSize}) added to cart`, {
      description: "You can view it in your cart.",
    });
  };

  const handleWishlist = () => {
    const next = !isWishlisted;
    setIsWishlisted(next);

    if (next) {
      toast.success("Added to wishlist");
    } else {
      toast("Removed from wishlist");
    }
  };

  // Placeholder content for other tabs (since API only provides one description)
  const materialsContent = `Crafted from premium ${categoryName ? categoryName.toLowerCase() : "materials"} with attention to every detail. Durable finishes and high-quality components ensure lasting performance and refined aesthetics.`;

  const shippingContent = `Free standard shipping on orders over $75. Express delivery available. All orders are carefully packaged and insured. Returns accepted within 30 days of delivery in original condition.`;

  return (
    <div className="flex flex-col lg:pl-2">
      {/* Limited badge */}
      <div className="mb-2">
        <span className="text-text-muted text-[10px] font-medium tracking-[3px] uppercase">
          Limited Edition
        </span>
      </div>

      {/* Title */}
      <h1 className="text-text-heading text-4xl leading-[1.05] font-semibold tracking-[-1.5px] sm:text-5xl md:text-4xl lg:text-5xl">
        {title}
      </h1>

      {/* Price */}
      <div className="text-text-heading mt-3 text-2xl font-medium tabular-nums">${price}</div>

      {/* Size Selector */}
      <div className="mt-8">
        <div className="text-text-muted mb-3 text-[10px] font-medium tracking-[2px] uppercase">
          Select Size
        </div>
        <div className="flex flex-wrap gap-2">
          {SIZES.map((size) => {
            const active = size === selectedSize;
            return (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`flex h-10 min-w-[46px] items-center justify-center rounded-none border px-3.5 text-sm font-medium transition-colors ${
                  active
                    ? "border-black bg-black text-white"
                    : "text-text-heading border-zinc-200 bg-white hover:border-zinc-300"
                }`}
                aria-pressed={active}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Action Buttons - matching the reference very closely */}
      <div className="mt-6 space-y-3">
        <Button
          onClick={handleAddToCart}
          className="h-12 w-full rounded-none bg-black text-sm font-medium tracking-[1.5px] text-white hover:bg-zinc-900 active:bg-black"
        >
          ADD TO ATELIER
        </Button>

        <Button
          variant="outline"
          onClick={handleWishlist}
          className="h-12 w-full rounded-none border border-border-brand-primary"
        >
          {isWishlisted ? "WISHLISTED" : "WISHLIST"}
        </Button>
      </div>

      {/* Tabs */}
      <div className="mt-10">
        <Tabs defaultValue="description">
          <TabsList variant="line" className="gap-7 bg-transparent p-0">
            <TabsTrigger
              value="description"
              className="text-text-muted data-[state=active]:text-text-heading px-0 pb-3 text-sm font-medium tracking-[0.5px]"
            >
              Description
            </TabsTrigger>
            <TabsTrigger
              value="materials"
              className="text-text-muted data-[state=active]:text-text-heading px-0 pb-3 text-sm font-medium tracking-[0.5px]"
            >
              Materials
            </TabsTrigger>
            <TabsTrigger
              value="shipping"
              className="text-text-muted data-[state=active]:text-text-heading px-0 pb-3 text-sm font-medium tracking-[0.5px]"
            >
              Shipping
            </TabsTrigger>
          </TabsList>

          <div className="border-border mt-0 border-t pt-6">
            <TabsContent
              value="description"
              className="text-text-body text-[13.5px] leading-[1.65]"
            >
              {description && description.length > 5
                ? description
                : "A masterwork of design and engineering. This piece combines timeless silhouette with modern details for an elevated everyday essential."}
            </TabsContent>

            <TabsContent value="materials" className="text-text-body text-[13.5px] leading-[1.65]">
              {materialsContent}
            </TabsContent>

            <TabsContent value="shipping" className="text-text-body text-[13.5px] leading-[1.65]">
              {shippingContent}
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
