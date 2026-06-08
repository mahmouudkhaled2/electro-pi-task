type Primitive = string | number | boolean;

type QueryValue =
  | Primitive
  | Primitive[]
  | null
  | undefined;

type QueryParams = Record<string, QueryValue>;

export function buildQueryParams(
  params: QueryParams,
  config?: { indexedArrays?: boolean }
): URLSearchParams {
  const searchParams = new URLSearchParams();
  const hasSearchKey = !!params.search_key;

  Object.entries(params).forEach(([key, value]) => {
    // skip empty
    if (value === undefined || value === null || value === "") {
      return;
    }

    // skip pagination params if search_key is present
    if (hasSearchKey && (key === "page" || key === "per_page" || key === "limit")) {
      return;
    }

    // array
    if (Array.isArray(value)) {
      value.forEach((v, index) => {
        if (v !== undefined && v !== null && v !== "") {
          const finalKey = config?.indexedArrays ? `${key}[${index}]` : key;
          searchParams.append(finalKey, String(v));
        }
      });
      return;
    }

    // primitive
    searchParams.append(key, String(value));
  });

  return searchParams;
}
