"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";


const products = [
  {
    title: "Apple iPhone 16 Pro Max 256GB Desert Titanium",
    price: "4,349",
    old: "5,099",
    discount: "14%",
    rating: "4.6",
    reviews: "33.8K",
    img: "/top1.avif",
  },
  {
    title: "Samsung Galaxy S25 Ultra AI Dual SIM",
    price: "3,299",
    old: "5,099",
    discount: "35%",
    rating: "4.5",
    reviews: "13K",
    img: "/top2.avif",
  },
  {
    title: "WHOOP Life Membership Fitness Tracker",
    price: "1,379",
    old: "",
    discount: "",
    rating: "4.6",
    reviews: "1.6K",
     img: "/top3.avif",
  },
  {
    title: "Apple iPhone 17 Pro Max 256GB",
    price: "5,149",
    old: "",
    discount: "",
    rating: "4.5",
    reviews: "20.1K",
     img: "/top4.avif",
  },
  {
    title: "Masafi Pure Water Pack of 12",
    price: "12",
    old: "13.20",
    discount: "9%",
    rating: "4.7",
    reviews: "278",
    img: "/top1.avif",
  },

    {
    title: "Masafi Pure Water Pack of 12",
    price: "12",
    old: "13.20",
    discount: "9%",
    rating: "4.7",
    reviews: "278",
    img: "/top2.avif",
  },

    {
    title: "Masafi Pure Water Pack of 12",
    price: "12",
    old: "13.20",
    discount: "9%",
    rating: "4.7",
    reviews: "278",
  img: "/top3.avif",
  },
];

export default function ProductSlider() {
  return (

    <>
    
    <div className="px-6 py-6">
      

      <h2 className="text-2xl md:text-4xl font-semibold mb-4">Featured Products</h2>
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={16}
        slidesPerView={5}
        breakpoints={{
          320: { slidesPerView: 1.5 },
          640: { slidesPerView: 2.5 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
      >
        {products.map((item, i) => (
          <SwiperSlide key={i}>
            
            <div className="bg-white rounded-xl p-4 relative border hover:shadow-md transition">
              
              {/* IMAGE */}
              <div className="relative w-full h-75 mb-3">
                <Image
                  src={item.img}
                  fill
                  alt={item.title}
                  className="object-cover"
                />
              </div>

              {/* ADD BUTTON */}
              <button className="absolute top-3 right-3 w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-xl hover:bg-gray-200">
                +
              </button>

              {/* TITLE */}
              <p className="text-sm text-gray-800 line-clamp-2 mb-2">
                {item.title}
              </p>

              {/* RATING */}
              <div className="flex items-center gap-1 text-sm mb-1">
                <span className="text-green-600">★</span>
                <span>{item.rating}</span>
                <span className="text-gray-500">({item.reviews})</span>
              </div>

              {/* PRICE */}
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg font-bold">
                  Rs {item.price}
                </span>

                {item.old && (
                  <span className="line-through text-gray-400 text-sm">
                    {item.old}
                  </span>
                )}

                {item.discount && (
                  <span className="text-green-600 text-sm font-semibold">
                    {item.discount}
                  </span>
                )}
              </div>

              {/* CTA */}
              <div className="mt-3 bg-blue-700 text-white text-xs font-semibold py-2 px-3 rounded-md text-center">
                ⚡ GET IN 1 HR 4 MINS
              </div>

            </div>

          </SwiperSlide>
        ))}
      </Swiper>

    </div>


    </>
  );
}