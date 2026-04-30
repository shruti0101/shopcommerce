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
    <section className="bg-[#f3f4f6] py-8">
      <div className="max-w-[1440] px-2 mx-auto relative">

    

        <Swiper
          modules={[Navigation,Autoplay]}
          autoplay={{ delay: 1000, disableOnInteraction: false }}
          loop
          navigation={{
            prevEl: ".prev",
            nextEl: ".next",
          }}
          spaceBetween={20}
          breakpoints={{
            320: { slidesPerView: 2.2 },
            480: { slidesPerView: 3 },
            768: { slidesPerView: 5 },
            1024: { slidesPerView: 7 },
            1280: { slidesPerView: 9 },
          }}
        >
          {categories.map((item) => (
            <SwiperSlide key={item._id}>
              <Link href={`/category/${item.slug}`}>
                <div className="text-center group cursor-pointer">

                  {/* CARD */}
                  <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-3">

                    <div className="w-full h-[110px] flex items-center justify-center overflow-hidden rounded-xl">
                      <img
                        src={item.image || "/placeholder.png"}
                        alt={item.name}
                        className="h-full object-cover group-hover:scale-105 transition"
                      />
                    </div>

                  </div>

                  {/* LABEL */}
                  <p className="mt-3 text-sm md:text-lg font-medium text-gray-700 group-hover:text-black transition leading-tight">
                    {item.name}
                  </p>

                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}