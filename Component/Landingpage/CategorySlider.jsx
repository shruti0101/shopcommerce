"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

export default function CategorySlider() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  return (
    <section className="w-full px-2 py-12 bg-gradient-to-b from-white to-gray-50">
      {/* Heading */}
      <div className="text-center mb-10">
        <p className="mb-2 text-sm uppercase tracking-[4px] text-gray-500">
          Explore
        </p>

        <h1 className="text-3xl font-bold text-gray-900 md:text-5xl">
          Shop By Category
        </h1>

        <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-black" />
      </div>

      {/* Slider */}
      <Swiper
        modules={[Autoplay]}
        spaceBetween={12}
        slidesPerView={2}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={categories.length > 4}
        breakpoints={{
          640: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 5,
          },
          1280: {
            slidesPerView: 6,
          },
        }}
        className="px-4 md:px-8"
      >
        {categories.map((category) => (
          <SwiperSlide key={category._id}>
            <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
              
              {/* Image */}
              <Link href={`/category/${category.slug}`}>
                <div className="overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-58 md:h-64 w-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>
              </Link>

              {/* Card Content */}
              <div className="flex flex-col items-center justify-center p-4 text-center">
                {/* Category Name */}
                <h2 className="h-10 text-sm text-center my-auto font-semibold leading-6 text-gray-900 md:text-base">
                  {category.name}
                </h2>

                {/* Button */}
                <Link
                  href={`/category/${category.slug}`}
                  className="mt-4 rounded-full bg-black px-5 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-gray-800"
                >
                  View Category
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}