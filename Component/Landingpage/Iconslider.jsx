"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation,Autoplay } from "swiper/modules";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";

const categories = [
  {
    name: "Massagers",
    image: "/iconslider/1.png",
    link: "/category/massagers",
  },
  {
    name: "Aroma Diffusers",
    image: "/iconslider/2.png",
    link: "/category/aroma-diffusers",
  },
  {
    name: "Kitchenware",
    image: "/iconslider/11.png",
    link: "/category/kitchenware",
  },
  {
    name: "Garden Tools",
    image: "/iconslider/12.png",
    link: "/category/garden-tools",
  },
  {
    name: "Smart Gadgets",
    image: "/iconslider/3.png",
    link: "/category/smart-gadgets",
  },
  {
    name: "Water Bottles",
    image: "/iconslider/4.png",
    link: "/category/water-bottles",
  },
  {
    name: "Corporate Gifts",
    image: "/iconslider/13.png",
    link: "/category/corporate-gifts",
  },
  {
    name: "Office Products",
    image: "/iconslider/6.png",
    link: "/category/office-products",
  },
  {
    name: "Fitness & Health",
    image: "/iconslider/14-.png",
    link: "/category/fitness-health",
  },
  {
    name: "Car Accessories",
    image: "/iconslider/5.png",
    link: "/category/car-accessories",
  },
  {
    name: "Home & Kitchen",
    image: "/iconslider/7.png",
    link: "/category/home-kitchen",
  },
  {
    name: "Decorative Product",
    image: "/iconslider/8.png",
    link: "/category/decorative-product",
  },
  {
    name: "Wireless Chargers",
    image: "/iconslider/9.png",
    link: "/category/wireless-chargers",
  },
  {
    name: "Kids Toys",
    image: "/iconslider/10.png",
    link: "/category/kids-toys",
  },
];

export default function CategorySlider() {
  return (
    <div className="w-full bg-white ">
      <Swiper
         modules={[Navigation, Autoplay]}
  autoplay={{ delay: 1500, disableOnInteraction: false }}
   
        spaceBetween={20}
        slidesPerView={2}
        breakpoints={{
          480: {
            slidesPerView: 3,
          },
          640: {
            slidesPerView: 4,
          },
          768: {
            slidesPerView: 5,
          },
          1024: {
            slidesPerView: 7,
          },
         
        }}
        className="px-2"
      >
        {categories.map((category, index) => (
          <SwiperSlide key={index}>
            <Link href={category.link} className="group flex cursor-pointer flex-col items-center rounded-2xl  transition-all duration-300 hover:shadow-lg">
              <div className="relative h-60 w-60">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}