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
      img: "/tumbler.webp",
    },
    {
      title: "Wooden Door Chime with Brass Bell",
      href: "/product/wooden-door-chime-with-brass-bell",
      price: "799",
      old: "1,320",
      discount: "9%",
      rating: "4.7",
      reviews: "278",
      img: "/Premium-Wooden-Brass-Bell-Chime.webp",
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
      img: "/vaccumeset.webp",
    },
    {
      title: "Silicone Foldable kettle",
      href: "/product/electric-foldable-kettle",
      price: "699",
      old: "1,120",
      discount: "9%",
      rating: "4.7",
      reviews: "278",
      img: "/foldable.jpg",
    },
    {
      title: "Pooja Thali",
      href: "/product/pooja-thali",
      price: "699",
      old: "1,120",
      discount: "9%",
      rating: "4.7",
      reviews: "278",
      img: "/poojathali.webp",
    },
  ];

  const addToWishlist = useWishlistStore((state) => state.addToWishlist);
  const addToCart = useCartStore((state) => state.addToCart);

  return (

    <div className="bg-[#fafafa] px-3 sm:px-4 md:px-8 py-8 md:py-12 overflow-hidden">

      {/* HEADER */}
      <div className="mb-8 md:mb-12 flex flex-col items-center justify-center text-center">

        <span className="mb-3 rounded-full border border-[#d9c7a5] bg-white px-4 sm:px-5 py-2 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.25em] text-[#9f7a3d] shadow-sm">
          Premium Selection
        </span>

        <h2 className="font-bebas text-3xl sm:text-5xl md:text-7xl leading-none tracking-wide text-[#111]">
          Featured Products
        </h2>

        <p className="mt-3 max-w-3xl px-2 text-xs sm:text-sm md:text-[20px] leading-6 md:leading-8 text-[#5c5c5c]">
          Discover trending products crafted to elevate your lifestyle
          with style, innovation, and everyday convenience.
        </p>

      </div>

      {/* SLIDER */}
      <Swiper
        modules={[Navigation, Autoplay]}
        autoplay={{
          delay: 2200,
          disableOnInteraction: false,
        }}
        loop={true}
        navigation
        spaceBetween={14}
        slidesPerView={5}
        breakpoints={{
          0: {
            slidesPerView: 1.2,
            spaceBetween: 12,
          },

          360: {
            slidesPerView: 1.4,
            spaceBetween: 12,
          },

          480: {
            slidesPerView: 1.7,
            spaceBetween: 14,
          },

          640: {
            slidesPerView: 2.2,
            spaceBetween: 16,
          },

          768: {
            slidesPerView: 2.5,
            spaceBetween: 18,
          },

          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },

          1280: {
            slidesPerView: 5,
            spaceBetween: 22,
          },
        }}
        className="!overflow-visible"
      >

        {products.map((product, i) => (

          <SwiperSlide key={i}>

            <div
              className="
                group
                relative
                mt-2
                flex
                h-[360px]
                sm:h-[420px]
                md:h-[520px]
                flex-col
                overflow-hidden
                rounded-[28px]
                border
                border-[#f1ece5]
                bg-white
                shadow-[0_8px_30px_rgba(0,0,0,0.05)]
                transition-all
                duration-500
                hover:-translate-y-2
                hover:shadow-[0_20px_60px_rgba(0,0,0,0.10)]
              "
            >

              {/* IMAGE */}
              <Link href={product.href}>

                <div className="relative flex h-[170px] sm:h-[220px] md:h-[300px] w-full items-center justify-center overflow-hidden bg-white p-3 sm:p-5">

                  {/* GLOW */}
                  <div className="absolute h-[180px] w-[180px] sm:h-[240px] sm:w-[240px] rounded-full bg-[#f5ede1] blur-3xl opacity-60 group-hover:scale-125 transition duration-700" />

                  <Image
                    src={product.img}
                    width={300}
                    height={300}
                    alt={product.title}
                    className="
                      relative
                      z-10
                      h-full
                      w-full
                      object-contain
                      transition
                      duration-500
                      group-hover:scale-105
                    "
                  />

                  {/* DISCOUNT */}
                  {product.discount && (

                    <span
                      className="
                        absolute
                        left-3
                        top-3
                        z-20
                        rounded-full
                        bg-black
                        px-3
                        py-1.5
                        text-[10px]
                        sm:text-[11px]
                        font-semibold
                        text-white
                        shadow-lg
                      "
                    >
                      {product.discount} OFF
                    </span>

                  )}

                </div>

              </Link>

              {/* CONTENT */}
              <div className="flex flex-1 flex-col justify-between px-4 sm:px-5 pb-4 sm:pb-5 pt-3">

                <Link href={product.href}>

                  <div>

                    {/* LABEL */}
                    <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#9f7a3d] font-semibold">
                      Trending Now
                    </p>

                    {/* TITLE */}
                    <h3
                      className="
                        mt-2
                        line-clamp-2
                        text-[15px]
                        sm:text-[17px]
                        md:text-[21px]
                        font-semibold
                        leading-[1.4]
                        text-[#111]
                        transition
                        duration-300
                        group-hover:text-[#8c6239]
                      "
                    >
                      {product.title}
                    </h3>

                    {/* PRICE */}
                    <div className="mt-3 flex flex-wrap items-center gap-2">

                      <span className="text-xl sm:text-2xl font-bold text-black">
                        ₹{product.price}
                      </span>

                      {product.old && (

                        <span className="text-xs sm:text-sm text-gray-400 line-through">
                          ₹{product.old}
                        </span>

                      )}

                    </div>

                  </div>

                </Link>

                {/* BOTTOM */}
                <div className="mt-4">

                  {/* LINE */}
                  <div className="mb-4 sm:mb-5 h-[1px] w-full bg-gradient-to-r from-transparent via-[#ebe2d6] to-transparent" />

                  {/* BUTTONS */}
                  <div className="flex items-center gap-2 sm:gap-3">

                    {/* CART */}
                    <button
                      onClick={(e) => {

                        e.preventDefault();

                        addToCart(
                          {
                            ...product,
                            name: product.title,
                            images: [product.img],
                            price: Number(
                              String(product.price).replace(/,/g, "")
                            ),
                          },
                          1
                        );

                        toast.success("Added to cart");

                      }}
                      className="
                        flex-1
                        h-[48px]
                        sm:h-[52px]
                        rounded-2xl
                        bg-black
                        px-3 sm:px-5
                        text-xs sm:text-sm
                        font-semibold
                        text-white
                        shadow-lg
                        transition-all
                        duration-300
                        hover:bg-[#1d1d1d]
                        hover:shadow-xl
                      "
                    >

                      <span className="flex items-center justify-center gap-2">

                        <ShoppingBagIcon size={16} />

                        <span className="hidden sm:block">
                          Add To Cart
                        </span>

                      </span>

                    </button>

                    {/* VIEW */}
                    <Link
                      href={product.href}
                      className="
                        flex
                        h-[48px]
                        w-[48px]
                        sm:h-[52px]
                        sm:w-[52px]
                        items-center
                        justify-center
                        rounded-2xl
                        border
                        border-[#ece4d8]
                        bg-white
                        text-base
                        sm:text-lg
                        transition-all
                        duration-300
                        hover:border-black
                        hover:bg-black
                        hover:text-white
                      "
                    >
                      →
                    </Link>

                  </div>

                </div>

              </div>

            </div>

          </SwiperSlide>

        ))}

      </Swiper>

    </div>
  );
}