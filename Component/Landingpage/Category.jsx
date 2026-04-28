"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";

const products = [
  {
    title: "Neck Pillow massager",
    href: "/product/neck-massager",
    price: "640",
    old: "999",
    discount: "30%",
    rating: "4.6",
    reviews: "33.8K",
    img: "/featured-products/neck.webp",
  },
  {
    title: "Slim N Lift Vest",
    href: "/product/slim-n-lift-for-men",
    price: "399",
    old: "799",
    discount: "35%",
    rating: "4.5",
    reviews: "13K",
    img: "/featured-products/vest.webp",
  },
  {
    title: "Mini Steam Iron",
    href: "/product/steam-iron",
    price: "899",
    old: "1,599",
    discount: "",
    rating: "4.6",
    reviews: "1.6K",
    img: "/featured-products/steam.webp",
  },
  {
    title: "Kinoki Foot Patches",
    href: "/product/kinoki-foot-patches",
    price: "149",
    old: "566",
    discount: "40%",
    rating: "4.5",
    reviews: "20.1K",
    img: "/featured-products/foot.webp",
  },
  {
    title: "Mini Cooling Fan",
    href: "/product/mini-cooling-fan",
    price: "1,299",
    old: "2599",
    discount: "9%",
    rating: "4.7",
    reviews: "278",
    img: "/featured-products/mini-fan.webp",
  },

  {
    title: "Ship Humdifier",
    href: "/product/ship-humdifier",
    price: "1,299",
    old: "799",
    discount: "19%",
    rating: "4.7",
    reviews: "278",
    img: "/featured-products/ship.webp",
  },

  {
    title: "Anty Gravity Water Drop Humidifier",
    href: "/product/anty-gravity-water-drop-humidifier",
    price: "799",
    old: "1,320",
    discount: "9%",
    rating: "4.7",
    reviews: "278",
    img: "/featured-products/anti.webp",
  },
  {
    title: "Stainless Steel Tumbler 1200ml",
    href: "/product/tumbler1200ml-black",
    price: "799",
    old: "320",
    discount: "9%",
    rating: "4.7",
    reviews: "278",
    img: "/featured-products/tumbler.webp",
  },
  {
    title: "Pelvic Massager",
    href: "/product/silicone-wand-massager",
    price: "799",
    old: "1,320",
    discount: "9%",
    rating: "4.7",
    reviews: "278",
    img: "/featured-products/pelvic.webp",
  },
  {
    title: "Glass Coffee Mug",
    href: "/product/glass-coffee-mixing-mug",
    price: "499",
    old: "1,320",
    discount: "39%",
    rating: "4.7",
    reviews: "278",
    img: "/featured-products/coffee.webp",
  },
  {
    title: "Jellyfish Lamp",
    href: "/product/3-layer-jellyfish-light-(pair)",
    price: "499",
    old: "1,320",
    discount: "19%",
    rating: "4.7",
    reviews: "278",
    img: "/featured-products/jelly.webp",
  },
  {
    title: "Vaccume Flask Set Mix Color",
    href: "/product/vaccume-flask-set-mix-color",
    price: "799",
    old: "1,320",
    discount: "9%",
    rating: "4.7",
    reviews: "278",
    img: "/featured-products/vaccume.webp",
  },
  {
    title: "Garden Water Sprinkler",
    href: "/product/garden-water-sprinkler",
    price: "799",
    old: "1,520",
    discount: "29%",
    rating: "4.7",
    reviews: "278",
    img: "/featured-products/grass.webp",
  },
  {
    title: "Vaccume Flask Set",
    href: "/product/vaccume-flask-set-black-color",
    price: "499",
    old: "720",
    discount: "9%",
    rating: "4.7",
    reviews: "278",
    img: "/featured-products/black.webp",
  },
  {
    title: "Silicone Foldable kettle",
    href: "/product/electric-foldable-kettle",
    price: "699",
    old: "1,120",
    discount: "9%",
    rating: "4.7",
    reviews: "278",
    img: "/featured-products/kettle.webp",
  },
  {
    title: "Pooja Thali",
    href: "/product/pooja-thali",
    price: "699",
    old: "1,120",
    discount: "9%",
    rating: "4.7",
    reviews: "278",
    img: "/featured-products/pooja.webp",
  },
];

export default function ProductSlider() {
  return (
    <>
      <div className="px-6 py-6">
        <h2 className="text-2xl md:text-4xl font-semibold mb-4">
          Featured Products
        </h2>
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={16}
          slidesPerView={5}
          breakpoints={{
            320: { slidesPerView: 2 },
            520: { slidesPerView: 2 },
            640: { slidesPerView: 2.5 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
        >
          {products.map((item, i) => (
            <SwiperSlide key={i}>
              <Link href={item.href}>
                <div className="bg-white rounded-xl h-[340px] p-2 md:p-4 relative border hover:shadow-md transition flex flex-col overflow-hidden">
                  {/* IMAGE */}
                  <div className="relative w-full h-40 md:h-44 flex-shrink-0">
                    <Image
                      src={item.img}
                      fill
                      alt={item.title}
                      className="object-contain"
                    />
                  </div>

                  {/* ADD BUTTON */}
                  <button className="absolute top-3 right-3 w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-xl hover:bg-gray-200">
                    +
                  </button>

                  {/* CONTENT */}
                  <div className="flex flex-col flex-1 justify-between mt-2">
                    {/* TOP CONTENT */}
                    <div>
                      {/* TITLE */}
                      <p className="text-sm text-gray-800 line-clamp-2 mb-1">
                        {item.title}
                      </p>

                      {/* RATING */}
                      <div className="flex items-center gap-1 text-sm mb-1">
                        <span className="text-green-600">★</span>
                        <span>{item.rating}</span>
                        <span className="text-gray-500">({item.reviews})</span>
                      </div>

                      {/* PRICE */}
                      <div className="flex items-center gap-2">
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
                    </div>

                    {/* CTA */}
                    <div className="mt-2 bg-blue-700 text-white text-xs font-semibold py-2 px-3 rounded-md text-center">
                      ⚡ GET IN 1 HR 4 MINS
                    </div>
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
