"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Clientele() {
  const logos = [
    "/brand1.png",
    "/brand2.png",
    "/brand7.jpeg",
    "/brand6.jpeg",
    "/brand2.png",
    "/brand7.jpeg",
    "/brand1.png",
  ];

  return (
    <section className="w-full bg-[#f5f5f5] py-8 px-6 md:px-16 rounded-lg">
      <h1 className="text-center text-3xl md:mb-4 md:text-6xl">Our Partners</h1>

      <div className="relative flex-1 h-[170px] rounded-md  gap-2overflow-hidden">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation={{
            nextEl: ".hero-next",
            prevEl: ".hero-prev",
          }}
          spaceBetween={15}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop={true}
          className="h-full"
          breakpoints={{
    0: {
      slidesPerView: 1,
    },
    640: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 6, 
    },
    1024: {
      slidesPerView: 6, 
    },
  }}
        >
          {logos.map((logo, i) => (
            <SwiperSlide key={i}>
              <img
                src={logo}
                alt="banner"
                className="w-full h-full object-contain "
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* CUSTOM ARROWS */}
        <button className="hero-prev absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/70 rounded-full flex items-center justify-center z-10">
          <ChevronLeft />
        </button>

        <button className="hero-next absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/70 rounded-full flex items-center justify-center z-10">
          <ChevronRight />
        </button>
      </div>
    </section>
  );
}
