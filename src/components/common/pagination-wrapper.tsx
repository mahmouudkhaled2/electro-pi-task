"use client";

import { parseAsInteger, useQueryState } from "nuqs";
import { useTransition } from "react";
import { PaginationComponent } from "../ui/pagination";

interface Props {
  currentPage: number;
  totalPages: number;
}

export function PaginationWrapper({ currentPage, totalPages }: Props) {
  const [isPending, startTransition] = useTransition();
  const [, setPage] = useQueryState(
    "page",
    parseAsInteger.withOptions({
      shallow: false,
      startTransition,
    }),
  );

  if (totalPages <= 1) return null;

  return (
    <div className={`mt-14 ${isPending ? "opacity-60" : ""}`}>
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => {
          setPage(page);
        }}
        maxVisiblePages={4}
      />
    </div>
  );
}
