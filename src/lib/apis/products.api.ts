"use server";

import type { ApiResponse, PaginationMeta } from "@/lib/types/api";
import type {
  CategoriesListResponse,
  GetProductsParams,
  Product,
  ProductCategory,
  ProductsListResponse,
  SingleProductResponse,
} from "@/lib/types/products.";
import { buildQueryParams } from "@/lib/utils/build-query-params";

const API = process.env.API ?? "https://ecommerce.routemisr.com";

type ProductsListData = {
  products: Product[];
  results: number;
  pagination: PaginationMeta;
};

// Apply client-side pagination to the products because the API doesn't support searching across all products so i handled it in the client side
function applyClientPagination(
  products: Product[],
  page: number,
  limit: number,
): { products: Product[]; pagination: PaginationMeta } {
  const numberOfPages = Math.max(1, Math.ceil(products.length / limit));
  const safePage = Math.min(Math.max(1, page), numberOfPages);
  const start = (safePage - 1) * limit;

  return {
    products: products.slice(start, start + limit),
    pagination: {
      currentPage: safePage,
      numberOfPages,
      limit,
      nextPage: safePage < numberOfPages ? safePage + 1 : null,
      prevPage: safePage > 1 ? safePage - 1 : null,
    },
  };
}

async function fetchAllProducts(category?: string): Promise<Product[]> {
  const query = buildQueryParams({ category, limit: 500 });
  const response = await fetch(`${API}/api/v1/products?${query}`, {
    next: { revalidate: 60 },
  });
  if (!response.ok) throw new Error(`${response.status}`);
  const payload: ProductsListResponse = await response.json();
  return payload.data;
}

export const getProducts = async (
  params?: GetProductsParams,
): Promise<ApiResponse<ProductsListData> | ApiResponse<null>> => {
  const page = params?.page ?? 1;
  const limit = params?.limit ?? 6;
  const keyword = params?.keyword?.trim().toLowerCase();

  try {
    if (keyword) {
      const all = await fetchAllProducts();
      const filtered = all.filter((p) => p.title.toLowerCase().includes(keyword));
      const { products, pagination } = applyClientPagination(filtered, page, limit);

      return {
        status: "success",
        statusCode: 200,
        message: "Products fetched successfully",
        data: { products, results: filtered.length, pagination },
      };
    }

    // build the query params for the API
    const query = buildQueryParams({
      category: params?.category,
      page,
      limit,
    });

    const response = await fetch(`${API}/api/v1/products?${query}`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      const errorPayload = await response.json().catch(() => ({}));
      return {
        status: "error",
        statusCode: response.status,
        message: errorPayload.message || "Failed to fetch products",
        data: null,
      };
    }

    const payload: ProductsListResponse = await response.json();

    return {
      status: "success",
      statusCode: 200,
      message: "Products fetched successfully",
      data: {
        products: payload.data,
        results: payload.results,
        pagination: payload.metadata,
      },
    };
  } catch (error) {
    return {
      status: "error",
      statusCode: 500,
      message: error instanceof Error ? error.message : String(error),
      data: null,
    };
  }
};

export const getProductById = async (
  id: string,
): Promise<ApiResponse<Product> | ApiResponse<null>> => {
  try {
    const response = await fetch(`${API}/api/v1/products/${id}`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      const errorPayload = await response.json().catch(() => ({}));
      return {
        status: "error",
        statusCode: response.status,
        message: errorPayload.message || "Failed to fetch product",
        data: null,
      };
    }

    const payload: SingleProductResponse = await response.json();

    return {
      status: "success",
      statusCode: 200,
      message: "Product fetched successfully",
      data: payload.data,
    };
  } catch (error) {
    return {
      status: "error",
      statusCode: 500,
      message: error instanceof Error ? error.message : "Failed to fetch product",
      data: null,
    };
  }
};

export const getCategories = async (): Promise<
  ApiResponse<ProductCategory[]> | ApiResponse<null>
> => {
  try {
    const response = await fetch(`${API}/api/v1/categories`, {
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      const errorPayload = await response.json().catch(() => ({}));
      return {
        status: "error",
        statusCode: response.status,
        message: errorPayload.message || "Failed to fetch categories",
        data: null,
      };
    }

    const payload: CategoriesListResponse = await response.json();

    return {
      status: "success",
      statusCode: 200,
      message: "Categories fetched successfully",
      data: payload.data ?? [],
    };
  } catch (error) {
    return {
      status: "error",
      statusCode: 500,
      message: error instanceof Error ? error.message : "Failed to fetch categories",
      data: null,
    };
  }
};
