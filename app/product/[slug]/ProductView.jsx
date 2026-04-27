"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Link from "next/link";
import { Heart } from "lucide-react";
import { toast } from "react-hot-toast";

import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";

export default function ProductView({ product, relatedProducts }) {
  const [activeImage, setActiveImage] = useState(
    product.images?.[0] || "/placeholder.png"
  );
  const [zoomStyle, setZoomStyle] = useState({});
  const [activeTab, setActiveTab] = useState("description");
  const [animate, setAnimate] = useState(false);

  const addToCart = useCartStore((state) => state.addToCart);

  const wishlistItems = useWishlistStore((state) => state.items);
  const addToWishlist = useWishlistStore((state) => state.addToWishlist);
  const removeFromWishlist = useWishlistStore(
    (state) => state.removeFromWishlist
  );

  const isWishlisted = wishlistItems?.some(
    (item) => item._id === product._id
  );

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();

    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(2)",
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ transform: "scale(1)" });
  };

  return (
    <div className="bg-white px-4 sm:px-6 md:px-10 lg:px-20 py-6 md:py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        
        {/* LEFT */}
        <div>
          <p className="text-gray-600 mb-3 text-xs sm:text-sm">
            Home /{" "}
            <span className="capitalize">
              {product.category?.name}
            </span>{" "}
            /{" "}
            <span className="text-red-500 capitalize">
              {product.name}
            </span>
          </p>

          {/* MAIN IMAGE */}
          <div
            className="rounded-xl overflow-hidden bg-white shadow border"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <Image
              src={activeImage || "/placeholder.png"}
              width={500}
              height={500}
              priority
              className="w-full h-[300px] sm:h-[350px] md:h-[400px] object-contain transition-transform duration-300"
              style={zoomStyle}
              alt={product.name}
            />
          </div>

          {/* THUMBNAILS */}
          <Swiper
            spaceBetween={10}
            slidesPerView={4}
            className="mt-4"
          >
            {product.images?.map((img, i) => (
              <SwiperSlide key={i}>
                <div
                  onClick={() => setActiveImage(img)}
                  className={`border rounded-lg cursor-pointer ${
                    activeImage === img
                      ? "border-black scale-105"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    src={img}
                    className="w-full h-16 sm:h-20 object-contain"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* RIGHT */}
        <div>
          <p className="text-xs text-gray-500 uppercase">
            {product.category?.name}
          </p>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold mt-2">
            {product.name}
          </h1>

          <div className="mt-3 text-yellow-500 text-sm sm:text-base">
            ⭐⭐⭐⭐☆
          </div>

          {/* PRICE */}
          <div className="mt-4 flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="text-xl sm:text-2xl font-bold">
              ₹{product.price}
            </span>

            {product.oldPrice > 0 && (
              <>
                <span className="line-through text-gray-400 text-sm">
                  ₹{product.oldPrice}
                </span>

                <span className="text-red-500 text-xs sm:text-sm">
                  {Math.round(
                    ((product.oldPrice - product.price) /
                      product.oldPrice) *
                      100
                  )}
                  % OFF
                </span>
              </>
            )}
          </div>

          {/* STOCK */}
          <p className="mt-2 text-sm">
            {product.stock ? (
              <span className="text-green-600">In Stock</span>
            ) : (
              <span className="text-red-500">Out of Stock</span>
            )}
          </p>

          {/* DESCRIPTION */}
          <p className="mt-4 text-gray-700 text-sm sm:text-base">
            {product.description}
          </p>

          {/* FEATURES */}
          <ul className="mt-4 space-y-2 text-xs sm:text-sm">
            {product.features?.map((f, i) => (
              <li key={i}>• {f}</li>
            ))}
          </ul>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6">
            <button
              onClick={() => {
                addToCart(product, 1);
                toast.success("Added to cart");
              }}
              className="flex-1 bg-black text-white py-2 rounded-lg text-sm sm:text-base"
            >
              Add to Cart
            </button>

            <button
              onClick={() => {
                setAnimate(true);
                setTimeout(() => setAnimate(false), 300);

                isWishlisted
                  ? removeFromWishlist(product._id)
                  : addToWishlist(product);
              }}
              className="border px-4 py-2 rounded-lg flex items-center justify-center gap-2 text-sm"
            >
              <Heart
                size={18}
                className={
                  isWishlisted
                    ? "fill-red-500 text-red-500"
                    : ""
                }
              />
              {isWishlisted ? "Wishlisted" : "Wishlist"}
            </button>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="mt-10 md:mt-12 max-w-4xl">
        <div className="flex gap-4 sm:gap-6 border-b mb-4 overflow-x-auto">
          {["description", "specifications", "reviews"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 whitespace-nowrap text-sm sm:text-base ${
                activeTab === tab
                  ? "border-b-2 border-red-500"
                  : ""
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "description" && (
          <div
            className="text-sm sm:text-base"
            dangerouslySetInnerHTML={{
              __html:
                product.longdescription ||
                "No description available",
            }}
          />
        )}

        {activeTab === "specifications" && (
          <div className="text-sm sm:text-base">
            {product.specifications?.length ? (
              product.specifications.map((s, i) => (
                <div
                  key={i}
                  className="flex justify-between py-2"
                >
                  <span>{s.key}</span>
                  <span>{s.value}</span>
                </div>
              ))
            ) : (
              <p>No specifications</p>
            )}
          </div>
        )}
      </div>

      {/* RELATED PRODUCTS */}
      <div className="mt-10 md:mt-12">
        <h2 className="text-xl sm:text-2xl font-semibold mb-6">
          Related Products
        </h2>

        {!relatedProducts ? (
          <div className="flex gap-4 overflow-hidden">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-40 sm:w-52 md:w-60 h-64 sm:h-72 bg-gray-100 animate-pulse rounded-xl"
              />
            ))}
          </div>
        ) : relatedProducts.length ? (
          <Swiper
            spaceBetween={16}
            breakpoints={{
              320: { slidesPerView: 2 },
              480: { slidesPerView: 2 },
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
          >
            {relatedProducts.map((item) => (
              <SwiperSlide key={item._id}>
                <Link
                  href={`/product/${item.slug}`}
                  className="border rounded-xl p-3 block hover:shadow-md"
                >
                  <Image
                    src={item.images?.[0] || "/placeholder.png"}
                    width={300}
                    height={300}
                    className="w-full h-40 sm:h-44 md:h-52 object-contain"
                    alt={item.name}
                  />

                  <h3 className="mt-2 text-xs sm:text-sm line-clamp-2">
                    {item.name}
                  </h3>

                  <p className="font-semibold mt-1 text-sm">
                    ₹{item.price}
                  </p>
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