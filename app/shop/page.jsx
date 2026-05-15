"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
const Shop = () => {

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

    <section className="min-h-screen bg-[#f8f5f0] py-16 px-4 md:px-10">

      {/* Heading */}
      <div className="text-center mb-14">

        <p className="uppercase tracking-[6px] text-sm text-[#9b7b58] font-medium">
          Premium Collection
        </p>

        <h1 className="text-4xl md:text-6xl font-bold text-[#1c1c1c] mt-3">
          Luxury Products
        </h1>

        <div className="w-24 h-[2px] bg-[#c8a97e] mx-auto mt-5"></div>

      </div>

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

      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10">

        {products.map((product) => (

          <div
            key={product._id}
            className="group bg-white rounded-[28px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100"
          >

            {/* Image */}
            <div className="relative overflow-hidden">

              <Image
                src={
                  product.images?.[0] ||
                  "/placeholder.png"
                }
                alt={product.name}
                width={600}
                height={500}
                className="w-full h-[380px] object-cover group-hover:scale-110 transition-transform duration-700"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition duration-500"></div>

        
            </div>

            {/* Content */}
            <div className="p-6">

              <h2 className="text-2xl font-semibold text-[#1f1f1f] line-clamp-1">
                {product.name}
              </h2>

       

              {/* Price */}
              <div className="flex items-center gap-3 mt-3">

                <p className="text-3xl font-bold text-[#111]">
                  ₹{product.price}
                </p>

                {product.oldPrice > 0 && (
                  <span className="text-gray-400 line-through text-sm">
                    ₹{product.oldPrice}
                  </span>
                )}

              </div>

              {/* Button */}




              <Link href={`/product/${product.slug}`}>
              
              <button className="w-full mt-5 bg-[#111] hover:bg-[#9b7b58] text-white py-3 rounded-full font-medium tracking-wide transition-all duration-300 cursor-pointer">
                View Product
</button>
               
              </Link>



            </div>

          </div>

        ))}

      </div>

    </section>

  );

};

export default Shop;