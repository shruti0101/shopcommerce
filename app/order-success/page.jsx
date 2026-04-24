"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { useEffect } from "react";

export default function OrderSuccessPage() {
  useEffect(() => {
    // Optional: clear cart after success
    localStorage.removeItem("cart-storage");
  }, []);

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-lg w-full text-center">

        {/* ICON */}
        <div className="flex justify-center mb-4">
          <CheckCircle className="text-green-500 w-16 h-16" />
        </div>

        {/* TITLE */}
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">
          Order Placed Successfully 🎉
        </h1>

        {/* SUBTEXT */}
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been placed and will be processed soon.
        </p>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col gap-3">

          <Link href="/orders">
            <button className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition">
              View Orders
            </button>
          </Link>

          <Link href="/">
            <button className="w-full border py-3 rounded-lg hover:bg-gray-100 transition">
              Continue Shopping
            </button>
          </Link>

        </div>
      </div>
    </div>
  );
}