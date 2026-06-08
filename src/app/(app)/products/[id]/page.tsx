import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById } from "@/lib/apis/products.api";
import ProductImages from "./_components/product-image-gallery";
import { ProductDetails } from "./_components/product-details";
import { Product } from "@/lib/types/products.";
import { ArrowLeft } from "lucide-react";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;

  const result = await getProductById(id);

  if (result.status !== "success" || !result.data) {
    return {
      title: "Product Not Found | Electro Store",
    };
  }  

  const product = result.data;

  return {
    title: `${id} | Electro Store`,
    description: `Shop ${id} at Electro Store.`,
  };
}

export default async function ProductDetailsPage({ params }: PageProps) {
  const { id } = await params;

  const result = await getProductById(id);

  const product = result.data as Product;

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-14">
      <div className="mb-6">
        <Link
          href="/products"
          className="group inline-flex items-center gap-1.5 text-xs font-medium tracking-[1px] text-text-muted uppercase hover:text-text-heading transition-colors"
        >
          <ArrowLeft className="size-4" /> All Products
        </Link>
      </div>

      <div className="flex flex-col gap-10 md:flex-row">
        <div className="flex-1 min-w-0">
          <ProductImages images={product?.images ?? []} />
        </div>

        <div className="flex-1 md:max-w-[460px]">
          <ProductDetails
            title={product?.title ?? ""}
            price={product?.price ?? 0}
            description={product?.description ?? ""}
            categoryName={product?.category?.name ?? ""}
          />
        </div>
      </div>
    </div>
  );
}
