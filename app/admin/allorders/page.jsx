"use client";

import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        setOrders(Array.isArray(data) ? data : []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-6 md:p-8 bg-gray-50 min-h-screen">

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          All Orders
        </h1>

        <div className="bg-black text-white px-5 py-3 rounded-2xl">
          Total Orders: {orders.length}
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-40 bg-white rounded-2xl animate-pulse"
            />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 text-center">
          No orders found
        </div>
      ) : (
        <div className="space-y-6">

          {orders.map((order) => (

            <div
              key={order._id}
              className="bg-white rounded-2xl shadow-sm border overflow-hidden"
            >

              {/* ORDER HEADER */}
              <div className="p-5 border-b flex flex-col md:flex-row md:justify-between gap-4">

                <div>
                  <h2 className="font-semibold">
                    Order #{order._id.slice(-6)}
                  </h2>

                  <p className="text-sm text-gray-500">
                    {new Date(
                      order.createdAt
                    ).toLocaleString()}
                  </p>

                  {order.userId && (
              <div className="bg-blue-50 mt-5 border rounded-xl p-4 mb-4">

  <h3 className="font-semibold text-red-600 mb-2">
    Customer Details
  </h3>

  <p>
    <strong>Name:</strong>{" "}
    {order.userId?.name}
  </p>

  <p>
    <strong>Email:</strong>{" "}
    {order.userId?.email}
  </p>

  <p>
    <strong>Phone:</strong>{" "}
    {order.userId?.phone || "N/A"}
  </p>

  <p>
    <strong>Role:</strong>{" "}
    {order.userId?.role}
  </p>

  <p>
    <strong>Joined:</strong>{" "}
    {new Date(
      order.userId?.createdAt
    ).toLocaleDateString()}
  </p>

</div>
                  )}
                </div>

                <div className="text-left md:text-right">

                  <p className="text-2xl font-bold">
                    ₹{order.totalAmount}
                  </p>

                  <span
                    className="
                      inline-block
                      px-3
                      py-1
                      rounded-full
                      text-xs
                      bg-green-100
                      text-green-700
                    "
                  >
                    {order.status}
                  </span>

                </div>

              </div>

              {/* PRODUCTS */}
              <div className="p-5 space-y-4">

                {order.items?.map((item, index) => (

                  <div
                    key={index}
                    className="flex gap-4 border rounded-xl p-3"
                  >

                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-lg object-cover border"
                    />

                    <div className="flex-1">

                      <h3 className="font-semibold">
                        {item.name}
                      </h3>

                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>

                      <p className="text-sm text-gray-500">
                        Price: ₹{item.price}
                      </p>

                      <p className="font-medium">
                        Subtotal: ₹
                        {item.price * item.quantity}
                      </p>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          ))}

        </div>
      )}
    </div>
  );
}