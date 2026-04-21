"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";

const products = [
  {
    title: "Inflatable Lounge Chair",
    href: "/product/inflatable-lounge-chair",
    price: "899",
    old: "1299",
    discount: "14%",
    rating: "4.6",
    reviews: "33.8K",
    img: "/best-seller/chair.webp",
  },
  {
    title: "DUMBELL BOTTLE",
    href: "http://localhost:3000/product/dumbell-bottle-",
    price: "199",
    old: "499",
    discount: "35%",
    rating: "4.5",
    reviews: "13K",
    img: "/best-seller/bottle.webp",
  },
  {
    title: "PANDA LAMP",
    href: "/product/panda-lamp",
    price: "899",
    old: "1,599",
    discount: "12%",
    rating: "4.6",
    reviews: "1.6K",
    img: "/best-seller/panda.webp",
  },

  {
    title: "Jellyfish Lamp Bluetooth Speaker",
    href: "/product/jellyfish-lamp-bluetooth-speaker",
    price: "1,299",
    old: "2599",
    discount: "9%",
    rating: "4.7",
    reviews: "278",
    img: "/best-seller/jellyfish.webp",
  },

  {
    title: "VOILANT FAN AIR BLOWER",
    href: "/product/voilant-fan-air-blower",
    price: "1,299",
    old: "3,799",
    discount: "9%",
    rating: "4.7",
    reviews: "278",
    img: "/best-seller/blower.webp",
  },

  {
    title: "MINI AIR CONDITIONER",
    href: "/product/mini-air-conditioner",
    price: "1799",
    old: "3,320",
    discount: "9%",
    rating: "4.7",
    reviews: "278",
    img: "/best-seller/cooler.webp",
  },
  {
    title: "KIDS FIGHTER JET",
    href: "/product/kids-fighter-jet",
    price: "1,149",
    old: "2,566",
    discount: "",
    rating: "4.5",
    reviews: "20.1K",
    img: "/featured-products/jet.webp",
  },
];

export default function Bestsellers() {
  return (
    <>
      <div className="px-6 py-6">
        <h2 className="text-2xl md:text-4xl font-semibold mb-4">
          Our Bestseller
        </h2>
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={16}
          slidesPerView={5}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2.5 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
        >
          {products.map((item, i) => (
            <SwiperSlide key={i}>
              <Link href={item.href}>
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
                    <span className="text-lg font-bold">Rs {item.price}</span>

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
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
