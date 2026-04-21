import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Grid } from "swiper/modules";
import Link from "next/link";
const Catslider = () => {
  const categories = [
    {
      name: "Beauty & Health",
      image: "/cat/heathbeauty.webp",
      href: "/category/beauty-&-health",
    },
    {
      name: "Decorative Product",
      image: "/cat/decorative.webp",
      href: "/category/decorative-product",
    },
    { name: "Health", image: "/cat/heath.webp", href: "/category/health" },
    {
      name: "Home decorative",
      image: "/cat/homedecorative.webp",
      href: "/category/home-decorative",
    },
    {
      name: "Office Product",
      image: "/cat/officeProducts.webp",
      href: "/category/office-product",
    },
    {
      name: "Home Product",
      image: "/cat/homeProduct.webp",
      href: "/category/home-product",
    },
    {
      name: "Fitness & Health",
      image: "/cat/fitness-health.webp",
      href: "/category/fitness-&-health",
    },
    {
      name: "Smart Gadgets",
      image: "/cat/smart-gadgets.webp",
      href: "/category/smart-gadgets",
    },
    {
      name: "Kids Items",
      image: "/cat/kids.webp",
      href: "/category/kids-items",
    },
    {
      name: "Water Bottles",
      image: "/cat/water-bottles.webp",
      href: "/category/water-bottles",
    },
    {
      name: "Home & Kitchen",
      image: "/cat/home-kitchen.webp",
      href: "/category/home-&-kitchen",
    },
    { name: "Others", image: "/cat/others.webp", href: "/category/others" },
  ];

  return (
    <div>
      <div className="mt-6 px-6">
        <Swiper
          slidesPerView={9} // 4 per row
          breakpoints={{
            320: {
              slidesPerView: 3,
              grid: { rows: 2 },
            },
            480: {
              slidesPerView: 4,
              grid: { rows: 2 },
            },
            768: {
              slidesPerView: 6,
              grid: { rows: 2 },
            },
            1024: {
              slidesPerView: 8,
              grid: { rows: 2 },
            },
            1280: {
              slidesPerView: 9,
              grid: { rows: 2 },
            },
          }}
          spaceBetween={10}
          className="overflow-hidden"
        >
          {categories.map((item, i) => (
            <SwiperSlide key={i}>
              <Link href={item.href}>
                <div className="flex flex-col items-center ">
                  <div className="w-[130px] h-[130px] bg-white rounded-2xl flex items-center justify-center shadow-sm hover:shadow-md transition">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-25 h-25 object-cover"
                    />
                  </div>
                  <span className="text-base mt-2 text-center text-gray-900 font-medium leading-tight">
                    {item.name}
                  </span>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Pagination Indicator */}
        <div className="flex justify-center mt-4">
          <div className="w-16 h-[4px] bg-gray-200 rounded-full relative">
            <div className="absolute left-0 w-6 h-[4px] bg-gray-800 rounded-full transition-all"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catslider;
