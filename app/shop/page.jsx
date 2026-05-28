"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { toast } from "react-hot-toast";
import Iconslider from "@/Component/Landingpage/Iconslider";
const Shop = () => {
  const addToCart = useCartStore((state) => state.addToCart);
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  // for size

  const [sizeModal, setSizeModal] = useState(false);

const [selectedProduct, setSelectedProduct] = useState(null);

const [selectedSize, setSelectedSize] = useState("");
const [selectedColor, setSelectedColor] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/product");

      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await res.json();

      setProducts(data);
    } catch (err) {
      console.log(err);

      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const [selectedCategory, setSelectedCategory] = useState("All");

  // GET UNIQUE CATEGORIES

  const categories = [
    "All",

    ...new Set(
      products.map((product) => product.category?.name?.trim()).filter(Boolean),
    ),
  ];

  // FILTER PRODUCTS

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(
          (product) => product.category?.name === selectedCategory,
        );

  return (
    <>
      <section
        className=" bg-gradient-to-br from-yellow-100/ to-yellow-50
            border border-yellow-200 w-full h-[20vh]"
      >
        {/* Heading */}
        <div className="text-center mb-8 md:mb-14">
          <h2 className="text-[28px] leading-tight sm:text-4xl md:text-6xl   font-bold text-[#1c1c1c] mt-2 sm:mt-3">
            Explore Our Products
          </h2>

          <div className="w-16 sm:w-24 h-[2px] bg-[#c8a97e] mx-auto mt-4 sm:mt-5"></div>
        </div>
      </section>


         <Iconslider />

      <section className="min-h-screen bg-[#f8f5f0] py-6 sm:py-10 md:py-16 px-3 sm:px-7 ">
        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-[#c8a97e] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Error */}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Empty */}
        {!loading && !error && products.length === 0 && (
          <p className="text-center text-gray-500">No products found</p>
        )}

        <div className="flex flex-col lg:flex-row gap-5 md:gap-8">
          {/* Premium Sidebar */}
          <aside className="w-full lg:w-[280px] shrink-0">
            <div
              className="
      bg-white/80
      backdrop-blur-xl
      border
      border-white/40
      shadow-[0_10px_40px_rgba(0,0,0,0.06)]
      rounded-3xl
      p-4
      sm:p-6
      sticky
      top-20
    "
            >
              {/* Heading */}
              <div className="mb-6">
                <p className="text-[11px] uppercase tracking-[4px] text-[#b18b5e] font-medium">
                  Browse
                </p>

                <h3 className="text-2xl font-bold text-[#111] mt-1">
                  Categories
                </h3>
              </div>

              {/* Categories */}
              <div
                className="
        flex
        lg:flex-col
        gap-3
        overflow-x-auto
        lg:overflow-x-hidden
        lg:overflow-y-visible
        scrollbar-hide
        pb-10
      "
              >
                {categories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedCategory(category)}
                    className={`
              relative
              whitespace-nowrap
              rounded-2xl
              px-5
              py-3
              text-sm
              md:text-md
              font-medium
              transition-all
              duration-300
              border

              ${
                selectedCategory === category
                  ? `
                    bg-black
                    text-white
                    border-black
                    shadow-lg
                    scale-[1.02]
                  `
                  : `
                    bg-[#faf8f5]
                    text-[#444]
                    border-[#ece7df]
                    hover:border-black
                    hover:bg-white
                    hover:shadow-md
                  `
              }
            `}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Products */}
          <div className="flex-1">
            <div
              className="
      grid
      grid-cols-2
      md:grid-cols-3
    
      gap-3
      sm:gap-5
  
    "
            >
              {filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="
            group
            relative
            overflow-hidden
            rounded-[22px]
            sm:rounded-[28px]
            bg-white
            border
            border-[#f0ece5]
            hover:border-[#d8c3a5]
            shadow-[0_4px_20px_rgba(0,0,0,0.04)]
            hover:shadow-[0_18px_40px_rgba(0,0,0,0.12)]
            transition-all
            duration-500
            flex
            flex-col
          "
                >
                  {/* Image */}
                  <Link
                    href={`/product/${product.slug}`}
                    className="
              relative
              overflow-hidden
              bg-gradient-to-br
              from-[#faf7f2]
              to-[#f4eee6]
            "
                  >
                    <Image
                      src={product.images?.[0] || "/placeholder.png"}
                      alt={product.name}
                      width={700}
                      height={700}
                      className="
                w-full
                h-[160px]
                sm:h-[240px]
                md:h-[300px]
                xl:h-[340px]
                object-contain
                md:object-cover
                group-hover:scale-105
                transition-transform
                duration-700
              "
                    />

                    {/* Premium Overlay */}
                    <div
                      className="
              absolute
              inset-0
              bg-gradient-to-t
              from-black/10
              to-transparent
              opacity-0
              group-hover:opacity-100
              transition
              duration-500
            "
                    ></div>
                  </Link>

                  {/* Content */}
                  <div
                    className="
            flex
            flex-col
            flex-1
            p-3
            sm:p-4
            md:p-5
          "
                  >
                    {/* Product Name */}
                    <h2
                      className="
              text-[13px]
              sm:text-lg
              md:text-[20px]
              font-semibold
              text-[#111]
              leading-snug
              line-clamp-2
              min-h-[38px]
              sm:min-h-[56px]
            "
                    >
                      {product.name}
                    </h2>

                    {/* Price */}
                    <div
                      className="
              flex
              flex-wrap
              items-center
              gap-2
              mt-2
              sm:mt-3
            "
                    >
                      <p
                        className="
                text-lg
                sm:text-2xl
                font-bold
                text-black
              "
                      >
                        ₹{product.price}
                      </p>

                      {product.oldPrice > 0 && (
                        <>
                          <span
                            className="
                    text-gray-400
                    line-through
                    text-[11px]
                    sm:text-sm
                  "
                          >
                            ₹{product.oldPrice}
                          </span>

                          <span
                            className="
                    text-[10px]
                    sm:text-xs
                    bg-red-100
                    text-red-600
                    px-2
                    py-1
                    rounded-full
                    font-medium
                  "
                          >
                            {Math.round(
                              ((product.oldPrice - product.price) /
                                product.oldPrice) *
                                100,
                            )}
                            % OFF
                          </span>
                        </>
                      )}
                    </div>

                    {/* Buttons */}
                    <div
                      className="
              mt-auto
              pt-3
              sm:pt-5
              flex
              flex-col

              md:flex-row
              gap-2
            "
                    >
                      {/* View Product */}
                      <Link
                        href={`/product/${product.slug}`}
                        className="w-full"
                      >
                        <button
                          className="
                  w-full
                  h-[38px]
                  sm:h-[46px]
                  rounded-xl
                  bg-black
                  hover:bg-[#1f1f1f]
                  active:scale-[0.98]
                  text-white
                  text-[12px]
                  sm:text-sm
                  md:text-base
                  font-medium
                  tracking-wide
                  transition-all
                  duration-300
                  cursor-pointer
                "
                        >
                          View Product
                        </button>
                      </Link>

                      {/* Add To Cart */}
                    {/* Add To Cart */}
<button
  onClick={() => {

    // ✅ PRODUCT HAS SIZES
    if (product?.sizes?.length > 0) {

      setSelectedProduct(product);

      setSelectedSize("");

      setSizeModal(true);

      return;
    }

    // ✅ NORMAL PRODUCT
    addToCart(product, 1);

    toast.success("Added to cart");
  }}
  className="
    w-full
    h-[38px]
    sm:h-[46px]
    rounded-xl
    bg-red-700
    hover:opacity-90
    active:scale-[0.98]
    text-white
    text-[12px]
    sm:text-sm
    md:text-base
    font-medium
    tracking-wide
    shadow-lg
    transition-all
    duration-300
    cursor-pointer
  "
>
  Add to Cart
</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


{/* SIZE MODAL */}
{/* SIZE + COLOR MODAL */}
{sizeModal && selectedProduct && (

  <div className="fixed inset-0 z-[99999] bg-black/60 flex items-center justify-center p-4">

    <div className="bg-white w-full max-w-md rounded-2xl p-5 relative">

      {/* CLOSE */}
      <button
        onClick={() => {

          setSizeModal(false);

          setSelectedProduct(null);

          setSelectedSize("");
          setSelectedColor("");

        }}
        className="absolute top-3 right-3 text-xl"
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
      {selectedProduct?.sizes?.length > 0 && (
        <>
          <h3 className="mt-5 font-medium">
            Select Size
          </h3>

          {/* SIZE BUTTONS */}
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
        </>
      )}

      {/* COLORS */}
      {selectedProduct?.colors?.length > 0 && (

        <>
          <h3 className="mt-5 font-medium">
            Select Color
          </h3>

          <div className="flex flex-wrap gap-3 mt-3">

            {selectedProduct.colors.map((color, i) => (

              <button
                key={i}
                onClick={() =>
                  setSelectedColor(color.color)
                }
                className={`
                  flex items-center gap-2
                  px-4 py-2 rounded-xl border transition
                  ${
                    selectedColor === color.color
                      ? "bg-black text-white border-black"
                      : "bg-white hover:border-black"
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

      {/* SELECTED INFO */}
      <div className="mt-4 flex flex-wrap gap-3">

        {selectedSize && (
          <div className="px-3 py-1 rounded-full bg-gray-100 text-sm">
            Size: <b>{selectedSize}</b>
          </div>
        )}

        {selectedColor && (
          <div className="px-3 py-1 rounded-full bg-gray-100 text-sm flex items-center gap-2">

            <span
              className="w-4 h-4 rounded-full border"
              style={{
                backgroundColor:
                  selectedProduct.colors.find(
                    (c) => c.color === selectedColor
                  )?.code || "#000",
              }}
            />

            Color: <b>{selectedColor}</b>

          </div>
        )}

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

                {/* SALE PRICE */}
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

          // SIZE REQUIRED
          if (
            selectedProduct?.sizes?.length > 0 &&
            !selectedSize
          ) {

            toast.error(
              "Please select size first"
            );

            return;
          }

          // COLOR REQUIRED
          if (
            selectedProduct?.colors?.length > 0 &&
            !selectedColor
          ) {

            toast.error(
              "Please select color first"
            );

            return;
          }

          // SIZE DATA
          const sizeData =
            selectedProduct.sizes?.find(
              (s) => s.size === selectedSize
            );

          // ADD TO CART
          addToCart({

            ...selectedProduct,

            selectedSize,
            selectedColor,

            price:
              sizeData?.price ||
              selectedProduct.price,

            oldPrice:
              sizeData?.oldPrice ||
              selectedProduct.oldPrice,

          }, 1);

          toast.success("Added to cart 🛒");

          // RESET
          setSizeModal(false);

          setSelectedProduct(null);

          setSelectedSize("");
          setSelectedColor("");

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
};

export default Shop;
