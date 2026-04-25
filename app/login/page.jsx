"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    const toastId = toast.loading("Logging in...");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.msg, { id: toastId });
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success("Welcome back! " + data.user.name, { id: toastId });

      if (data.user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (err) {
      toast.error("Error", { id: toastId });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] px-4">
      
      {/* Card */}
      <div className="w-full max-w-md bg-white/70 backdrop-blur-lg border border-white/40 shadow-2xl rounded-2xl p-8">
        
        {/* Heading */}
        <h2 className="text-2xl font-semibold text-gray-900 text-center mb-6">
          Login
        </h2>

        {/* Email */}
        <input
          placeholder="Email"
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 mb-4 text-sm outline-none focus:ring-2 focus:ring-black/80 focus:border-black transition"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 mb-5 text-sm outline-none focus:ring-2 focus:ring-black/80 focus:border-black transition"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {/* Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-black text-white py-2.5 rounded-lg font-medium tracking-wide hover:bg-gray-900 active:scale-[0.98] transition-all duration-200 shadow-md"
        >
          Login
        </button>
      </div>
    </div>
  );
}