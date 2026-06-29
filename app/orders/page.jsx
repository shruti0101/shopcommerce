"use client";

import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch("/api/my-orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

   const data = await res.json();

console.log("Orders API:", data);

setOrders(Array.isArray(data) ? data : []);
    };

    fetchOrders();
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-10">
      <h1 className="text-2xl font-semibold mb-6">My Orders</h1>

      {orders.length === 0 && <p>No orders yet</p>}

      {orders.map((order) => (
        <div key={order._id} className="border p-5 mb-5 rounded-lg">

          <p className="text-sm text-gray-500 mb-2">
            Order ID: {order._id}
          </p>


        <div className="flex flex-wrap justify-between items-center mb-4 gap-3">

  <div>
    <p className="font-semibold text-lg">
      Total: ₹{order.totalAmount}
    </p>

    <p className="text-sm text-gray-500">
      {new Date(order.createdAt).toLocaleString()}
    </p>
  </div>

  <div className="flex gap-2">

    <span
      className={`px-3 py-1 rounded-full text-sm font-semibold ${
        order.paymentStatus === "paid"
          ? "bg-green-100 text-green-700"
          : order.paymentStatus === "failed"
          ? "bg-red-100 text-red-700"
          : "bg-yellow-100 text-yellow-700"
      }`}
    >
      {order.paymentStatus === "paid"
        ? "✅ Paid"
        : "❌ Failed"
      }
    </span>

 

  </div>

</div>

{order.transactionId && (
  <p className="text-sm text-gray-600 mb-4">
    <strong>Transaction ID:</strong> {order.transactionId}
  </p>
)}

          {/* ITEMS */}
          {order.items.map((item, i) => (
            <div key={i} className="flex gap-4 items-center mb-2">
              <img src={item.image} className="w-12 h-12 object-cover" />
              <div>
                <p>{item.name}</p>
                <p className="text-sm text-gray-500">
                  {item.quantity} x ₹{item.price}
                </p>
              </div>
            </div>
          ))}

        </div>
      ))}
    </div>
  );
}