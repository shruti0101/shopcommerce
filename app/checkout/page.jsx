"use client";

import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const router = useRouter();

  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    pincode: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login first");
      router.push("/login?redirect=/checkout");
      return;
    }

    if (cart.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    if (!form.name || !form.phone || !form.address || !form.pincode || !form.email ) {
      toast.error("Please fill required details");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/orders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          items: cart.map((item) => ({
            productId: item._id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.images?.[0],
          })),
          totalAmount: total,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.msg || "Order failed");
        return;
      }

      toast.success("Order placed successfully ✅");
      clearCart();
      router.push("/order-success");

    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] py-10 px-4">

      <div className="max-w-7xl mx-auto">

        {/* TITLE */}
        <h1 className="text-4xl font-bold mb-10 tracking-tight">
          Checkout
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* ================= LEFT ================= */}
          <div className="lg:col-span-2 space-y-6">

            {/* CUSTOMER CARD */}
            <div className="bg-white/80 backdrop-blur-lg border border-gray-200 rounded-3xl p-6 shadow-xl">

              <h2 className="text-xl font-semibold mb-6">
                Customer Details
              </h2>

              <div className="grid gap-5">

                {[
                  { name: "name", label: "Full Name" },
                  { name: "phone", label: "Phone Number" },
                  { name: "email", label: "Email Address" },
                  { name: "pincode", label: "Pincode" },
                ].map((field) => (
                  <div key={field.name} className="relative">
                    <input
                      name={field.name}
                      onChange={handleChange}
                      placeholder=" "
                      required
                      className="peer w-full border rounded-xl px-4 pt-5 pb-2 bg-white outline-none focus:border-black"
                    />
                    <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all
                      peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base
                      peer-focus:top-2 peer-focus:text-sm">
                      {field.label}
                    </label>
                  </div>
                ))}

                <div className="relative">
                  <textarea
                    name="address"
                    onChange={handleChange}
                    placeholder=" "
                    rows={3}
                    className="peer w-full border rounded-xl px-4 pt-5 pb-2 bg-white outline-none focus:border-black"
                  />
                  <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all
                    peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base
                    peer-focus:top-2 peer-focus:text-sm">
                    Address
                  </label>
                </div>

              </div>
            </div>

            {/* CART ITEMS */}
            <div className="bg-white/80 backdrop-blur-lg border rounded-3xl p-6 shadow-xl">

              <h3 className="text-lg font-semibold mb-4">
                Your Items
              </h3>

              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition"
                  >
                    <img
                      src={item.images?.[0] || "/placeholder.png"}
                      className="w-16 h-16 rounded-lg object-cover border"
                    />

                    <div className="flex-1">
                      <p className="font-medium text-sm">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        ₹{item.price} × {item.quantity}
                      </p>
                    </div>

                    <p className="font-semibold">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* ================= RIGHT ================= */}
          <div className="sticky top-20 h-fit">

            <div className="bg-white border rounded-3xl p-6 shadow-2xl">

              <h2 className="text-xl font-semibold mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm">

                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span>₹{total}</span>
                </div>

                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-₹0</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Delivery</span>
                  <span>Free</span>
                </div>

              </div>

              <div className="border-t my-5" />

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>₹{total}</span>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={loading}
                className="w-full mt-6 py-3 rounded-xl text-white font-semibold
                bg-gradient-to-r from-black to-gray-800 hover:opacity-90 transition shadow-lg"
              >
                {loading ? "Processing..." : "Place Order"}
              </button>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}