"use client";

import { useEffect, useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "/api/user",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      setUsers(Array.isArray(data) ? data : []);
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Registered Users
      </h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow">

        <table className="w-full">

          <thead>
            <tr className="border-b bg-gray-50">
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">Joined</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-b"
              >
                <td className="p-4">
                  {user.name}
                </td>

                <td className="p-4">
                  {user.email}
                </td>

                <td className="p-4">
                  {user.phone || "-"}
                </td>

                <td className="p-4">
                  {user.role}
                </td>

                <td className="p-4">
                  {new Date(
                    user.createdAt
                  ).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>



<h2 className="font-bold mt-6 text-2xl">Orders Users Placed </h2>

<div className="mt-8 space-y-6">

  {users.map((user) => (

    <div
      key={user._id}
      className="bg-white rounded-2xl shadow border p-5"
    >

      {/* USER INFO */}
      <div className="border-b pb-4 mb-4">

        <h2 className="text-lg font-semibold">
          {user.name}
        </h2>

        <p className="text-sm text-gray-500">
          {user.email}
        </p>

        <p className="text-sm text-gray-500">
          {user.phone || "No phone"}
        </p>

        <div className="flex gap-4 mt-2 text-sm">

          <span>
            Orders:{" "}
            <strong>
              {user.orderCount || 0}
            </strong>
          </span>

          <span>
            Total Spent: ₹
            <strong>
              {user.totalSpent || 0}
            </strong>
          </span>

        </div>

      </div>

      {/* ORDERS */}

      {user.orders?.length > 0 ? (

        <div className="space-y-4">

          {user.orders.map((order) => (

            <div
              key={order._id}
              className="bg-gray-50 rounded-xl p-4"
            >

              {/* ORDER HEADER */}
              <div className="flex justify-between border-b pb-3 mb-3">

                <div>

                  <p className="font-semibold">
                    Order #{order._id.slice(-6)}
                  </p>

                  <p className="text-xs text-gray-500">
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString()}
                  </p>

                </div>

                <div className="text-right">

                  <p className="font-bold">
                    ₹{order.totalAmount}
                  </p>

                  <span className="text-xs text-green-600">
                    {order.status}
                  </span>

                </div>

              </div>

              {/* PRODUCTS */}
              <div className="space-y-3">

                {order.items?.map((item, i) => (

                  <div
                    key={i}
                    className="bg-white border rounded-xl p-3 flex gap-4"
                  >

                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg border"
                    />

                    <div className="flex-1">

                      <h4 className="font-semibold">
                        {item.name}
                      </h4>

                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>

                      <p className="text-sm text-gray-500">
                        Price: ₹{item.price}
                      </p>

                      <p className="font-medium">
                        Total: ₹
                        {item.price *
                          item.quantity}
                      </p>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          ))}

        </div>

      ) : (

        <p className="text-gray-500 text-sm">
          No orders found
        </p>

      )}

    </div>

  ))}

</div>





    </div>
  );
}