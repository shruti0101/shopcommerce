"use client";

import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Shield,
  LogOut,
  Edit,
  MapPin,
  Package,
} from "lucide-react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [address, setAddress] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  // ✅ Load user
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed);
      setForm({ name: parsed.name, email: parsed.email });
    }

    const savedAddress = localStorage.getItem("address");
    if (savedAddress) setAddress(savedAddress);
  }, []);

  // ✅ Load orders
  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");

      if (!token) return;

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

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const handleUpdate = () => {
    const updatedUser = { ...user, ...form };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setShowModal(false);
  };

  const saveAddress = () => {
    localStorage.setItem("address", address);
    alert("Address saved");
  };

  if (!user)
    return (
      <div className="text-center py-24 text-gray-500 text-lg">
        Not logged in
      </div>
    );

  return (
    <div className="min-h-[90vh] bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-6 text-white flex items-center gap-6 shadow">

          <div className="w-20 h-20 rounded-full bg-white text-black flex items-center justify-center text-2xl font-bold">
            {user.name.charAt(0).toUpperCase()}
          </div>

          <div>
            <h1 className="text-2xl font-semibold">{user.name}</h1>
            <p>{user.email}</p>
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs">
              {user.role}
            </span>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="ml-auto bg-white text-black px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Edit size={16} /> Edit
          </button>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">

          {/* PROFILE */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-semibold mb-4">Profile Info</h2>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <User size={16} /> {user.name}
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} /> {user.email}
              </div>
              <div className="flex items-center gap-2">
                <Shield size={16} /> {user.role}
              </div>
            </div>
          </div>

          {/* ADDRESS */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-semibold mb-4 flex items-center gap-2">
              <MapPin size={16} /> Address
            </h2>

            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address..."
              className="w-full border rounded-lg p-2 text-sm"
            />

            <button
              onClick={saveAddress}
              className="mt-3 bg-black text-white px-4 py-2 rounded-lg"
            >
              Save Address
            </button>
          </div>
        </div>

        {/* ORDERS */}
        <div className="mt-8 bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <Package size={16} /> Order History
          </h2>

          {orders.length === 0 ? (
            <p className="text-gray-500 text-sm">No orders yet</p>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="border rounded-lg p-4 flex justify-between items-center"
                >
                  <div>
                    <p className="text-sm font-medium">
                      Order ID: {order._id}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold">
                      ₹{order.totalAmount}
                    </p>
                    <p className="text-xs text-green-600">
                      Confirmed
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="mt-8 bg-red-500 text-white px-6 py-3 rounded-lg flex items-center gap-2"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>

      {/* ================= MODAL ================= */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white p-6 rounded-xl w-[350px]">

            <h2 className="text-lg font-semibold mb-4">
              Edit Profile
            </h2>

            <input
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              className="w-full border p-2 rounded mb-3"
              placeholder="Name"
            />

            <input
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              className="w-full border p-2 rounded mb-3"
              placeholder="Email"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-black text-white rounded"
              >
                Save
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}