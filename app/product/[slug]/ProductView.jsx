"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import Link from "next/link";
import { Heart, Minus, Plus } from "lucide-react";
import { toast } from "react-hot-toast";

import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";

export default function ProductView({ product, relatedProducts }) {
  const [zoomStyle, setZoomStyle] = useState({});
  const [activeTab, setActiveTab] = useState("description");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  // ACTIVE IMAGE / VIDEO
  const [activeMedia, setActiveMedia] = useState({
    type: "image",
    value: product.images?.[0] || "/placeholder.png",
  });

  // CART
  const addToCart = useCartStore((state) => state.addToCart);

  // WISHLIST
  const isInWishlist = useWishlistStore((state) => state.isInWishlist);
  const addToWishlist = useWishlistStore(
    (state) => state.addToWishlist,
  );
  const removeFromWishlist = useWishlistStore(
    (state) => state.removeFromWishlist,
  );

  const isWishlisted = isInWishlist(product._id);

  // SELECTED DATA
  const selectedSizeData =
    product.sizes?.find(
      (s) => s.size === selectedSize,
    ) || null;

  // IMAGE ZOOM
  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();

    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(2.2)",
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transform: "scale(1)",
      transformOrigin: "center center",
    });
  };

  // YOUTUBE URL
  const getYoutubeEmbedUrl = (url) => {
    if (!url) return "";

    const regExp =
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;

    const match = url.match(regExp);

    return match
      ? `https://www.youtube.com/embed/${match[1]}`
      : "";
  };

  return (
    <div className="bg-white font-caladea px-4 sm:px-6 md:px-10 lg:px-20 py-6 md:py-8 mt-5">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">

        {/* LEFT SIDE */}
        <div className="md:sticky md:top-32 self-start">

          {/* BREADCRUMB */}
          <p className="text-gray-500 uppercase mb-5 text-xs sm:text-sm tracking-[2px] font-poppins">
            Home /{" "}
            <span className="uppercase">
              {product.category?.name}
            </span>{" "}
            /{" "}
            <span className="text-black capitalize font-semibold">
              {product.name}
            </span>
          </p>

          {/* MAIN IMAGE */}
          <div
            className="
              overflow-hidden
              bg-white
              rounded-[20px]
              sm:rounded-[26px]
              md:rounded-[32px]
              border
              border-gray-100
              relative
              shadow-[0_10px_40px_rgba(0,0,0,0.08)]
            "
          >

            {activeMedia.type === "image" ? (

              <div
                className="relative overflow-hidden bg-white cursor-zoom-in"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >

                <Image
                  src={activeMedia.value}
                  width={1500}
                  height={1000}
                  unoptimized
                  priority
                  alt={product.name}
                  style={zoomStyle}
                  className="
                    w-full
                    h-[300px]
                    sm:h-[400px]
                    md:h-[560px]
                    object-contain
                    transition-transform
                    duration-200
                    ease-out
                  "
                />

              </div>

            ) : (

              <iframe
                src={getYoutubeEmbedUrl(
                  activeMedia.value,
                )}
                className="
                  w-full
                  h-[300px]
                  sm:h-[400px]
                  md:h-[560px]
                "
                allow="autoplay; encrypted-media"
                allowFullScreen
              />

            )}

          </div>

          {/* THUMBNAILS */}
          <Swiper
            spaceBetween={12}
            slidesPerView={"auto"}
            className="mt-5"
          >

            {/* IMAGE THUMBNAILS */}
            {product.images?.map((img, i) => (

              <SwiperSlide
                key={`${img}-${i}`}
                className="!w-auto"
              >

                <div
                  onClick={() =>
                    setActiveMedia({
                      type: "image",
                      value: img,
                    })
                  }
                  className={`
                    relative
                    overflow-hidden
                    rounded-2xl
                    cursor-pointer
                    border
                    bg-white
                    transition-all
                    duration-300
                    shadow-sm
                    ${
                      activeMedia.value === img
                        ? "border-black shadow-xl scale-105"
                        : "border-gray-200 hover:border-black hover:scale-105"
                    }
                  `}
                >

                  <Image
                    src={img}
                    width={100}
                    height={100}
                    unoptimized
                    alt={`product-${i}`}
                    className="
                      h-20
                      w-20
                      sm:h-24
                      sm:w-24
                      object-contain
                      bg-white
                      p-2
                    "
                  />

                  {activeMedia.value === img && (
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-black" />
                  )}

                </div>

              </SwiperSlide>

            ))}

            {/* VIDEO THUMB */}
            {product.youtubeLink && (

              <SwiperSlide className="!w-auto">

                <div
                  onClick={() =>
                    setActiveMedia({
                      type: "video",
                      value: product.youtubeLink,
                    })
                  }
                  className={`
                    relative
                    flex
                    items-center
                    justify-center
                    h-20
                    w-20
                    sm:h-24
                    sm:w-24
                    rounded-2xl
                    cursor-pointer
                    border
                    bg-white
                    transition-all
                    duration-300
                    shadow-sm
                    ${
                      activeMedia.type === "video"
                        ? "border-red-500 shadow-xl scale-105"
                        : "border-gray-200 hover:border-red-400 hover:scale-105"
                    }
                  `}
                >

                  <img
                    src={`https://img.youtube.com/vi/${
                      getYoutubeEmbedUrl(
                        product.youtubeLink,
                      )
                        .split("/embed/")[1]
                        ?.split("?")[0]
                    }/hqdefault.jpg`}
                    className="w-full h-full object-cover rounded-2xl"
                    alt="youtube-thumbnail"
                  />

                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-2xl">

                    <div className="bg-red-600 text-white rounded-full w-9 h-9 flex items-center justify-center text-sm shadow-lg">
                      ▶
                    </div>

                  </div>

                </div>

              </SwiperSlide>

            )}

          </Swiper>

        </div>

        {/* RIGHT SIDE */}
        <div className="relative">

          {/* LABEL */}
          <div className="flex items-center gap-3 mb-4">

            <div className="h-[1px] w-10 bg-black" />

            <p className="uppercase tracking-[4px] text-[11px] text-gray-500 font-medium">
              Luxury Essential
            </p>

          </div>

          {/* PRODUCT NAME */}
          <h1 className="text-[34px] md:text-[40px] leading-[1.05] font-semibold text-black max-w-xl">
            {product.name}
          </h1>

          {/* PRICE */}
          <div className="mt-4 flex items-end flex-wrap gap-4">

            <div className="flex items-end gap-3">

              <span className="text-[38px] font-semibold tracking-tight text-black">
                ₹
                {selectedSizeData?.price ||
                  product.price}
              </span>

              {(selectedSizeData?.oldPrice ||
                product.oldPrice) > 0 && (

                <span className="text-md text-gray-400 line-through mb-2">
                  ₹
                  {selectedSizeData?.oldPrice ||
                    product.oldPrice}
                </span>

              )}

            </div>

          </div>

          {/* TAX */}
          <p className="mt-2 text-sm text-red-600">
            Inclusive of all taxes
          </p>

          {/* DESCRIPTION */}
          <div className="mt-4">

            <p className="text-[15px] text-gray-800 max-w-2xl">
              {product.description}
            </p>

          </div>

          {/* SIZE */}
          {product?.sizes?.length > 0 && (

            <div className="mt-5">

              <h3 className="text-[15px] uppercase tracking-[3px] text-black font-semibold mb-5">
                Select Size
              </h3>

              <div className="flex flex-wrap gap-3">

                {product.sizes.map((item, i) => (

                  <button
                    key={i}
                    onClick={() =>
                      setSelectedSize(item.size)
                    }
                    className={`
                      h-[54px]
                      min-w-[70px]
                      px-5
                      rounded-full
                      text-sm
                      font-medium
                      border
                      transition-all
                      duration-300
                      uppercase
                      ${
                        selectedSize === item.size
                          ? "bg-black text-white border-black"
                          : "bg-white border-gray-200 hover:border-black"
                      }
                    `}
                  >

                    {item.size}

                  </button>

                ))}

              </div>

            </div>

          )}

          {/* QUANTITY */}
          <div className="mt-10">

            <p className="text-[15px] uppercase tracking-[3px] text-black font-semibold mb-4">
              Quantity
            </p>

            <div className="flex items-center border border-gray-200 rounded-full overflow-hidden w-fit">

              <button
                onClick={() => {
                  if (quantity > 1) {
                    setQuantity(quantity - 1);
                  }
                }}
                className="h-14 w-14 flex items-center justify-center hover:bg-black hover:text-white transition"
              >
                <Minus size={16} />
              </button>

              <div className="min-w-[60px] text-center font-semibold text-lg">
                {quantity}
              </div>

              <button
                onClick={() =>
                  setQuantity(quantity + 1)
                }
                className="h-14 w-14 flex items-center justify-center hover:bg-black hover:text-white transition"
              >
                <Plus size={16} />
              </button>

            </div>

          </div>

          {/* BUTTONS */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">

            {/* ADD TO CART */}
            <button
              onClick={() => {

                if (
                  product?.sizes?.length > 0 &&
                  !selectedSize
                ) {
                  toast.error(
                    "Please select size first",
                  );
                  return;
                }

                addToCart(
                  {
                    ...product,
                    selectedSize,
                    selectedColor,
                    price:
                      selectedSizeData?.price ||
                      product.price,
                    oldPrice:
                      selectedSizeData?.oldPrice ||
                      product.oldPrice,
                  },
                  quantity,
                );

                toast.success("Added to cart");
              }}
              className="
                h-[62px]
                rounded-full
                bg-black
                text-white
                font-medium
                transition-all
                duration-300
                hover:scale-[1.02]
              "
            >
              Add To Cart
            </button>

            {/* WHATSAPP */}
            <button className="h-[62px] rounded-full border border-[#25D366] bg-[#25D366] text-white font-medium transition-all duration-300 hover:scale-[1.02]">
              WhatsApp Now
            </button>

            {/* WISHLIST */}
            <button
              onClick={() => {

                if (isWishlisted) {
                  removeFromWishlist(
                    product._id,
                  );
                } else {
                  addToWishlist(product);
                }

              }}
              className="
                h-[62px]
                rounded-full
                border
                border-gray-200
                bg-white
                flex
                items-center
                justify-center
                gap-2
                font-medium
                transition-all
                duration-300
                hover:border-black
              "
            >

              <Heart
                size={18}
                className={`transition ${
                  isWishlisted
                    ? "fill-red-500 text-red-500"
                    : "text-gray-500"
                }`}
              />

              {isWishlisted
                ? "Wishlisted"
                : "Add Wishlist"}

            </button>

          </div>

        </div>

      </div>

      {/* RELATED PRODUCTS */}
      <div className="mt-10 md:mt-12">

        <h2 className="text-xl sm:text-3xl font-semibold mb-6">
          Related Products
        </h2>

        {relatedProducts?.length ? (

          <Swiper
            modules={[Autoplay]}
            autoplay={{
              delay: 1000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            speed={800}
            spaceBetween={20}
            breakpoints={{
              320: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
          >

            {relatedProducts.map((item) => (

              <SwiperSlide key={item._id}>

                <Link
                  href={`/product/${item.slug}`}
                  className="border rounded-xl p-3 block hover:shadow-md"
                >

                  <Image
                    src={
                      item.images?.[0] ||
                      "/placeholder.png"
                    }
                    
                    width={300}
                    height={300}
                    unoptimized
                    alt={item.name}
                    className="w-full h-40 sm:h-44 md:h-64 object-cover"
                  />

                  <h3 className="mt-2 text-xs sm:text-sm line-clamp-2">
                    {item.name}
                  </h3>

                  <p className="font-semibold mt-1 text-sm">
                    ₹{item.price}
                  </p>

                  <button className="w-full mt-4 bg-black text-white py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition">
                    View Product
                  </button>

                </Link>

              </SwiperSlide>

            ))}

          </Swiper>

        ) : (

          <p className="text-gray-500 text-sm">
            No related products found
          </p>

        )}

      </div>

    </div>
  );
}