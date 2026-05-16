"use client";
import { useCartStore } from "@/store/cartStore";
import React from "react";
import Link from "next/link";
import { Home, ShoppingBag } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Image from "next/image";
const Stickyfooter = () => {

      const addToCart = useCartStore((state) => state.addToCart);

    const cart = useCartStore((state) => state.cart);

const totalItems = cart.reduce(
  (acc, item) => acc + item.quantity,
  0
);



  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-white py-2 border-t shadow-lg z-50">
      <div className="flex justify-around items-center ">

        <Link href="/" className="flex flex-col items-center text-xs">
          <Home size={30} />
    <span className="mt-1">Home</span>
        </Link>

        <Link href="/shop" className="flex flex-col items-center text-xs">
          <ShoppingBag size={30} />
       <span className="mt-1">Products</span>
        </Link>

 {/* CART */}
{/* CART */}
<div
  onClick={() => useCartStore.getState().openCart()}
  className="flex flex-col items-center text-xs group cursor-pointer"
>

  <div className="relative w-[32px] h-[32px]">

    <Image
      width={32}
      height={32}
      src="/cart.png"
      alt="Cart"
      className="object-contain"
    />

    {totalItems > 0 && (
      <span
        className="
          absolute
          -top-2
          -right-2
          min-w-[18px]
          h-[18px]
          px-1
          rounded-full
          bg-red-600
          text-white
          text-[10px]
          font-bold
          flex
          items-center
          justify-center
          shadow-md
        "
      >
        {totalItems}
      </span>
    )}

  </div>

  <span className="mt-1">
    Cart
  </span>

</div>

     <a
  href="https://wa.me/+918130385561"
  target="_blank"
  rel="noopener noreferrer"
  className="flex flex-col items-center text-xs group"
>
  <div className=" rounded-full shadow-lg group-hover:scale-110 transition">
    <FaWhatsapp className="text-black" size={30} />
  </div>
  <span className="mt-1">WhatsApp Us</span>
</a>

      </div>
    </div>
  );
};

export default Stickyfooter;
