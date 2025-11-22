"use client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import { Entity } from "@/app/lib/schemas";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import EntityCard from "./EntityCard";
import ArticleCard from "../Articles/ArticleCard";

const EntityCarousel = ({
  entities,
  className = "",
}: {
  entities: Entity[];
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
        {entities?.map((entity: Entity) => (
          <SwiperSlide key={entity?.id} className="p-2">
            {entity?.type === "article" ? (
              <ArticleCard article={entity} />
            ) : (
              <EntityCard type="row" entity={entity} />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export { EntityCarousel };
