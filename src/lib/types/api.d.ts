
export type ApiResponse<T> = {
  status: "success" | "fail" | "error";
  statusCode: number;
  message: string;
  data: T;
};

export type PaginationMeta = {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage: number | null;
  prevPage: number | null;
};

export type PaginatedResponse<T> = PaginationMeta &  ApiResponse<T>;



