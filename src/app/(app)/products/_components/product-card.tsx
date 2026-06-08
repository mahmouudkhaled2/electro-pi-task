import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types/products.";

interface ProductCardProps {
  product: Product;
}

// Normalize the image url to ensure it is a valid image url
function normalizeImageUrl(url: string): string {
  if (url.includes("placehold.co") && !/\.(png|jpe?g|webp|gif|svg)$/i.test(url)) {
    return `${url.replace(/\/$/, "")}/png`;
  }

  return url;
}

export function ProductCard({ product }: ProductCardProps) {
  const imageUrl = normalizeImageUrl(product?.images[0] ?? "");

  return (
    <Link href={`/products/${product.id}`} className="group block">
      <div className="relative aspect-square w-full overflow-hidden bg-zinc-100">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.title}
            fill
            loading="lazy"
            sizes="(max-width: 768px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-zinc-200" />
        )}
      </div>

      <div className="mt-3 space-y-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-text-heading line-clamp-1 text-[11px] font-semibold tracking-widest uppercase">
            {product.title}
          </h3>
          <span className="text-text-heading shrink-0 text-[11px] font-semibold">
            ${product.price}
          </span>
        </div>
        <p className="text-text-muted text-[11px] capitalize">{product.title}</p>
      </div>
    </Link>
  );
}
