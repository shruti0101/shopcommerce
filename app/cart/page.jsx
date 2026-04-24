"use client";

import { useCartStore } from "@/store/cartStore";
import Link from "next/link";

export default function CartPage() {
  const cart = useCartStore((state) => state.cart);
  const removeItem = useCartStore((state) => state.removeFromCart);
  const addItem = useCartStore((state) => state.addToCart);
  const clearCart = useCartStore((state) => state.clearCart);
const updateQty = useCartStore((state) => state.updateQty);
  // ✅ Total
  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      <h1 className="text-3xl font-semibold mb-8">Shopping Cart</h1>

      {/* EMPTY CART */}
      {cart.length === 0 && (
        <div className="text-center py-20">
          <p className="mb-4 text-gray-500">Your cart is empty</p>

          <Link href="/">
            <button className="bg-black text-white px-6 py-3 rounded">
              Continue Shopping
            </button>
          </Link>
        </div>
      )}

      {/* CART ITEMS */}
      {cart.length > 0 && (
        <div className="grid md:grid-cols-2 gap-10">

          {/* LEFT */}
          <div>
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex gap-4 items-center border-b py-4"
              >
                <img
                  src={item.images?.[0]}
                  className="w-20 h-20 object-cover rounded"
                />

                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>

                  <p className="text-sm text-gray-500">
                    ₹{item.price}
                  </p>

                  {/* QUANTITY */}
                  <div className="flex items-center gap-3 mt-2">
                  <button
  onClick={() =>
    item.quantity > 1
      ? updateQty(item._id, item.quantity - 1)
      : removeItem(item._id)
  }
  className="px-2 border"
>
  -
</button>
<span>{item.quantity}</span>
<button
  onClick={() =>
    updateQty(item._id, item.quantity + 1)
  }
  className="px-2 border"
>
  +
</button>
                  </div>
                </div>

                {/* PRICE */}
                <p className="font-semibold">
                  ₹{item.price * item.quantity}
                </p>

                {/* REMOVE */}
                <button
                  onClick={() => removeItem(item._id)}
                  className="text-red-500 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* RIGHT (SUMMARY) */}
          <div className="bg-gray-50 p-6 rounded-xl h-fit">

            <h2 className="text-xl font-semibold mb-4">
              Cart Summary
            </h2>

            <div className="flex justify-between mb-3">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>

            <div className="flex justify-between mb-3">
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
              <button className="w-full mt-6 bg-[#129c97] text-white py-3 rounded-lg font-semibold hover:bg-[#0f7f7a] transition">
                Proceed to Checkout
              </button>
            </Link>

            {/* CLEAR */}
            <button
              onClick={clearCart}
              className="w-full mt-3 text-red-500"
            >
              Clear Cart
            </button>

          </div>
        </div>
      )}
    </div>
  );
}