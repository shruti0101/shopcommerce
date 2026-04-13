"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function ProductView({ product }) {
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

  return (
    <div className="bg-white px-20 py-8">

      {/* ================= MAIN SECTION ================= */}
  <div className=" grid md:grid-cols-2 gap-16 ">

  {/* LEFT SIDE */}
  <div>

    <p className="text-gray-800 my-3 mb-3">Home / <span className="capitalize">{product.category.name}</span>  / <span className="text-red-500 capitalize">{product.name} </span> </p>

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
      <div className="text-yellow-500 text-sm">
        ⭐⭐⭐⭐☆
      </div>
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
              ((product.oldPrice - product.price) / product.oldPrice) * 100
            )}% OFF
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
    <p className="mt-5 text-gray-600 text-sm leading-relaxed">
      {product.description}
    </p>

    {/* FEATURES */}
    <ul className="mt-5 space-y-2 text-sm text-gray-700">
      {product.features?.map((f, i) => (
        <li key={i} className="flex items-start gap-2">
          <span className="text-black mt-[2px]">•</span>
          {f}
        </li>
      ))}
    </ul>

    {/* BUTTONS */}
    <div className="flex gap-4 mt-8">

      <button className="flex-1 bg-black text-white py-3 rounded-xl text-md font-medium hover:bg-gray-800 transition">
        Add to Cart
      </button>

       <button className="flex-1 bg-black text-white py-3 rounded-xl text-md font-medium hover:bg-gray-800 transition">
        Add to Wishlist ♡
      </button>
    </div>

    {/* EXTRA TRUST BADGES */}
    <div className="flex gap-6 mt-6 text-xs text-gray-500">
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
            className="text-sm text-gray-700 leading-relaxed"
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

                    <span className="text-gray-800">
                      {spec.value}
                    </span>
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
    </div>
  );
}