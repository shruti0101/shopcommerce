"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { toast } from "react-hot-toast";
import { ShoppingBagIcon } from "lucide-react";

export default function Bestsellers() {
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
      href: "/product/dumbell-bottle-",
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
      old: "1599",
      discount: "12%",
      rating: "4.6",
      reviews: "1.6K",
      img: "/best-seller/panda.webp",
    },
    {
      title: "Jellyfish Lamp Bluetooth Speaker",
      href: "/product/jellyfish-lamp-bluetooth-speaker",
      price: "1299",
      old: "2599",
      discount: "9%",
      rating: "4.7",
      reviews: "278",
      img: "/best-seller/jellyfish.webp",
    },
    {
      title: "MINI AIR CONDITIONER",
      href: "/product/mini-air-conditioner",
      price: "1799",
      old: "3320",
      discount: "9%",
      rating: "4.7",
      reviews: "278",
      img: "/best-seller/cooler.webp",
    },
    {
      title: "KIDS FIGHTER JET",
      href: "/product/kids-fighter-jet",
      price: "1149",
      old: "2566",
      discount: "",
      rating: "4.5",
      reviews: "20.1K",
      img: "/featured-products/jet.webp",
    },
  ];

  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="px-4 md:px-8 py-8 bg-[#fafafa]">
      {/* HEADER */}
      <h2 className="text-2xl md:text-4xl font-semibold text-gray-800 mb-6">
        Our Bestseller
      </h2>

      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        autoplay={{ delay: 1500, disableOnInteraction: false }}
        loop
        spaceBetween={10}
        slidesPerView={5}
        breakpoints={{
          320: { slidesPerView: 2 },
          640: { slidesPerView: 2.5 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
      >
        {products.map((item, i) => (
          <SwiperSlide key={i}>
            <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-[380px] md:h-[420px] overflow-hidden">
              {/* IMAGE */}
              <Link href={item.href}>
                <div className="relative w-full h-[180px] md:h-[200px] flex items-center justify-center overflow-hidden bg-gray-50">
                  <Image
                    src={item.img}
                    fill
                    alt={item.title}
                    className="object-contain group-hover:scale-105 transition duration-300"
                  />

                  {/* Discount Badge */}
                  {item.discount && (
                    <span className="absolute top-3 left-3 bg-green-600 text-white text-xs px-2 py-1 rounded-md">
                      {item.discount}
                    </span>
                  )}
                </div>
              </Link>

              {/* CONTENT */}
              <div className="flex flex-col flex-1 p-4">
                <Link href={item.href} className="flex-1">
                  <div className="flex flex-col h-full">
                    {/* TITLE */}
                    <h3 className="text-md font-medium text-gray-800 line-clamp-2 min-h-[48px]">
                      {item.title}
                    </h3>

                    {/* RATING */}
                    <div className="flex items-center gap-1 text-xs mt-1">
                      <span className="text-green-600">★</span>
                      <span>{item.rating}</span>
                      <span className="text-gray-400">({item.reviews})</span>
                    </div>

                    {/* PRICE */}
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-lg font-semibold text-gray-900">
                        ₹{item.price}
                      </span>

                      {item.old && (
                        <span className="line-through text-gray-400 text-sm">
                          ₹{item.old}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>

                
                <button
                  onClick={(e) => {
                    e.preventDefault();

                    addToCart(
                      {
                        ...item,
                        name: item.title,
                        images: [item.img],
                        price: Number(String(item.price).replace(/,/g, "")),
                      },
                      1,
                    );

                    toast.success("Added to cart");
                  }}
                  className="mt-auto flex items-center justify-center gap-2 w-full bg-[#111] text-white px-5 py-2 rounded-lg text-md font-medium hover:bg-black transition"
                >
                  <ShoppingBagIcon className="hidden md:block" size={17} />
                  Add to Cart
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
