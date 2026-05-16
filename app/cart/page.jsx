"use client";

import { useCartStore } from "@/store/cartStore";
import Link from "next/link";

export default function CartPage() {
  const cart = useCartStore((state) => state.cart);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const updateQty = useCartStore((state) => state.updateQty);

  //  Total
  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 py-8 md:py-10">
      
      <h1 className="text-2xl sm:text-3xl font-semibold mb-8">
        Shopping Cart
      </h1>

      {/* EMPTY CART */}
      {cart.length === 0 && (
        <div className="text-center py-20">
          <p className="mb-4 text-gray-500 text-sm sm:text-base">
            Your cart is empty
          </p>

          <Link href="/">
            <button className="bg-black text-white px-6 py-3 rounded-lg text-sm sm:text-base">
              Continue Shopping
            </button>
          </Link>
        </div>
      )}

      {/* CART ITEMS */}
      {cart.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 xl:gap-16">

          {/* LEFT */}
          <div className="space-y-5">
            {cart.map((item) => (
              <div
                key={item._id}
                className="border rounded-2xl p-4 sm:p-5"
              >
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">

                  {/* IMAGE */}
                  <img
                    src={item.images?.[0]}
                    alt={item.name}
                    className="w-full sm:w-28 h-52 sm:h-28 object-cover rounded-xl"
                  />

                  {/* CONTENT */}
                  <div className="flex-1 flex flex-col justify-between">

                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                        
                        <div>
                          <p className="font-medium text-base sm:text-lg">
                            {item.name}
                          </p>

                          {item.selectedSize && (
                            <p className="text-sm text-gray-600 mt-1 capitalize">
                              Size: {item.selectedSize}
                            </p>
                          )}

                          <p className="text-sm sm:text-base text-gray-500 mt-1">
                            ₹{item.price}
                          </p>
                        </div>

                        {/* TOTAL PRICE */}
                        <p className="font-semibold text-base sm:text-lg">
                          ₹{item.price * item.quantity}
                        </p>
                      </div>
                    </div>

                    {/* BOTTOM */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-5">

                      {/* QUANTITY */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            item.quantity > 1
                              ? updateQty(
                                  item._id,
                                  item.selectedSize,
                                  item.quantity - 1
                                )
                              : removeItem(item._id, item.selectedSize)
                          }
                          className="w-9 h-9 border rounded-lg flex items-center justify-center text-lg"
                        >
                          -
                        </button>

                        <span className="min-w-[20px] text-center">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            updateQty(
                              item._id,
                              item.selectedSize,
                              item.quantity + 1
                            )
                          }
                          className="w-9 h-9 border rounded-lg flex items-center justify-center text-lg"
                        >
                          +
                        </button>
                      </div>

                      {/* REMOVE */}
                      <button
                        onClick={() =>
                          removeItem(item._id, item.selectedSize)
                        }
                        className="text-red-500 text-sm font-medium w-fit"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT (SUMMARY) */}
          <div className="bg-gray-50 p-5 sm:p-6 rounded-2xl h-fit sticky top-24">

            <h2 className="text-xl font-semibold mb-5">
              Cart Summary
            </h2>

            <div className="flex justify-between mb-4 text-sm sm:text-base">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>

            <div className="flex justify-between mb-4 text-sm sm:text-base">
              <span>Shipping</span>
              <span>Free</span>
            </div>

            <hr className="my-4" />

            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            {/* CHECKOUT */}
            <Link href="/checkout">
              <button className="w-full mt-6 bg-[#129c97] text-white py-3 rounded-xl font-semibold hover:bg-[#0f7f7a] transition text-sm sm:text-base">
                Proceed to Checkout
              </button>
            </Link>

            {/* CLEAR */}
            <button
              onClick={clearCart}
              className="w-full mt-3 text-red-500 text-sm sm:text-base"
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}