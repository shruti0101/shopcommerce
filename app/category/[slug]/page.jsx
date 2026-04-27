"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Catslider from "@/Component/Landingpage/Catslider";
import "swiper/css";

import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";

export default function CategoryPage() {
  const { slug } = useParams();

  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(true);

  // ✅ PAGINATION STATE
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const addToCart = useCartStore((state) => state.addToCart);

  const slides = [
    { image: "/catbg1.avif" },
    { image: "/catbg2.avif" },
  ];

  useEffect(() => {
    if (!slug) return;

    setLoading(true);

    fetch(`/api/product?category=${slug}&sort=${sort}&page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);
        setHasMore(data.hasMore);
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [slug, sort, page]);

  // ✅ reset page on category/sort change
  useEffect(() => {
    setPage(1);
  }, [slug, sort]);

  // ✅ scroll top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <>
      {/* HERO */}
      <div className="w-full px-4 sm:px-6 mt-4">
        <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-lg">

          <div className="swiper-button-prev-custom absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow">
            <ChevronLeft size={18} />
          </div>

          <div className="swiper-button-next-custom absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow">
            <ChevronRight size={18} />
          </div>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation={{
              prevEl: ".swiper-button-prev-custom",
              nextEl: ".swiper-button-next-custom",
            }}
            autoplay={{ delay: 4000 }}
            loop
          >
            {slides.map((s, i) => (
              <SwiperSlide key={i}>
                <div className="sm:h-[240px] md:h-[300px] lg:h-[340px]">
                  <img
                    src={s.image}
                    className="max-w-full h-auto md:w-full md:h-full object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <Catslider />

      {/* PRODUCTS */}
      <div className="px-4 sm:px-6 md:px-10 lg:px-18 mt-6 sm:mt-8">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold capitalize">
            {decodeURIComponent(slug || "").replace(/-/g, " ")}
          </h2>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-white border px-4 sm:px-6 py-2 rounded-full shadow-sm text-sm"
          >
            <option value="">Sort By</option>
            <option value="price_low_to_high">Low → High</option>
            <option value="price_high_to_low">High → Low</option>
          </select>
        </div>

        {/* SKELETON */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 pb-10">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="relative overflow-hidden bg-white rounded-xl sm:rounded-2xl p-2 sm:p-3 border shadow-sm">
                <div className="absolute inset-0 animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                <div className="w-full h-[180px] sm:h-[220px] md:h-[260px] lg:h-[310px] bg-gray-200 rounded-lg sm:rounded-xl" />
                <div className="mt-3 space-y-2">
                  <div className="h-3 sm:h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 sm:h-4 bg-gray-200 rounded w-1/2" />
                  <div className="flex gap-2 mt-2">
                    <div className="h-4 w-12 bg-gray-300 rounded" />
                    <div className="h-4 w-10 bg-gray-200 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? null : (
          <>
            {/* PRODUCT GRID */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 pb-6">
              {products.map((p) => (
                <Link
                  href={`/product/${p.slug}`}
                  key={p._id}
                  className="group relative bg-white rounded-xl sm:rounded-2xl p-2 sm:p-3 border shadow-sm hover:shadow-xl transition"
                >
                  <div className="relative overflow-hidden rounded-lg sm:rounded-xl">
                    <Image
                      src={p.images?.[0] || "/placeholder.png"}
                      width={1500}
                      height={1500}
                      alt={p.name}
                      className="w-full h-[180px] sm:h-[220px] md:h-[260px] lg:h-[310px] object-cover group-hover:scale-110 transition duration-500"
                    />

                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition flex items-center p-2 sm:p-3">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart({
                            _id: p._id,
                            name: p.name,
                            price: p.price,
                            images: p.images,
                            quantity: 1,
                          });
                          toast.success("Added to cart 🛒");
                        }}
                        className="w-full sm:w-fit mx-auto px-4 sm:px-8 md:px-12 bg-yellow-400 text-black py-2 sm:py-3 rounded-lg text-xs sm:text-sm md:text-md flex items-center justify-center gap-2"
                      >
                        <ShoppingCart size={14} />
                        Add to Cart
                      </button>
                    </div>

                    {p.oldPrice > 0 && (
                      <span className="absolute top-2 left-2 bg-black text-white text-[10px] sm:text-xs px-2 py-1 rounded">
                        {Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100)}% OFF
                      </span>
                    )}
                  </div>

                  <div className="mt-2 sm:mt-3">
                    <h2 className="text-xs sm:text-sm md:text-md font-medium line-clamp-2">
                      {p.name}
                    </h2>

                    <div className="mt-1 sm:mt-2 flex items-center gap-2">
                      <span className="font-semibold text-sm sm:text-base">
                        ₹{p.price}
                      </span>

                      {p.oldPrice > 0 && (
                        <span className="text-gray-400 line-through text-xs sm:text-sm">
                          ₹{p.oldPrice}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* ✅ PAGINATION (minimal UI, no design break) */}
            <div className="flex justify-center items-center gap-4 pb-10">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="px-4 py-2 border rounded-full text-sm disabled:opacity-40"
              >
                Prev
              </button>

              <span className="text-sm font-medium">Page {page}</span>

              <button
                disabled={!hasMore}
                onClick={() => setPage((p) => p + 1)}
                className="px-4 py-2 border rounded-full text-sm disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>

      {/* SHIMMER */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </>
  );
}