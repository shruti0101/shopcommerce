"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import Iconslider  from "@/Component/Landingpage/Iconslider";
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

  const [selectedColor, setSelectedColor] = useState("");

  const addToCart = useCartStore((state) => state.addToCart);

  const slides = [
    { image: "/banner/banner-1.png" },
    { image: "/banner/banner-2.png", },
     { image: "/banner/banner5.png" },
        { image:   "/banner/banner6.png", },
        {image: "/banner4.webp"}
  ];




  useEffect(() => {
    if (!slug) return;

    setLoading(true);

  fetch(`/api/product?category=${slug}&sort=${sort}`)
  .then(async (res) => {

    const data = await res.json();

    console.log("API DATA:", data);

    setProducts(data || []);

  })
  .catch((err) => {

    console.log("FETCH ERROR:", err);

    setProducts([]);

  })
  .finally(() => {

    setLoading(false);

  });
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
                <div className="">
                  <Image
                    src={s.image}
                    className="max-w-full h-[25vh] md:h-[60vh] "
                    width={2000}
                    height={1500}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* <Catslider /> */}



      {/* PRODUCTS */}
      <div className="px-4 sm:px-6 md:px-10 lg:px-18 mt-6 sm:mt-8">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
          <h2 className="text-lg sm:text-xl md:text-5xl my-4 font-semibold capitalize">
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
    href={`/product/${p.slug}?category=${slug}`}
    key={p._id}
    className="group block"
  >

    {/* PREMIUM CARD */}
    <div className="relative overflow-hidden rounded-[24px] border border-white/20 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.14)]">

      {/* GLOW EFFECT */}
      <div className="absolute -top-24 -right-24 h-40 w-40 rounded-full bg-yellow-200/30 blur-3xl opacity-0 group-hover:opacity-100 transition duration-700 z-0" />

      {/* IMAGE */}
      <div className="relative overflow-hidden rounded-[20px] m-2 sm:m-3">

{/* MOBILE QUICK ADD TO CART */}
<button
  onClick={(e) => {
    e.preventDefault();

    if (p?.sizes?.length > 0) {
      setSelectedProduct(p);
      setSelectedSize("");
      setSizeModal(true);
      return;
    }

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
  className="
    md:hidden
    absolute
    bottom-3
    right-1
    z-20
    h-11
    w-11
    rounded-full
    bg-black
    text-white
    shadow-lg
    flex
    items-center
    justify-center
    active:scale-95
  "
>
  <ShoppingCart className="animate-cart-move" size={18} />
</button>
        {/* IMAGE */}
        <Image
          src={p.images?.[0] || "/placeholder.png"}
          width={1500}
          height={1500}
          alt={p.name}
          className="w-full h-[180px] sm:h-[220px] md:h-[260px] lg:h-[350px] object-contain transition duration-700 group-hover:scale-110"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

        {/* TOP ACTIONS */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between z-20">

          {/* DISCOUNT */}
          {p.oldPrice > 0 && (
            <span className="bg-black/80 backdrop-blur-xl text-white text-[10px] sm:text-xs px-3 py-1.5 rounded-full font-semibold tracking-wide shadow-xl">
              {Math.round(
                ((p.oldPrice - p.price) / p.oldPrice) * 100
              )}
              % OFF
            </span>
          )}

       

        </div>




        {/* FLOATING ADD TO CART */}
        <div className="absolute bottom-4 left-4 right-4 translate-y-24 group-hover:translate-y-0 transition-all duration-500 z-20">










          <button
            onClick={(e) => {

              e.preventDefault();

              // HAS SIZES
              if (p?.sizes?.length > 0) {

                setSelectedProduct(p);

                setSelectedSize("");

                setSizeModal(true);

                return;
              }

              // NORMAL PRODUCT
              addToCart({
                _id: p._id,
                name: p.name,
                slug: p.slug,
                price: p.price,
                oldPrice: p.oldPrice,
                images: p.images,
                 selectedColor,
                quantity: 1,
              });

              toast.success("Added to cart 🛒");
            }}
            className="w-full rounded-2xl bg-white/95 backdrop-blur-2xl py-3.5 text-sm font-semibold text-black shadow-[0_8px_30px_rgba(0,0,0,0.2)] transition-all duration-300 hover:bg-yellow-400 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
          >

            <ShoppingCart size={17} />

            Add To Cart

          </button>

        </div>

      </div>

      {/* CONTENT */}
      <div className="px-4 sm:px-5 pb-4 sm:pb-5 relative z-10">

        {/* COLLECTION */}
        <div className="flex items-center justify-between">

          <p className="text-[10px] sm:text-xs uppercase tracking-[3px] text-gray-400 font-medium">
            Luxury Drop
          </p>

          <div className="flex items-center gap-[2px] text-yellow-500 text-xs">
            ★★★★★
          </div>

        </div>

        {/* PRODUCT NAME */}
        <h2 className="mt-2 text-xs sm:text-sm md:text-lg font-semibold capitalize text-gray-900 line-clamp-2 leading-snug transition duration-300 group-hover:text-black">
          {p.name}
        </h2>

        {/* PRICE SECTION */}
        <div className="mt-3 flex items-end justify-between">

          <div className="flex items-center gap-2 flex-wrap">

            <span className="text-lg sm:text-xl font-bold text-black tracking-tight">
              ₹{p.price}
            </span>

            {p.oldPrice > 0 && (
              <span className="text-gray-400 line-through text-xs sm:text-sm">
                ₹{p.oldPrice}
              </span>
            )}

          </div>

          {/* STOCK */}
          <span className="text-[11px] text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full">
            In Stock
          </span>

        </div>


      </div>

      {/* BORDER SHINE */}
      <div className="pointer-events-none absolute inset-0 rounded-[24px] border border-white/40 opacity-0 group-hover:opacity-100 transition duration-500" />

    </div>

  </Link>
))}

          </div>
        )}
      </div>


      {/* SIZE MODAL */}


{/* SIZE MODAL */}
{sizeModal && selectedProduct && (

  <div className="fixed top-0 inset-0 z-999 bg-black/60 flex items-center justify-center p-4">

    <div className="bg-white w-full max-w-md rounded-2xl p-3 relative">

      {/* CLOSE */}
      <button
        onClick={() => {

          setSizeModal(false);

          setSelectedProduct(null);

          setSelectedSize("");
          setSelectedColor("");

        }}
        className="absolute top-3 right-3"
      >
        ✕
      </button>

      {/* IMAGE */}
      <img
        src={selectedProduct.images?.[0]}
        className="w-full h-44 object-contain rounded-xl"
      />

      {/* NAME */}
      <h2 className="mt-2 text-xl font-semibold">
        {selectedProduct.name}
      </h2>

      {/* SIZE TITLE */}
      <h3 className="mt-3 font-medium">
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

   {/* COLOR TITLE */}
{/* COLOR TITLE */}
{selectedProduct?.colors?.length > 0 && (

  <>
  
    <h3 className="mt-2 font-medium">
      Select Color
    </h3>

    {/* COLORS */}
    <div className="flex flex-wrap gap-3 mt-3">

      {selectedProduct.colors.map((color, i) => (

        <button
          key={i}
          onClick={() =>
            setSelectedColor(color.color)
          }
          className={`
            flex items-center gap-2
            px-4 py-2 rounded-lg border transition
            ${
              selectedColor === color.color
                ? "bg-black text-white border-black"
                : "bg-white text-black hover:border-black"
            }
          `}
        >

          {/* COLOR DOT */}
          <span
            className="w-5 h-5 rounded-full border"
            style={{
              backgroundColor:
                color.code || "#000",
            }}
          />

          {color.color}

        </button>

      ))}

    </div>

  </>

)}

   

      {/* PRICE */}
      {selectedSize && (

        <div className="mt-3">

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

               if (!selectedColor) {  

            toast.error(
              "Please select color first"
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
             selectedColor,

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
        className="w-full mt-3 bg-black hover:bg-gray-900 text-white py-3 rounded-xl transition"
      >
        Add To Cart
      </button>

    </div>

  </div>

)}

  
    </>
  );
}