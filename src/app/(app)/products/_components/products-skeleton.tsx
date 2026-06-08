import { Skeleton } from "@/components/ui/skeleton";

function ProductCardSkeleton() {
  return (
    <div className="block">
      <Skeleton className="aspect-square w-full rounded-none" />
      <div className="mt-3 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <Skeleton className="h-3 w-3/4" />
          <Skeleton className="h-3 w-10 shrink-0" />
        </div>
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  );
}

export function ProductsSkeleton() {
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

        <Skeleton className="h-9 w-full max-w-sm rounded-none" />
      </div>

      <div className="flex gap-10 lg:gap-16">
        <aside className="sticky top-6 w-48 shrink-0 self-start">
          <span className="text-text-muted mb-4 block text-[10px] font-semibold tracking-widest uppercase">
            Category
          </span>
          <ul className="space-y-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <li key={index}>
                <Skeleton className="h-5 w-full" />
              </li>
            ))}
          </ul>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>

          <div className="mt-14 flex justify-center gap-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="size-9 rounded-md" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
