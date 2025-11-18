"use client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import { Article } from "@/app/lib/schemas";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ArticleCard from "../Articles/ArticleCard";

const ArticleCarousel = ({
  articles,
  className = "",
}: {
  articles: Article[];
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
        {articles?.map((article: Article) => (
          <SwiperSlide key={article?.id} className="p-2">
            <ArticleCard article={article} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export { ArticleCarousel };
