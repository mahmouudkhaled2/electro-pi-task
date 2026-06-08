export type GetProductsParams = {
  category?: string;
  keyword?: string;
  page?: number;
  limit?: number;
};

export type ProductCategory = {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
};

export type ProductBrand = {
  _id: string;
  name: string;
  slug: string;
  image: string;
};

export type ProductSubcategory = {
  _id: string;
  name: string;
  slug: string;
  category: string;
};

export type Product = {
  _id: string;
  id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  sold: number;
  imageCover: string;
  images: string[];
  ratingsAverage: number;
  ratingsQuantity: number;
  category: ProductCategory;
  subcategory: ProductSubcategory[];
  brand: ProductBrand;
  createdAt: string;
  updatedAt: string;
};

export type ProductsListResponse = {
  results: number;
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
    nextPage: number | null;
    prevPage: number | null;
  };
  data: Product[];
};

export type SingleProductResponse = {
  data: Product;
};

export type CategoriesListResponse = {
  results: number;
  data: ProductCategory[];
};
