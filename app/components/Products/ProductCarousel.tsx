"use client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import { Product } from "@/app/lib/schemas";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "./ProductCard";

const ProductCarousel = ({
  products,
  className = "",
}: {
  products: Product[];
  className?: string;
}) => {
  return (
    <div className={`w-full ${className}`}>
      <Swiper
        modules={[Navigation, Autoplay]}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        navigation={true}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {
            // sm
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            // md
            slidesPerView: 2,
            spaceBetween: 24,
          },
          1024: {
            // lg
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1280: {
            // xl
            slidesPerView: 4,
            spaceBetween: 40,
          },
        }}
      >
        {products?.map((product: Product) => (
          <SwiperSlide key={product?.id} className="p-2">
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export { ProductCarousel };
