"use client";

import * as React from "react";
import { ArrowLeft, ArrowRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants, type Button } from "@/components/ui/button";

// Core Pagination Components
const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={cn("flex flex-row items-center gap-2", className)} {...props} />
  ),
);
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn("flex items-center justify-center", className)} {...props} />
  ),
);

PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
  disabled?: boolean;
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"a">;

const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  disabled,
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size,
      }),
      "border-brand-primary flex size-10 items-center justify-center rounded-none text-sm font-normal",
      isActive
        ? "bg-bg-brand-primary hover:bg-bg-brand-primary! text-zinc-700 hover:text-zinc-700"
        : "text-zinc-700",
      disabled ? "cursor-not-allowed bg-zinc-200 opacity-50" : "hover:bg-zinc-100",
      className,
    )}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({ className, disabled, ...props }: React.ComponentProps<typeof PaginationLink>) => {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      disabled={disabled}
      className={cn(
        "text-zinc-700 rounded-none border bg-transparent px-2 text-sm font-semibold lg:min-w-28",
        className,
      )}
      {...props}
    >
      <ArrowLeft className="size-4 text-zinc-700" />
      <span className="hidden lg:block">Previous</span>
    </PaginationLink>
  );
};

PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({ className, disabled, ...props }: React.ComponentProps<typeof PaginationLink>) => {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      disabled={disabled}
      className={cn(
        "text-zinc-700 rounded-none border bg-transparent px-2 text-sm font-semibold lg:min-w-28",
        className,
      )}
      {...props}
    >
      <span className="hidden lg:block">Next</span>
      <ArrowRight className="size-4 text-zinc-700" />
    </PaginationLink>
  );
};

PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span aria-hidden className={cn("flex size-8 items-center justify-center", className)} {...props}>
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

type PaginationComponentProps = {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  maxVisiblePages?: number;
};

export function PaginationComponent({
  currentPage: initialCurrentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 6,
}: PaginationComponentProps) {
  const [internalCurrentPage, setInternalCurrentPage] = React.useState(initialCurrentPage);

  const currentPage = onPageChange ? initialCurrentPage : internalCurrentPage;

  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  const getPageNumbers = () => {
    const pages = [];
    const halfMaxVisible = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(1, currentPage - halfMaxVisible);
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push("ellipsis");
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push("ellipsis");
      }
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();

  const handlePageChange = (page: number | string) => {
    if (onPageChange) {
      onPageChange(page as number);
    } else {
      setInternalCurrentPage(page as number);
    }
  };

  return (
    <Pagination className="w-full">
      <PaginationContent className="flex w-full justify-between">
        <PaginationItem>
          <PaginationPrevious
            href="#"
            disabled={!hasPrevious}
            onClick={(e) => {
              e.preventDefault();
              if (hasPrevious) handlePageChange(currentPage - 1);
            }}
          />
        </PaginationItem>

        <div className="flex items-center lg:gap-2">
          {pages.map((page, index) =>
            page === "ellipsis" ? (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis className="text-zinc-700"/>
              </PaginationItem>
            ) : (
              <PaginationItem key={page}>
                <PaginationLink
                 className={cn("text-zinc-700", currentPage === page && "text-zinc-900")}
                  href="#"
                  isActive={currentPage === page}
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(page as number);
                  }}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ),
          )}
        </div>
        <PaginationItem>
          <PaginationNext
            href="#"
            disabled={!hasNext}
            onClick={(e) => {
              e.preventDefault();
              if (hasNext) handlePageChange(currentPage + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
