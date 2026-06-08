"use client";

import { Search } from "lucide-react";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import { useEffect, useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { useDebouncedCallback } from "use-debounce";
export function ProductsSearch() {
  const [isPending, startTransition] = useTransition();
  const [{ title }, setParams] = useQueryStates(
    { title: parseAsString.withDefault(""), page: parseAsInteger.withDefault(1) },
    {
      shallow: false,
      startTransition,
    },
  );

  const [localSearch, setLocalSearch] = useState(title);
  useEffect(() => {
    setLocalSearch(title);
  }, [title]);
  const debouncedSetSearch = useDebouncedCallback((query: string) => {
    setParams({
      title: query.trim() ? query : null,
      page: null,
    });
  }, 400);

  return (
    <div className={`relative w-full max-w-sm py-2 ${isPending ? "opacity-60" : ""}`}>
      <Search className="text-text-muted pointer-events-none absolute top-1/2 left-1 size-3.5 -translate-y-1/2" />
      <Input
        type="search"
        placeholder="Search..."
        inputSize="sm"
        className="w-full rounded-none border-0 bg-transparent pl-6 text-sm shadow-none focus-visible:ring-0"
        value={localSearch}
        onChange={(e) => {
          const query = e.target.value;
          setLocalSearch(query);
          debouncedSetSearch(query);
        }}
      />
    </div>
  );
}
