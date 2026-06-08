"use client";

import { cn } from "@/lib/utils";
import type { ProductCategory } from "@/lib/types/products.";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import { Dispatch, SetStateAction, startTransition, useState, useTransition } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Filter } from "lucide-react";

interface CategoryFilterProps {
  categories: ProductCategory[];
}

interface CategoriesULProps {
  categories: ProductCategory[];
  category: string | null;
  setParams: (params: { category: string | null; page: number | null }) => void;
  ULClassNames?: string;
  LIClassNames?: string;
  ButtonClassNames?: string;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

const CategoriesUL = ({
  categories,
  category,
  setParams,
  ULClassNames = "",
  LIClassNames = "",
  ButtonClassNames = "",
  setOpen,
}: CategoriesULProps) => {
  return (
    <ul className={cn("space-y-3", ULClassNames)}>
      <li className={cn(LIClassNames)}>
        <button
          type="button"
          onClick={() => {
            setParams({ category: null, page: null });
            setOpen?.(false);
          }}
          className={cn(
            "flex w-full items-center justify-between text-sm transition-colors",
            !category && "text-text-heading font-medium",
            ButtonClassNames,
          )}
        >
          <span>All</span>
        </button>
      </li>
      {categories.map((cat) => {
        const isActive = category === cat._id;

        return (
          <li key={cat._id}>
            <button
              type="button"
              onClick={() => {
                setParams({
                  category: cat._id,
                  page: null,
                });
                setOpen?.(false);
              }}
              className={cn(
                "flex w-full items-center justify-between text-sm transition-colors",
                isActive && "text-text-heading font-medium",
                ButtonClassNames,
              )}
            >
              {/* Show only 20 characters of the category name because this public API return long and not readable names */}
              <span>{cat?.name?.slice(0, 20)}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export function CategoryFilterDesktop({ categories }: CategoryFilterProps) {
  const [isPending, startTransition] = useTransition();
  const [{ category }, setParams] = useQueryStates(
    {
      category: parseAsString,
      page: parseAsInteger.withDefault(1),
    },
    {
      shallow: false,
      startTransition,
    },
  );

  return (
    <aside
      className={cn(
        "sticky top-6 hidden w-48 shrink-0 self-start lg:block",
        isPending && "opacity-60",
      )}
    >
      <div>
        <span className="text-text-muted mb-4 block text-[10px] font-semibold tracking-widest uppercase">
          Category
        </span>

        <CategoriesUL categories={categories} category={category} setParams={setParams} />
      </div>
    </aside>
  );
}

export function CategoryFilterMobile({ categories }: CategoryFilterProps) {
  const [open, setOpen] = useState(false);
  const [{ category }, setParams] = useQueryStates(
    {
      category: parseAsString,
      page: parseAsInteger.withDefault(1),
    },
    {
      shallow: false,
    },
  );
  return (
    <div className="lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <Filter className="size-4" />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Category</SheetTitle>
          </SheetHeader>

          <CategoriesUL
            categories={categories}
            category={category}
            setParams={setParams}
            setOpen={setOpen}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}
