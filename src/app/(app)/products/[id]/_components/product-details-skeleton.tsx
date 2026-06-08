import { Skeleton } from "@/components/ui/skeleton";

const SIZES = ["XS", "S", "M", "L", "XL"] as const;

export function ProductDetailsSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-14">
      <div className="mb-6">
        <Skeleton className="h-4 w-28 rounded-none" />
      </div>

      <div className="flex flex-col gap-10 md:flex-row">
        {/* Gallery */}
        <div className="min-w-0 flex-1">
          <div className="flex w-full flex-col-reverse gap-4 md:max-w-sm lg:max-w-lg lg:flex-row">
            <div className="flex w-full justify-start gap-2 overflow-x-hidden py-2 lg:flex-col lg:gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-[100px] flex-1 rounded-none lg:w-full lg:flex-none" />
              ))}
            </div>

            <div className="mb-4 flex-1 overflow-hidden bg-white">
              <Skeleton className="aspect-square w-full rounded-none" />
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="flex-1 md:max-w-[460px]">
          <div className="flex flex-col lg:pl-2">
            <div className="mb-2">
              <Skeleton className="h-2.5 w-24 rounded-none" />
            </div>

            <Skeleton className="h-10 w-full max-w-sm rounded-none sm:h-12 lg:h-14" />

            <Skeleton className="mt-3 h-8 w-20 rounded-none" />

            <div className="mt-8">
              <Skeleton className="mb-3 h-2.5 w-16 rounded-none" />
              <div className="flex flex-wrap gap-2">
                {SIZES.map((size) => (
                  <Skeleton key={size} className="h-10 min-w-[46px] rounded-none border border-zinc-200 bg-white" />
                ))}
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <Skeleton className="h-12 w-full rounded-none bg-black" />
              <Skeleton className="h-12 w-full rounded-none border border-zinc-300 bg-white" />
            </div>

            <div className="mt-10">
              <div className="flex gap-7">
                <Skeleton className="h-4 w-24 rounded-none" />
                <Skeleton className="h-4 w-20 rounded-none" />
                <Skeleton className="h-4 w-20 rounded-none" />
              </div>
              <div className="border-border mt-0 border-t pt-6">
                <div className="space-y-2.5">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-3.5 w-full rounded-none" />
                  ))}
                  <Skeleton className="h-3.5 w-3/4 rounded-none" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
