"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Catslider from "@/Component/Landingpage/Catslider";
import "swiper/css";

export default function CategoryPage() {
  const { slug } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("");

  const slides = [
    {
      title: "RENEWED TECH",
      subtitle: "Premium Quality • Lower Price",
      offer: "Save Up to 60% off",
      image: "/catbg1.avif",
    },
    {
      title: "SMART DEVICES",
      subtitle: "Latest Tech • Best Deals",
      offer: "Up to 50% off",
      image: "/catbg2.avif",
    },
  ];

  useEffect(() => {
    if (!slug) return;

    setLoading(true);

    fetch(`/api/product?category=${slug}&sort=${sort}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, [slug, sort]);

  return (
    <>
      {/* 🔥 HERO BANNER */}
      <div className="w-full px-6 mt-4">
        <div className="relative rounded-2xl overflow-hidden shadow-lg">
          {/* NAV BUTTONS */}
          <div className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur w-10 h-10 rounded-full flex items-center justify-center shadow cursor-pointer">
            <ChevronLeft />
          </div>

          <div className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur w-10 h-10 rounded-full flex items-center justify-center shadow cursor-pointer">
            <ChevronRight />
          </div>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation={{
              prevEl: ".swiper-button-prev-custom",
              nextEl: ".swiper-button-next-custom",
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000 }}
            loop
          >
            {slides.map((slide, i) => (
              <SwiperSlide key={i}>
                <div className="relative h-[300px] md:h-[340px]">
                  {/* IMAGE */}
                  <img
                    src={slide.image}
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* TEXT */}
                  {/* <div className="relative z-10 h-full flex flex-col justify-center px-10 text-white">
                    <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                      {slide.title}
                    </h2>
                    <p className="mt-2 text-sm opacity-90">
                      {slide.subtitle}
                    </p>
                    <span className="mt-3 inline-block bg-white text-black text-xs px-3 py-1 rounded-full w-fit font-medium">
                      {slide.offer}
                    </span>
                  </div> */}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <Catslider />

      {/* 🔥 PRODUCTS SECTION */}
      <div className="px-6 mt-8">
        {/* SORT */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold capitalize">
            {decodeURIComponent(slug || "").replace(/-/g, " ")
              }  
          </h2>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-white border border-gray-200 px-6 py-2 rounded-full text-md shadow-sm focus:outline-none"
          >
            <option value="">Sort By</option>
            <option value="price_low_to_high">Price Low To High</option>
            <option value="price_high_to_low">Price High To Low</option>
          </select>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="text-center py-10 text-gray-500">
            Loading products...
          </div>
        ) : !products.length ? (
          <div className="text-center py-10 text-gray-500">
            No products found
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-10">
            {products.map((p) => (
              <Link href={`/product/${p.slug}`} key={p._id}>
                <div className="group bg-white rounded-2xl p-3 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                  {/* IMAGE */}
                  <div className="relative overflow-hidden rounded-xl">
                    <Image
                      src={p.images?.[0] || "/placeholder.png"}
                      width={300}
                      height={300}
                      className="w-full h-[220px] object-cover group-hover:scale-105 transition duration-300"
                      alt={p.name}
                    />

                    {/* DISCOUNT BADGE */}
                    {p.oldPrice > 0 && (
                      <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">
                        {Math.round(
                          ((p.oldPrice - p.price) / p.oldPrice) * 100,
                        )}
                        % OFF
                      </span>
                    )}
                  </div>

                  {/* CONTENT */}
                  <div className="mt-3">
                    <h2 className="text-sm font-medium text-gray-800 line-clamp-2">
                      {p.name}
                    </h2>

                    {/* PRICE */}
                    <div className="mt-2 flex items-center gap-2">
                      <span className="font-semibold text-black">
                        ₹{p.price}
                      </span>

                      {p.oldPrice > 0 && (
                        <span className="text-gray-400 line-through text-sm">
                          ₹{p.oldPrice}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
