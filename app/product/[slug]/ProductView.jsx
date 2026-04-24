"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Link from "next/link";
import { Heart } from "lucide-react";
import {toast} from "react-hot-toast";

import { useCartStore } from "@/store/cartStore"; 
import { useWishlistStore } from "@/store/wishlistStore";

export default function ProductView({ product, relatedProducts = [] }) {
  const [activeImage, setActiveImage] = useState(product.images?.[0]);
  const [zoomStyle, setZoomStyle] = useState({});
  const [activeTab, setActiveTab] = useState("description");

  // 🔥 ZOOM FUNCTION
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();

    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(2)",
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transform: "scale(1)",
    });
  };


  const [animate, setAnimate] = useState(false);


const addToCart = useCartStore((state) => state.addToCart);

const addToWishlist = useWishlistStore((state) => state.addToWishlist);
const isInWishlist = useWishlistStore((state) => state.isInWishlist);
const removeFromWishlist = useWishlistStore(
  (state) => state.removeFromWishlist
);

  return (
    <div className="bg-white px-20 py-8">
    
      <div className=" grid md:grid-cols-2 gap-16 ">
        {/* LEFT SIDE */}
        <div>
          <p className="text-gray-800 my-3 mb-3">
            Home / <span className="capitalize">{product.category.name}</span> /{" "}
            <span className="text-red-500 capitalize">
              {product.name}{" "}
            </span>{" "}
          </p>

          {/* MAIN IMAGE */}
          <div
            className="rounded-xl overflow-hidden bg-white shadow-lg border border-gray-100"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <Image
              src={activeImage}
              width={400}
              height={300}
              className="w-full h-[450px] object-contain transition-transform duration-300"
              style={zoomStyle}
              alt=""
            />
          </div>

          {/* THUMBNAILS */}
          <Swiper spaceBetween={12} slidesPerView={4} className="mt-5">
            {product.images.map((img, i) => (
              <SwiperSlide key={i}>
                <div
                  onClick={() => setActiveImage(img)}
                  className={`rounded-lg overflow-hidden cursor-pointer border transition-all duration-200 ${
                    activeImage === img
                      ? "border-gray-200  scale-105"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <img
                    src={img}
                    className="w-full h-20 object-contain"
                    title={product.name}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col mt-16">
          {/* CATEGORY */}
          <p className="text-xs uppercase tracking-wider text-gray-600">
            {product.category?.name}
          </p>

          {/* TITLE */}
          <h1 className="text-4xl font-semibold mt-2 leading-tight text-gray-900">
            {product.name}
          </h1>

          {/* RATING */}
          <div className="flex items-center gap-2 mt-3">
            <div className="text-yellow-500 text-sm">⭐⭐⭐⭐☆</div>
            <span className="text-gray-400 text-sm">
              ({product.reviewsCount} reviews)
            </span>
          </div>

          {/* PRICE SECTION */}
          <div className="mt-5 flex items-center gap-4">
            <span className="text-3xl font-bold text-black">
              ₹{product.price}
            </span>

            {product.oldPrice > 0 && (
              <>
                <span className="text-lg text-gray-400 line-through">
                  ₹{product.oldPrice}
                </span>

                <span className="bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded">
                  {Math.round(
                    ((product.oldPrice - product.price) / product.oldPrice) *
                      100,
                  )}
                  % OFF
                </span>
              </>
            )}
          </div>

          {/* STOCK */}
          <p className="mt-3 text-sm">
            <span className="text-gray-500">Availability: </span>
            <span
              className={`font-medium ${
                product.stock ? "text-green-600" : "text-red-500"
              }`}
            >
              {product.stock ? "In Stock" : "Out of Stock"}
            </span>
          </p>

          {/* SHORT DESCRIPTION */}
          <p className="mt-5 text-black text-md leading-relaxed">
            {product.description}
          </p>

          {/* FEATURES */}
          <ul className="mt-5 space-y-2 text-sm text-gray-800">
            {product.features?.map((f, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-black mt-[2px]">•</span>
                {f}
              </li>
            ))}
          </ul>

          {/* BUTTONS */}
       <div className="flex gap-4 mt-8">
  {/* ADD TO CART */}
  <button
    onClick={() => addToCart(product, 1)}
    className="flex-1 bg-black cursor-pointer text-white py-2 rounded-xl text-lg font-medium hover:bg-gray-800 transition"
  >
    Add to Cart
  </button>

  {/* WISHLIST */}
<button
  onClick={() => {
    setAnimate(true);
    setTimeout(() => setAnimate(false), 300);

    isInWishlist(product._id)
      ? removeFromWishlist(product._id)
      : addToWishlist(product);
  }}
  className={`h-12 px-4 border cursor-pointer border-gray-500 rounded-xl flex items-center gap-2 transition ${
    animate ? "heart-pop" : ""
  }`}
>
  <Heart
    size={18}
    className={`transition-all duration-300 ${
      isInWishlist(product._id)
        ? "fill-red-500 text-red-500 scale-110"
        : "text-black"
    }`}
  />

  {/* TEXT */}
  <span className="text-sm font-medium">
    {isInWishlist(product._id) ? "Wishlisted" : "Add to Wishlist"}
  </span>
</button>
</div>

          {/* EXTRA TRUST BADGES */}
          <div className="flex gap-6 mt-6 text-sm text-gray-500">
            <span>✔ Secure Payment</span>
            <span>🚚 Fast Delivery</span>
            <span>🔁 Easy Returns</span>
          </div>
        </div>
      </div>

      {/* ================= TABS SECTION ================= */}
      <div className=" pb-10 mt-15 max-w-5xl">
        {/* TAB HEADERS */}
        <div className="flex border-b mb-6 gap-6">
          {["description", "specifications", "reviews"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 capitalize text-lg font-medium ${
                activeTab === tab
                  ? "border-b-2 border-red-600 text-red-600"
                  : "text-black"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ================= TAB CONTENT ================= */}

        {/* DESCRIPTION */}
        {activeTab === "description" && (
          <div
            className="text-md text-black leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: product.longdescription || "No description available",
            }}
          />
        )}

        {/* SPECS */}
        {activeTab === "specifications" && (
          <div className="text-sm text-gray-700">
            {product.specifications?.length ? (
              <div className="border rounded-lg overflow-hidden">
                {product.specifications.map((spec, i) => (
                  <div
                    key={i}
                    className="flex justify-between border-b px-4 py-2"
                  >
                    <span className="font-medium text-gray-600">
                      {spec.key}
                    </span>

                    <span className="text-gray-800">{spec.value}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p>No specifications available</p>
            )}
          </div>
        )}

        {/* REVIEWS */}
        {activeTab === "reviews" && (
          <div className="text-sm text-gray-700">
            <p> ⭐⭐⭐⭐☆</p>
          </div>
        )}
      </div>

      <hr />

      {/* ================= RELATED PRODUCTS ================= */}
      <div className="mt-10">
        <h2 className="text-2xl md:text-4xl font-semibold mb-6 text-gray-900">
          Related Products
        </h2>

        {relatedProducts.length ? (
          <Swiper
            spaceBetween={20}
            breakpoints={{
              320: { slidesPerView: 1.2 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
          >
            {relatedProducts.map((item) => (
              <SwiperSlide key={item._id}>
                <Link href={`/product/${item.slug}`}
                  className="bg-white border rounded-xl p-3 shadow-sm hover:shadow-md transition">
                  {/* IMAGE */}
                  <div className="bg-gray-50 rounded-lg overflow-hidden">
                    <Image
                      src={item.images?.[0]}
                      width={300}
                      height={300}
                      className="w-full h-52 object-contain"
                      alt={item.name}
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="mt-3">
                    <p className="text-xs text-gray-500 uppercase">
                      {item.category?.name}
                    </p>

                    <h3 className="text-md font-medium mt-1 line-clamp-2">
                      {item.name}
                    </h3>

                    {/* PRICE */}
                    <div className="flex items-center gap-2 mt-2">
                      <span className="font-semibold text-black">
                        ₹{item.price}
                      </span>

                      {item.oldPrice > 0 && (
                        <span className="text-gray-400 line-through text-sm">
                          ₹{item.oldPrice}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-gray-500">No related products found</p>
        )}
      </div>
    </div>
  );
}
