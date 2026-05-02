"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { ShoppingBagIcon } from "lucide-react";
import { toast } from "react-hot-toast";

export default function ProductSlider() {
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

  const addToWishlist = useWishlistStore((state) => state.addToWishlist);
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="px-4 md:px-8 py-8 bg-[#fafafa]">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-4xl font-semibold text-gray-800">
          Featured Products
        </h2>
      </div>

      <Swiper
        modules={[Navigation, Autoplay]}
        autoplay={{ delay: 1500, disableOnInteraction: false }}
        loop
        navigation
        spaceBetween={10}
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
            <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-[380px] md:h-[420px] overflow-hidden">
              {/* IMAGE */}
              <Link href={item.href}>
                <div className="relative w-full h-[190px] md:h-[220px] bg-gray-50 overflow-hidden flex items-center justify-center">
                  <Image
                    src={item.img}
                    fill
                    alt={item.title}
                    className="object-cover group-hover:scale-105 transition duration-300"
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
              <div className="flex flex-col flex-1 p-4 justify-between">
                <Link href={item.href}>
                  <div>
                    {/* TITLE */}
                    <h3 className="text-md font-medium text-gray-900 line-clamp-2 min-h-[48px]">
                      {item.title}
                    </h3>

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

                {/* BUTTON */}
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
                  className="mt-4 w-full flex items-center justify-center gap-2 bg-[#111] text-white px-5 py-2 rounded-lg text-md font-medium hover:bg-black transition"
                >
                  <ShoppingBagIcon size={17} />
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
