import type { PaginationMeta } from "@/lib/types/api";
import type { Product, ProductCategory } from "@/lib/types/products.";
import { CategoryFilterDesktop, CategoryFilterMobile } from "./category-filter";
import { ProductCard } from "./product-card";
import { ProductsSearch } from "./products-search";
import { PaginationWrapper } from "@/components/common/pagination-wrapper";

interface ProductsWrapperProps {
  products: Product[];
  categories: ProductCategory[];
  pagination?: PaginationMeta;
}

export default function ProductsWrapper({
  products,
  categories,
  pagination,
}: ProductsWrapperProps) {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
      <div className="border-border mb-10 flex flex-col justify-between gap-6 border-b">
        <div>
          <h1 className="text-text-heading text-4xl font-medium tracking-tight lg:text-5xl">
            All Collections
          </h1>

          <p className="text-text-body mt-3 max-w-sm text-sm leading-relaxed">
            Cutting-edge technology and precision engineering. Each product is a statement of
            innovation and performance.
          </p>
        </div>

        <ProductsSearch />
      </div>

      <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
        <CategoryFilterDesktop categories={categories} />

        <div className="lg:hidden w-10 h-10 flex items-center justify-center border border-border-brand-primary">
          <CategoryFilterMobile categories={categories} />
        </div>

        {/* Products Grid */}
        <div className="min-w-0 flex-1">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center">
              <p className="text-text-muted text-sm">No products found.</p>
            </div>
          )}

          <PaginationWrapper currentPage={pagination?.currentPage} totalPages={pagination?.numberOfPages} />
        </div>
      </div>
    </div>
  );
}
