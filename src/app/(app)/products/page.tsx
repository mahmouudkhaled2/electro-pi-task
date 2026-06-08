import type { Metadata } from "next";
import type { SearchParams } from "nuqs/server";
import ProductsDataFetcher from "./_components/products-data-fetcher";

export const metadata: Metadata = {
  title: "Products | Electro Store",
  description: "Browse our electronics products",
};

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function ProductsPage({ searchParams }: PageProps) {
  return <ProductsDataFetcher searchParams={await searchParams} />;
}
