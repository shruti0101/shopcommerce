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

  // for sizez logic

  const [sizeModal, setSizeModal] = useState(false);

const [selectedProduct, setSelectedProduct] =
  useState(null);

const [selectedSize, setSelectedSize] =
  useState("");

  const addToCart = useCartStore((state) => state.addToCart);

  const slides = [
    { image: "/slider1.png" },
    { image: "/slider-2.png" },
  ];

  useEffect(() => {
    if (!slug) return;

    setLoading(true);

    fetch(`/api/product?category=${slug}&sort=${sort}`)
      .then((res) => res.json())
      .then((data) => setProducts(data || []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [slug, sort]);

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
                <div className="sm:h-[240px] md:h-[300px] lg:h-[350px]">
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

        {/*  SHIMMER SKELETON */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 pb-10">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="relative overflow-hidden bg-white rounded-xl sm:rounded-2xl p-2 sm:p-3 border shadow-sm"
              >
                {/* SHIMMER */}
                <div className="absolute inset-0 animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />

                {/* IMAGE */}
                <div className="w-full h-[180px] sm:h-[220px] md:h-[260px] lg:h-[310px] bg-gray-200 rounded-lg sm:rounded-xl" />

                {/* TEXT */}
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
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 pb-10">

            {products.map((p) => (
              <Link
                href={`/product/${p.slug}`}
                key={p._id}
                className="group relative bg-white rounded-xl sm:rounded-2xl p-2 sm:p-3 border shadow-sm hover:shadow-xl transition"
              >
                {/* IMAGE */}
                <div className="relative overflow-hidden rounded-lg sm:rounded-xl">
                  <Image
                    src={p.images?.[0] || "/placeholder.png"}
                    width={1500}
                    height={1500}
                    alt={p.name}
                    className="w-full h-[180px] sm:h-[220px] md:h-[260px] lg:h-[310px] object-cover group-hover:scale-110 transition duration-500"
                  />

                
               {/* ADD TO CART */}
<div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition flex items-center p-2 sm:p-3">

  <button
    onClick={(e) => {

      e.preventDefault();

      //  HAS SIZES
      if (p?.sizes?.length > 0) {

        setSelectedProduct(p);

        setSelectedSize("");

        setSizeModal(true);

        return;
      }

      //  NORMAL PRODUCT
      addToCart({
        _id: p._id,
        name: p.name,
        slug: p.slug,
        price: p.price,
        oldPrice: p.oldPrice,
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



                  {/* DISCOUNT */}
                  {p.oldPrice > 0 && (
                    <span className="absolute top-2 left-2 bg-black text-white text-[10px] sm:text-xs px-2 py-1 rounded">
                      {Math.round(
                        ((p.oldPrice - p.price) / p.oldPrice) * 100
                      )}
                      % OFF
                    </span>
                  )}
                </div>

                {/* CONTENT */}
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
        )}
      </div>


      {/* SIZE MODAL */}


{/* SIZE MODAL */}
{sizeModal && selectedProduct && (

  <div className="fixed top-0 inset-0 z-99999 bg-black/60 flex items-center justify-center p-4">

    <div className="bg-white w-full max-w-md rounded-2xl p-5 relative">

      {/* CLOSE */}
      <button
        onClick={() => {

          setSizeModal(false);

          setSelectedProduct(null);

          setSelectedSize("");

        }}
        className="absolute top-3 right-3"
      >
        ✕
      </button>

      {/* IMAGE */}
      <img
        src={selectedProduct.images?.[0]}
        className="w-full h-64 object-cover rounded-xl"
      />

      {/* NAME */}
      <h2 className="mt-4 text-xl font-semibold">
        {selectedProduct.name}
      </h2>

      {/* SIZE TITLE */}
      <h3 className="mt-5 font-medium">
        Select Size
      </h3>

      {/* SIZES */}
      <div className="flex flex-wrap gap-3 mt-3">

        {selectedProduct.sizes.map((size, i) => (

          <button
            key={i}
            onClick={() =>
              setSelectedSize(size.size)
            }
            className={`px-5 py-2 rounded-lg border uppercase transition ${
              selectedSize === size.size
                ? "bg-black text-white border-black"
                : "bg-white text-black hover:border-black"
            }`}
          >
            {size.size}
          </button>

        ))}

      </div>

      {/* PRICE */}
      {selectedSize && (

        <div className="mt-5">

          {(() => {

            const sizeData =
              selectedProduct.sizes.find(
                (s) => s.size === selectedSize
              );

            return (

              <div className="flex items-center gap-3 flex-wrap">

                {/* PRICE */}
                <span className="text-2xl font-bold">

                  ₹
                  {
                    sizeData?.price ||
                    selectedProduct.price
                  }

                </span>

                {/* OLD PRICE */}
                {(
                  sizeData?.oldPrice ||
                  selectedProduct.oldPrice
                ) > 0 && (

                  <>

                    <span className="line-through text-gray-400">

                      ₹
                      {
                        sizeData?.oldPrice ||
                        selectedProduct.oldPrice
                      }

                    </span>

                    {/* DISCOUNT */}
                    <span className="text-red-500 text-sm">

                      {Math.round(

                        (
                          (
                            (
                              sizeData?.oldPrice ||
                              selectedProduct.oldPrice
                            ) -

                            (
                              sizeData?.price ||
                              selectedProduct.price
                            )
                          ) /

                          (
                            sizeData?.oldPrice ||
                            selectedProduct.oldPrice
                          )
                        ) * 100

                      )}

                      % OFF

                    </span>

                  </>

                )}

              </div>

            );
          })()}

        </div>

      )}

      {/* ADD BUTTON */}
      <button
        onClick={() => {

          // ✅ SIZE REQUIRED
          if (!selectedSize) {

            toast.error(
              "Please select size first"
            );

            return;
          }

          // ✅ FIND SIZE DATA
          const sizeData =
            selectedProduct.sizes.find(
              (s) => s.size === selectedSize
            );

          // ✅ ADD TO CART
          addToCart({

            _id: selectedProduct._id,

            name: selectedProduct.name,

            slug: selectedProduct.slug,

            images: selectedProduct.images,

            selectedSize,

            price:
              sizeData?.price ||
              selectedProduct.price,

            oldPrice:
              sizeData?.oldPrice ||
              selectedProduct.oldPrice,

            quantity: 1,

          });

          toast.success("Added to cart 🛒");

          // ✅ RESET
          setSizeModal(false);

          setSelectedProduct(null);

          setSelectedSize("");

        }}
        className="w-full mt-6 bg-black hover:bg-gray-900 text-white py-3 rounded-xl transition"
      >
        Add To Cart
      </button>

    </div>

  </div>

)}

  
    </>
  );
}