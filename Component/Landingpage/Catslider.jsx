"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation,Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

import "swiper/css";
import "swiper/css/navigation";

export default function CatSlider() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  return (
  <section className="bg-[#faf7f2] py-3 md:py-1 md:pb-6">

  <div className="w-full px-2 md:px-10 mx-auto relative">

    {/* PREMIUM HEADING */}
    <div className="relative w-fit mx-auto my-5">

      <h2 className="relative z-10 text-3xl font-bebas tracking-wide text-center md:text-6xl text-black">
        Our Favourite Categories
      </h2>


    </div>

    <Swiper
      modules={[Navigation, Autoplay]}
      autoplay={{
        delay: 1000,
        disableOnInteraction: false,
      }}
      loop
      navigation={{
        prevEl: ".prev",
        nextEl: ".next",
      }}
      spaceBetween={20}
      breakpoints={{
        320: { slidesPerView: 2 },
        480: { slidesPerView: 3 },
        768: { slidesPerView: 5 },
        1024: { slidesPerView: 8 },
      }}
    >

      {categories.map((item) => (

        <SwiperSlide key={item._id}>

          <Link href={`/category/${item.slug}`}>

            <div className="text-center group cursor-pointer">

              {/* PREMIUM CARD */}
              <div className="relative overflow-hidden rounded-3xl bg-white border border-white/50 p-3 shadow-[0_6px_25px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)]">

                {/* LIGHT EFFECT */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500 z-10 pointer-events-none" />

                {/* IMAGE */}
                <div className="relative w-full h-[140px] flex items-center justify-center overflow-hidden rounded-2xl">

                  {/* DARK OVERLAY */}
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition duration-500 z-10" />

                  <img
                    src={item.image || "/placeholder.png"}
                    alt={item.name}
                    className="h-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  {/* FLOATING BADGE */}
                  <div className="absolute top-3 right-3 z-20 bg-white/90 backdrop-blur-xl text-[10px] font-semibold px-3 py-1 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition duration-500">
                    Trending
                  </div>

                </div>

                {/* GLOW BORDER */}
                <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-yellow-200 transition duration-500" />

              </div>

              {/* LABEL */}
              <div className="mt-3">

                <p className="text-sm md:text-lg font-semibold text-gray-700 group-hover:text-black transition-all duration-300 leading-tight tracking-wide">
                  {item.name}
                </p>

                {/* UNDERLINE ANIMATION */}
                <div className="mx-auto mt-2 h-[2px] w-0 rounded-full bg-black group-hover:w-10 transition-all duration-500" />

              </div>

            </div>

          </Link>

        </SwiperSlide>

      ))}

    </Swiper>

  </div>

</section>
  );
}