import { getCategories, getProducts } from "@/lib/apis/products.api";
import ProductsWrapper from "./products-wrapper";
import { ProductsError } from "./products-error";
import { SearchParams } from "nuqs";

export default async function ProductsDataFetcher({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { category, title, page } = searchParams;

  const [productsResponse, categoriesResponse] = await Promise.all([
    getProducts({
      category: category as string | undefined,
      keyword: title as string | undefined,
      page: page ? Number(page) : undefined,
    }),
    getCategories(),
  ]);

  if (productsResponse.status !== "success" || !productsResponse.data) {
    return <ProductsError message={productsResponse.message} />;
  }

  const products = productsResponse.data.products ?? [];
  const categories = categoriesResponse.status === "success" ? (categoriesResponse.data ?? []) : [];

  return (
    <ProductsWrapper
      products={products}
      categories={categories}
      pagination={productsResponse?.data?.pagination ?? undefined}
    />
  );
}
