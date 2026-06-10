"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";

import { toast } from "react-hot-toast";
import {
  ShoppingCart,
  Heart,
  Eye,
} from "lucide-react";

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
      href: "/product/titanic-ship-humdifier",
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
    <div className="px-4 md:px-8 py-8 bg-white">
      {/* HEADER */}
    <div className="mb-8 flex flex-col items-center justify-center text-center">

          <span className="mb-2 rounded-full border border-[#d9c7a5] bg-white px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#9f7a3d] shadow-sm">
            Premium Selection
          </span>

          <h2 className="font-bebas text-4xl leading-none tracking-wide text-[#111] md:text-7xl">
            Featured Products
          </h2>

          <p className="mt-2 max-w-4xl text-sm leading-7 text-[#5c5c5c] md:text-[20px]">
            Discover trending products crafted to elevate your lifestyle
            with style, innovation, and everyday convenience.
            
          </p>
        </div>

    <Swiper
  modules={[Navigation, Autoplay]}
  autoplay={{ delay: 1500, disableOnInteraction: false }}
  loop
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
  {products.map((product, i) => (
    <SwiperSlide key={i}>

      <div
        className="
          group
          relative
          mt-3
          flex
          h-[390px]
          md:h-[540px]
          flex-col
          overflow-hidden
          rounded-[30px]
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

          <div className="relative flex h-[190px] md:h-[300px] w-full items-center justify-center overflow-hidden bg-white">

            {/* GLOW */}
            <div className="absolute w-[220px] h-[220px] rounded-full bg-[#f5ede1] blur-3xl opacity-60 group-hover:scale-125 transition duration-700" />

            <Image
              src={product.img}
              width={300}
              height={300}
              alt={product.title}
              className="relative z-10 object-contain group-hover:scale-105 transition duration-500"
            />

            {/* DISCOUNT */}
            {product.discount && (
              <span
                className="
                  absolute
                  top-4
                  left-4
                  z-20
                  rounded-full
                  bg-black
                  px-3
                  py-1.5
                  text-[11px]
                  font-semibold
                  text-white
                  shadow-lg
                "
              >
                {product.discount} OFF
              </span>
            )}




            {/* FLOATING ACTIONS */}
<div
  className="
    absolute
    top-4
    right-4
    z-30
    flex
    flex-col
    gap-3
    opacity-0
    translate-x-5
    transition-all
    duration-500
    group-hover:opacity-100
    group-hover:translate-x-0
  "
>

  {/* ADD TO CART */}
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
      group/icon
      flex
      h-11
      w-11
      items-center
      justify-center
      rounded-2xl
      border
      border-white/20
      bg-white/90
      backdrop-blur-xl
      shadow-[0_10px_30px_rgba(0,0,0,0.12)]
      transition-all
      duration-300
      hover:scale-110
      hover:bg-black
    "
  >
    <ShoppingCart
      size={18}
      className="text-red-600 transition group-hover/icon:text-white"
    />
  </button>

  {/* WISHLIST */}
  {/* <button
    onClick={(e) => {
      e.preventDefault();

      addToWishlist(product);

      toast.success("Added to wishlist");
    }}
    className="
      group/icon
      flex
      h-11
      w-11
      items-center
      justify-center
      rounded-2xl
      border
      border-white/20
      bg-white/90
      backdrop-blur-xl
      shadow-[0_10px_30px_rgba(0,0,0,0.12)]
      transition-all
      duration-300
      hover:scale-110
      hover:bg-[#ff4d6d]
    "
  >
    <Heart
      size={18}
      className="text-black transition group-hover/icon:text-white"
    />
  </button> */}

  {/* QUICK VIEW */}
  <Link
    href={product.href}
    className="
      group/icon
      flex
      h-11
      w-11
      items-center
      justify-center
      rounded-2xl
      border
      border-white/20
      bg-white/90
      backdrop-blur-xl
      shadow-[0_10px_30px_rgba(0,0,0,0.12)]
      transition-all
      duration-300
      hover:scale-110
      hover:bg-[#8c6239]
    "
  >
    <Eye
      size={18}
      className="text-black transition group-hover/icon:text-white"
    />
  </Link>

</div>

          </div>

        </Link>

        {/* CONTENT */}
        <div className="flex flex-1 flex-col justify-between px-5 pb-5 pt-3">

          <Link href={product.href}>

            <div>

              {/* SMALL LABEL */}
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#9f7a3d] font-semibold">
                Trending Now
              </p>

              {/* TITLE */}
              <h3
                className="
                  mt-2
                  line-clamp-2
                  text-[12px]
                  md:text-[21px]
                  font-semibold
                  leading-[1.45]
                  text-[#111]
                  transition
                  duration-300
                  group-hover:text-[#8c6239]
                "
              >
                {product.title}
              </h3>

              {/* PRICE */}
              <div className="mt-2 flex items-center gap-2">

                <span className="text-md md:text-2xl font-bold text-black">
                  ₹{product.price}
                </span>

                {product.old && (
                  <span className="text-sm text-gray-400 line-through">
                    ₹{product.old}
                  </span>
                )}

              </div>

            </div>

          </Link>

          {/* BOTTOM */}
          <div className="">

            {/* LINE */}
            <div className="mb-3 h-[1px] w-full bg-gradient-to-r from-transparent via-[#ebe2d6] to-transparent" />

            {/* BUTTONS */}
         <div className="flex items-center gap-2 sm:gap-3 w-full">

  {/* ADD TO CART */}
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
      h-[44px]
     py-3
      rounded-xl
      sm:rounded-2xl
      bg-black
      px-3
      sm:px-5
      text-[12px]
      sm:text-sm
      font-semibold
      text-white
      shadow-lg
      transition-all
      duration-300
      hover:bg-[#1d1d1d]
      hover:shadow-xl
      active:scale-[0.98]
    "
  >

    <span className="flex items-center justify-center gap-1.5 sm:gap-2">

      <ShoppingCart
        size={15}
        className="sm:w-[17px] sm:h-[17px]"
      />

      <span className="truncate">
        Add To Cart
      </span>

    </span>

  </button>

  {/* VIEW */}
  <Link
    href={product.href}
    className="
       hidden md:flex
      h-[44px]
      w-[44px]
      sm:h-[52px]
      sm:w-[52px]
      shrink-0
      items-center
      justify-center
      rounded-xl
      sm:rounded-2xl
      border
      border-[#ece4d8]
      bg-white
      text-sm
      sm:text-lg
      transition-all
      duration-300
      hover:border-black
      hover:bg-black
      hover:text-white
      active:scale-[0.95]
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
