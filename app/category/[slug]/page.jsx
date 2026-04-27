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

  // ✅ NEW
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
        setHasMore(data.hasMore); // ✅ backend should send this
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [slug, sort, page]);

  // scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <>
      {/* HERO */}
      <div className="w-full px-4 sm:px-6 mt-4">
        <div className="relative rounded-xl overflow-hidden shadow-lg">
          <Swiper modules={[Navigation, Autoplay]} autoplay={{ delay: 4000 }} loop>
            {slides.map((s, i) => (
              <SwiperSlide key={i}>
                <img src={s.image} className="w-full h-[240px] object-cover" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <Catslider />

      {/* PRODUCTS */}
      <div className="px-4 sm:px-6 md:px-10 lg:px-18 mt-6">

        {/* HEADER */}
        <div className="flex justify-between mb-6">
          <h2 className="text-xl font-semibold capitalize">
            {decodeURIComponent(slug || "").replace(/-/g, " ")}
          </h2>

          <select
            value={sort}
            onChange={(e) => {
              setPage(1); // reset page
              setSort(e.target.value);
            }}
            className="bg-white border px-4 py-2 rounded-full"
          >
            <option value="">Sort By</option>
            <option value="price_low_to_high">Low → High</option>
            <option value="price_high_to_low">High → Low</option>
          </select>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-[250px] bg-gray-200 animate-pulse rounded-xl" />
            ))}
          </div>
        ) : (
          <>
            {/* PRODUCTS GRID */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pb-10">
              {products.map((p) => (
                <Link
                  href={`/product/${p.slug}`}
                  key={p._id}
                  className="bg-white rounded-xl p-3 border shadow-sm hover:shadow-xl transition"
                >
                  <Image
                    src={p.images?.[0] || "/placeholder.png"}
                    width={500}
                    height={500}
                    alt={p.name}
                    className="w-full h-[200px] object-cover rounded-lg"
                  />

                  <h2 className="text-sm mt-2 line-clamp-2">{p.name}</h2>

                  <div className="flex gap-2 mt-1">
                    <span className="font-semibold">₹{p.price}</span>
                    {p.oldPrice > 0 && (
                      <span className="line-through text-gray-400 text-sm">
                        ₹{p.oldPrice}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            {/* ✅ PAGINATION */}
            <div className="flex justify-center items-center gap-4 pb-10">

              {/* PREV */}
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="px-4 py-2 rounded-lg border bg-white disabled:opacity-50"
              >
                Prev
              </button>

              <span className="font-medium">Page {page}</span>

              {/* NEXT */}
              <button
                disabled={!hasMore}
                onClick={() => setPage((p) => p + 1)}
                className="px-4 py-2 rounded-lg border bg-white disabled:opacity-50"
              >
                Next
              </button>

            </div>
          </>
        )}
      </div>
    </>
  );
}