"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft, ChevronRight, ShoppingCart, Heart } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Catslider from "@/Component/Landingpage/Catslider";
import "swiper/css";

import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import toast from "react-hot-toast";

export default function CategoryPage() {
  const { slug } = useParams();

  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState("");

  const addToCart = useCartStore((state) => state.addToCart);
  const wishlist = useWishlistStore((state) => state.wishlist);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);

  const slides = [
    { image: "/catbg1.avif" },
    { image: "/catbg2.avif" },
  ];

  // ⚡ FAST FETCH (no loading block)
  useEffect(() => {
    if (!slug) return;

    fetch(`/api/product?category=${slug}&sort=${sort}`)
      .then((res) => res.json())
      .then((data) => setProducts(data || []))
      .catch(() => setProducts([]));
  }, [slug, sort]);

  return (
    <>
      {/* 🔥 HERO */}
      <div className="w-full px-6 mt-4">
        <div className="relative rounded-2xl overflow-hidden shadow-lg">

          <div className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 w-10 h-10 rounded-full flex items-center justify-center shadow">
            <ChevronLeft />
          </div>

          <div className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 w-10 h-10 rounded-full flex items-center justify-center shadow">
            <ChevronRight />
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
                <div className="h-[300px] md:h-[340px]">
                  <img
                    src={s.image}
                    className="w-full h-full object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <Catslider />

      {/* 🔥 PRODUCTS */}
      <div className=" px-6 md:px-18 mt-8">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold capitalize">
            {decodeURIComponent(slug || "").replace(/-/g, " ")}
          </h2>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-white border px-6 py-2 rounded-full shadow-sm"
          >
            <option value="">Sort By</option>
            <option value="price_low_to_high">Low → High</option>
            <option value="price_high_to_low">High → Low</option>
          </select>
        </div>

        {/* ❌ NO LOADING SCREEN NOW */}

        {!products.length ? (
          <div className="text-center py-10 text-gray-500">
            No products found
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pb-10">

            {products.map((p) => {
              

              return (
                <Link href={`/product/${p.slug}`}
                  key={p._id}
                  className="group relative bg-white rounded-2xl p-3 border shadow-sm hover:shadow-xl transition"
                >

                  {/* IMAGE */}
                  <div className="relative overflow-hidden rounded-xl">

                    <Image
                      src={p.images?.[0] || "/placeholder.png"}
                      width={1500}
                      height={1500}
                      alt={p.name}
                      className="w-full h-[310px] object-cover group-hover:scale-110 transition duration-500"
                    />

                    {/* 🔥 HOVER ADD TO CART */}
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition flex items-center p-3">
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
                        className="w-fit px-12 mx-auto bg-yellow-400 text-black py-3 rounded-lg text-md flex items-center justify-center gap-2"
                      >
                        <ShoppingCart size={16} />
                        Add to Cart
                      </button>
                    </div>

                

                    {/* DISCOUNT */}
                    {p.oldPrice > 0 && (
                      <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">
                        {Math.round(
                          ((p.oldPrice - p.price) / p.oldPrice) * 100
                        )}
                        % OFF
                      </span>
                    )}
                  </div>

                  {/* CONTENT */}
                  <div >
                    <div className="mt-3">
                      <h2 className="text-md font-medium line-clamp-2">
                        {p.name}
                      </h2>

                      <div className="mt-2 flex items-center gap-2">
                        <span className="font-semibold">
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
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}