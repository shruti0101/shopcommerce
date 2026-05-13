"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AdminPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  // AUTH CHECK
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || user.role !== "admin") {
      router.push("/login");
    }
  }, []);



  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("Logged out");
    router.push("/");
  };
  

  return (
    <div className="min-h-screen bg-[#F6F7FB] flex">

 

      {/* MAIN */}
      <main className="flex-1 p-6 md:p-10">

        {/* TOP BAR */}
        <div className="flex justify-between items-center mb-8">

          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Welcome Back 👋
            </h2>
            <p className="text-sm text-gray-500">
              Manage your store efficiently
            </p>
          </div>

          <div className="flex gap-3">

            <button className="px-4 py-2 bg-white rounded-xl shadow-sm border">
              🔔 Notifications
            </button>

            <button className="px-4 py-2 bg-black text-white rounded-xl">
              Admin
            </button>

          </div>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

          <div className="bg-white p-5 rounded-2xl shadow-sm border">
            <p className="text-sm text-gray-500">Total Products</p>
            <h3 className="text-2xl font-bold mt-2">128</h3>
          </div>

          {/* <div className="bg-white p-5 rounded-2xl shadow-sm border">
            <p className="text-sm text-gray-500">Orders</p>
            <h3 className="text-2xl font-bold mt-2">{orders.length}</h3>
          </div> */}

          <div className="bg-white p-5 rounded-2xl shadow-sm border">
            <p className="text-sm text-gray-500">Revenue</p>
            <h3 className="text-2xl font-bold mt-2">₹45,320</h3>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border">
            <p className="text-sm text-gray-500">Users</p>
            <h3 className="text-2xl font-bold mt-2">1,240</h3>
          </div>

        </div>

        {/* ORDERS SECTION */}
        {/* <div className="mt-10">

          <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>

          {loading ? (
            <div className="grid gap-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-200 animate-pulse rounded-xl" />
              ))}
            </div>
          ) : orders.length === 0 ? (
            <p className="text-gray-500">No orders found</p>
          ) : (
            <div className="space-y-3">

              {orders.slice(0, 5).map((o) => (
                <div
                  key={o._id}
                  className="bg-white p-4 rounded-xl border flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-medium">
                      {o.customerName || "Customer"}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {o.items?.length || 0} items • {o.status || "Pending"}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold">₹{o.total || 0}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(o.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}

            </div>
          )}

        </div> */}

      </main>
    </div>
  );
}