"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";

export default function Slider({ items }: { items: string[] }) {
  return (
    <div className="relative max-w-xl mx-auto">
      <Swiper
        modules={[Navigation, Autoplay]}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        navigation={true}
        slidesPerView={1}
        className="rounded-2xl w-3/4 overflow-hidden"
      >
        {items?.map((item) => (
          <SwiperSlide key={item}>
            <div className="flex items-center justify-center bg-blue-500 text-white text-2xl h-64">
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_URL}${item}`}
                alt={item}
                width={400}
                height={400}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
