"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import type { CarouselApi } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface ProductCarouselProps {
  images: string[];
}

export default function ProductImages({ images }: ProductCarouselProps) {
  // State
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (api) {
      const handleSelect = () => {
        setSelectedIndex(api.selectedScrollSnap());
      };

      api.on("select", handleSelect);

      return () => {
        api.off("select", handleSelect);
      };
    }
  }, [api]);

  if (images.length <= 1) return null;

  const handleThumbnailClick = (index: number) => {
    api?.scrollTo(index);
    setSelectedIndex(index);
  };

  return (
    <div className="w-full flex flex-col-reverse lg:flex-row md:max-w-sm lg:max-w-lg gap-4">
      {/* Thumbnails */}
      <div className="flex lg:flex-col lg:gap-3 w-full justify-start overflow-x-hidden py-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => handleThumbnailClick(index)}
            className={cn(
              "h-[100px] w-full overflow-hidden transition-all duration-200",
              selectedIndex === index
                ? ""
                : "opacity-60 hover:opacity-100",
            )}
            aria-label={`View ${index} thumbnail`}
          >
            <Image
              src={image}
              alt={`Thumbnail ${index + 1}`}
              width={100}
              height={100}
              loading="lazy"
              className="h-full w-full object-contain"
            />
          </button>
        ))}
      </div>

      {/* Main product view */}
      <div className="mb-4 overflow-hidden bg-white">
        <Carousel
          setApi={setApi}
          opts={{
            align: "center",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index} className="flex items-center justify-center">
                <div className="flex h-full w-full items-center justify-center p-2">
                  <Image
                    src={image}
                    alt={image || `Image ${index + 1}`}
                    width={500}
                    height={500}
                    className="h-full w-full object-contain"
                    priority={index === 0}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
