"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight, Star } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";

export default function CategoryProductSections() {

  const [categories, setCategories] = useState([]);

  const addToCart = useCartStore((state) => state.addToCart);

  // ✅ ONLY THESE CATEGORIES WILL SHOW
  const selectedCategories = [
    "home-&-kitchen-product",
    "corporate-gifts-&-office-products",
    "decorative-product",
    "fitness-&-health",
  ];

  useEffect(() => {

    async function fetchData() {

      try {

        // ✅ FETCH CATEGORIES
        const categoryRes = await fetch("/api/categories");

        const categoryData = await categoryRes.json();

        // ✅ FILTER SELECTED CATEGORIES
        const filteredCategories = categoryData.filter((cat) =>
          selectedCategories.includes(cat.slug)
        );

        // ✅ FETCH ALL PRODUCTS
        const productRes = await fetch("/api/product");

        const allProducts = await productRes.json();

        // ✅ MATCH PRODUCTS CATEGORY-WISE
        const categoriesWithProducts = filteredCategories.map((cat) => {

          const matchedProducts = Array.isArray(allProducts)
            ? allProducts.filter((p) => {

                // ✅ NORMAL CATEGORY OBJECT
                if (p.category?.slug === cat.slug) {
                  return true;
                }

                //  CATEGORY STRING
                if (p.category === cat.slug) {
                  return true;
                }

                //  FALLBACK FOR BROKEN PRODUCTS
                // (category: null)

                const productName =
                  p.name?.toLowerCase() || "";

                // FITNESS & HEALTH
                if (
                  cat.slug === "fitness-&-health" &&
                  (
                    productName.includes("yoga") ||
                    productName.includes("fitness") ||
                    productName.includes("health")
                  )
                ) {
                  return true;
                }

                // HOME & KITCHEN
                if (
                  cat.slug === "home-&-kitchen-product" &&
                  (
                    productName.includes("kitchen") ||
                    productName.includes("home")
                  )
                ) {
                  return true;
                }

                // DECORATIVE
                if (
                  cat.slug === "decorative-product" &&
                  (
                    productName.includes("lamp") ||
                    productName.includes("decor") ||
                    productName.includes("light")
                  )
                ) {
                  return true;
                }

                // CORPORATE
                if (
                  cat.slug === "corporate-gifts-&-office-products" &&
                  (
                    productName.includes("office") ||
                    productName.includes("gift") ||
                    productName.includes("corporate")
                  )
                ) {
                  return true;
                }

                return false;
              })
            : [];

          return {
            ...cat,
            products: matchedProducts,
          };
        });

        setCategories(categoriesWithProducts);

      } catch (err) {

        console.log(err);

        setCategories([]);
      }
    }

    fetchData();

  }, []);

  return (
    <div className="bg-[#faf7f2]">

      {categories.map((category) => (

        <section
          key={category._id}
          className="py-5"
        >

          <div className="mx-auto w-full px-4 md:px-20">

            {/* HEADER */}
            <div className="mb-5 flex items-center justify-between">

              <h2
                className="
                  text-[20px] md:text-[35px]
                 
                  tracking-[-0.5px]
                  text-[#1A1230]
                  capitalize
                  font-bebas tracking-wide
                "
              >
                {category.name}
              </h2>

           <Link
  href={`/category/${category.slug}`}
  className="
    group
    relative
    inline-flex
    flex-col
    items-start
    text-[20px]
    font-semibold
    text-green-700
  "
>

  {/* TEXT + ICON */}
  <div className="flex items-center gap-1">

    <span>
      See All
    </span>

    <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />

  </div>

  {/* SVG */}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 500 150"
    preserveAspectRatio="none"
    aria-hidden="true"
     className="
      absolute
      left-0
      top-1/2
      -translate-y-1/2
      w-[120px]
      h-[38px]
      text-green-500/70
      pointer-events-none
    "
  >
    <path
      d="M325,18C228.7-8.3,118.5,8.3,78,21C22.4,38.4,4.6,54.6,5.6,77.6c1.4,32.4,52.2,54,142.6,63.7 c66.2,7.1,212.2,7.5,273.5-8.3c64.4-16.6,104.3-57.6,33.8-98.2C386.7-4.9,179.4-1.4,126.3,20.7"
      fill="none"
      stroke="currentColor"
      strokeWidth="10"
      strokeLinecap="round"
      className="animate-draw"
    />
  </svg>

</Link>
            </div>

            {/* PRODUCTS */}
            <div
              className="
                flex gap-5
                overflow-x-auto
                scrollbar-hide
                pb-2
              "
            >

              {category.products?.length > 0 ? (

               category.products.slice(0, 6).map((p) => {

                  const discount =
                    p.oldPrice > 0
                      ? p.oldPrice - p.price
                      : 0;

                  return (

                    <div
                      key={p._id}
                      className="
                        min-w-[200px]
                        max-w-[180px]
                        flex-shrink-0
                      "
                    >

                      {/* PRODUCT CARD */}
                      <Link href={`/product/${p.slug}`}>

                        <div
                          className="
                            relative
                            h-[175px]
                            rounded-[12px]
                            border border-[#DADDE3]
                            bg-white
                            overflow-hidden
                            px-4 pt-3
                          "
                        >

                          {/* IMAGE */}
                          <img
                            src={
                              p.images?.[0]?.trim?.()
                                ? p.images[0]
                                : "/placeholder.png"
                            }
                            alt={p.name}
                            className="
                              h-full
                              w-full
                              object-contain
                            "
                          />

                          {/* ADD BUTTON */}
                          <button
                            onClick={(e) => {

                              e.preventDefault();

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
                              absolute
                              bottom-4
                              right-4
                              h-[42px]
                              min-w-[72px]
                              rounded-[14px]
                              border-2
                              border-white
                          
                              px-4
                              text-[16px]
                              font-bold
                              tracking-[0.03em]
                             
                              shadow-[3px_3px_0px_#0033A1]
                              transition
                             bg-black
                             text-white
                             hover:bg-[#1D8F2F]
                             hover:shadow-[5px_5px_0px_#1D8F2F]
                            "
                          >
                            ADD
                          </button>

                        </div>
                      </Link>

                      {/* PRICE */}
                      <div className="mt-2 flex items-center gap-2">

                        <div
                          className="
                            flex h-[38px]
                            items-center
                            rounded-[10px]
                            bg-[#1D8F2F]
                            px-3
                            text-[17px]
                            font-bold
                            text-white
                          "
                        >
                          ₹{p.price}
                        </div>

                        {p.oldPrice > 0 && (
                          <span
                            className="
                              text-[16px]
                              text-[#5E6472]
                              line-through
                            "
                          >
                            ₹{p.oldPrice}
                          </span>
                        )}
                      </div>

                      {/* DISCOUNT */}
                      {discount > 0 && (
                        <p
                          className="
                            mt-1
                            border-b border-dashed border-[#C7CCD4]
                            pb-2
                            text-[13px]
                            font-bold
                            text-[#1D8F2F]
                          "
                        >
                          ₹{discount} OFF
                        </p>
                      )}

                      {/* NAME */}
                      <h3
                        className="
                          mt-3
                          line-clamp-2
                          text-[16px]
                          font-medium
                          leading-[1.45]
                          text-[#1A1A1A]
                        "
                      >
                        {p.name}
                      </h3>

                      {/* RATING */}
                      <div className="mt-2 flex items-center gap-1">

                        <Star
                          className="
                            h-4 w-4
                            fill-[#1D8F2F]
                            text-[#1D8F2F]
                          "
                        />

                        <span className="text-[15px]">
                          {p.rating || "4.5"}
                        </span>

                        <span className="text-[15px] text-[#697586]">
                          ({p.reviewsCount || "1k"})
                        </span>
                      </div>

                    </div>
                  );
                })

              ) : (

                <div className="text-gray-500 text-sm">
                  No products found
                </div>

              )}

            </div>
          </div>
        </section>
      ))}
    </div>
  );
}