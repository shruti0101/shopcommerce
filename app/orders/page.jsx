"use client";

import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch("/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setOrders(data);
    };

    fetchOrders();
  }, []);

  return (
    <div className="max-w-5xl mx-auto py-10">
      <h1 className="text-2xl font-semibold mb-6">My Orders</h1>

      {orders.length === 0 && <p>No orders yet</p>}

      {orders.map((order) => (
        <div key={order._id} className="border p-5 mb-5 rounded-lg">

          <p className="text-sm text-gray-500 mb-2">
            Order ID: {order._id}
          </p>

          <p className="mb-2">
            Status: <span className="font-medium">{order.status}</span>
          </p>

          <p className="mb-4">
            Total: ₹{order.totalAmount}
          </p>

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