"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import {
  Search,
  MapPin,
  User,
  ShoppingBag,
  Heart,
  Globe,
  
} from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then(setCategories);
  }, []);

  return (
    <div className="w-full font-sans">
      
      {/* ================= TOP NAV ================= */}
      <div className="bg-[#FFED00] h-[64px] flex items-center px-6 justify-between">

        {/* LEFT */}
        <div className="flex items-center gap-6 min-w-fit">
          <img src="/logo.png" alt="logo" className="h-[32px] object-contain" />

          <div className="flex items-center gap-1 text-[14px] text-black">
            <MapPin size={16} strokeWidth={2.2} />
            <span className="font-medium">Other - India</span>
          </div>
        </div>

        {/* SEARCH */}
        <div className="flex-1 flex justify-center px-6">
          <div className="w-full max-w-[640px]">
            <div className="flex items-center bg-[#F5F5F5] h-[44px] rounded-full px-4 border border-transparent focus-within:border-gray-300">
              <Search size={18} className="text-gray-500" />
              <input
                type="text"
                placeholder='Search for "Gift Cards"'
                className="ml-3 w-full bg-transparent outline-none text-[14px] placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-6 text-[14px] text-black min-w-fit">

          <div className="flex items-center gap-1 cursor-pointer">
            <Globe size={18} />
            <span className="font-medium">India</span>
          </div>

          <div className="flex items-center gap-1 cursor-pointer">
            <User size={18} />
            <span className="font-medium">Log in</span>
          </div>

          <div className="flex items-center gap-1 cursor-pointer">
            <ShoppingBag size={18} />
            <span className="font-medium">Orders</span>
          </div>

          <div className="flex items-center gap-1 cursor-pointer">
            <Heart size={18} />
            <span className="font-medium">Wishlist</span>
          </div>

          <div className="flex items-center gap-1 cursor-pointer">
            <ShoppingBag size={18} />
            <span className="font-medium">Cart</span>
          </div>

        </div>
      </div>

      {/* ================= CATEGORY NAV ================= */}
     <div className="h-[48px] flex items-center px-6 bg-white ">

  <div className="flex items-center w-full">

    {/* 🔥 SWIPER */}
    <Swiper
      slidesPerView="auto"
      spaceBetween={28}
      freeMode={true}
      className="flex-1"
    >
      {categories.map((cat) => (
        <SwiperSlide key={cat._id} className="!w-auto">
          <Link
            href={`/category/${cat.slug}`}
            className="text-[17px] capitalize font-semibold text-[#2E2E2E] whitespace-nowrap hover:text-black transition"
          >
            {cat.name}
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>

    {/* 🔥 DELIVERY BADGE (FIXED RIGHT SIDE) */}
    <div className="ml-6 flex items-center bg-white border rounded-full px-4 py-1 text-[13px] shadow-sm whitespace-nowrap">
      <span className="mr-1">Get</span>
      <span className="font-semibold">Free Delivery</span>
      <span className="ml-1">with</span>

      <span className="ml-1 bg-yellow-400 text-black px-2 rounded-full text-[12px]">
        JL INDUSTRY
      </span>
    </div>

  </div>
</div>


    {/* TOP BLUE STRIP */}
          <div className="w-full h-[56px] bg-[#1E3A8A] flex items-center justify-between px-6 relative">
            <button className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center">
              <ChevronLeft className="text-white" />
            </button>

            <Swiper
              modules={[Autoplay]}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              loop={true}
              className="w-full"
            >
              {[
                "Get Latest Deals On JL INDUSTRY",
                "Big Discounts On Electronics ⚡",
                "Free Shipping On Orders Above ₹999 🚚",
                "New Arrivals Just Dropped 🔥",
              ].map((text, i) => (
                <SwiperSlide key={i}>
                  <div className="text-white font-semibold text-lg tracking-wide text-center">
                    {text.split("JL INDUSTRY").map((part, idx) => (
                      <span key={idx}>
                        {part}
                        {idx < text.split("JL INDUSTRY").length - 1 && (
                          <span className="text-yellow-300">JL INDUSTRY</span>
                        )}
                      </span>
                    ))}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <button className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center">
              <ChevronRight className="text-white" />
            </button>
          </div>
    </div>
  );
}