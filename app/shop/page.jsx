"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
const Shop = () => {
  const addToCart = useCartStore((state) => state.addToCart);
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

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

  return (

    <>

    <section className=" bg-gradient-to-br from-yellow-100/ to-yellow-50
            border border-yellow-200 w-full h-[30vh]">


   {/* Heading */}
      <div className="text-center mb-8 md:mb-14">

     

        <h2 className="text-[28px] leading-tight sm:text-4xl md:text-6xl  pt-10 font-bold text-[#1c1c1c] mt-2 sm:mt-3">
          Explore Our Products
        </h2>

        <div className="w-16 sm:w-24 h-[2px] bg-[#c8a97e] mx-auto mt-4 sm:mt-5"></div>

      </div>

    </section>
        <section className="min-h-screen bg-[#f8f5f0] py-6 sm:py-10 md:py-16 px-3 sm:px-5 md:px-10">

   

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-20">

          <div className="w-10 h-10 border-4 border-[#c8a97e] border-t-transparent rounded-full animate-spin"></div>

        </div>
      )}

      {/* Error */}
      {error && (
        <p className="text-center text-red-500">
          {error}
        </p>
      )}

      {/* Empty */}
      {!loading &&
        !error &&
        products.length === 0 && (
          <p className="text-center text-gray-500">
            No products found
          </p>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5 md:gap-8">

        {products.map((product) => (

          <div
            key={product._id}
            className="group bg-white rounded-2xl sm:rounded-[28px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col"
          >

            {/* Image */}
            <div className="relative overflow-hidden bg-white">

              <Image
                src={
                  product.images?.[0] ||
                  "/placeholder.png"
                }
                alt={product.name}
                width={600}
                height={600}
                className="
                  w-full
                  h-[150px]
                  sm:h-[240px]
                  md:h-[300px]
                  xl:h-[360px]
                  object-contain
                  md:object-cover
                  group-hover:scale-105
                  transition-transform
                  duration-700
                "
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition duration-500"></div>

            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-3 sm:p-4 md:p-5">

              {/* Product Name */}
              <h2 className="
                text-[13px]
                sm:text-lg
                md:text-xl
                font-semibold
                text-[#1f1f1f]
                line-clamp-2
                min-h-[38px]
                sm:min-h-[56px]
              ">
                {product.name}
              </h2>

              {/* Price */}
              <div className="flex flex-wrap items-center gap-2  sm:mt-3">

                <p className="text-lg sm:text-2xl font-bold text-[#111]">
                  ₹{product.price}
                </p>

                {product.oldPrice > 0 && (
                  <span className="text-gray-400 line-through text-[11px] sm:text-sm">
                    ₹{product.oldPrice}
                  </span>
                )}

              </div>

              {/* Button */}
          {/* Buttons */}
<div className="
  mt-auto
  pt-2
  md:pt-4
  flex
  flex-col
  sm:flex-row
  gap-2
  w-full
">

  {/* View Product */}
  <Link
    href={`/product/${product.slug}`}
    className="w-full sm:flex-1"
  >

    <button
      className="
        w-full
        h-[32px]
        sm:h-[46px]
        rounded-xl
        bg-black
        hover:bg-[#222]
        active:scale-[0.98]
        transition-all
        duration-300
        text-white
        text-[12px]
        sm:text-sm
        md:text-base
        font-medium
        tracking-wide
        cursor-pointer
      "
    >
      View Product
    </button>

  </Link>

  {/* Add To Cart */}
  <button
    onClick={() => {
      addToCart(product, 1);
      toast.success("Added to cart");
    }}
    className="
      w-full
      sm:flex-1
      h-[32px]
      sm:h-[46px]
      rounded-xl
      bg-red-700
      hover:bg-red-800
      active:scale-[0.98]
      transition-all
      duration-300
      text-white
      text-[12px]
      sm:text-sm
      md:text-base
      font-medium
      tracking-wide
      cursor-pointer
      shadow-md
    "
  >
    Add to Cart
  </button>

</div>

            </div>

          </div>

        ))}

      </div>

    </section>
    
    </>

   





  );

};

export default Shop;