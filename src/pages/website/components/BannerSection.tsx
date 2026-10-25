import React from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const BannerSection = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true }),
  );

  return (
    <div className="w-full flex items-center justify-center sm:pt-20 bg-white">
      <div className="sm:max-w-6xl">
        <Carousel
          plugins={[plugin.current]}
          opts={{ loop: true }}
          className="w-full"
        >
          <CarouselContent>
            <CarouselItem>
              <img
                src="/assets/images/ekazi-banner.jpeg"
                alt="ekazi banner"
                className="w-full sm:rounded-2xl object-contain"
              />
            </CarouselItem>

            <CarouselItem>
              <img
                src="/assets/images/exact-banner.jpeg"
                alt="exact banner"
                className="w-full sm:rounded-2xl object-contain"
              />
            </CarouselItem>
          </CarouselContent>

          {/* Navigation Buttons */}
        </Carousel>
      </div>
    </div>
  );
};

export default BannerSection;
