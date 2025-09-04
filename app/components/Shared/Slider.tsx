"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Slider({ items }: { items: string[] }) {
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      slides: { perView: 1 },
    },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>;
        let mouseOver = false;

        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 3000); // 3s interval
        }

        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ],
  );

  return (
    <div className="relative w-full max-w-xl mx-auto">
      {/* Slider */}
      <div ref={sliderRef} className="keen-slider rounded-2xl overflow-hidden">
        {items?.map((item) => (
          <div
            key={item}
            className="keen-slider__slide flex items-center justify-center bg-blue-500 text-white text-2xl"
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_URL}${item}`}
              alt={item}
              width={400}
              height={400}
            />
          </div>
        ))}
      </div>

      {/* Controls */}
      <button
        onClick={() => instanceRef.current?.prev()}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-1 rounded-full"
      >
        <ChevronLeft />
      </button>
      <button
        onClick={() => instanceRef.current?.next()}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-1 rounded-full"
      >
        <ChevronRight />
      </button>
    </div>
  );
}
