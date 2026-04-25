"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleRegister = async () => {
    const toastId = toast.loading("Creating account...");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.msg || "Registration failed ❌", { id: toastId });
        return;
      }

      toast.success("Account created 🎉", { id: toastId });

      router.push("/login");

    } catch (err) {
      console.error(err);
      toast.error("Something went wrong ❌", { id: toastId });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] px-4">
      
      {/* Card */}
      <div className="w-full max-w-md bg-white/70 backdrop-blur-lg border border-white/40 shadow-2xl rounded-2xl p-6 sm:p-8">
        
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl font-semibold text-center text-gray-900 mb-6">
          Create Account
        </h2>

        {/* NAME */}
        <input
          type="text"
          placeholder="Full Name"
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 mb-4 text-sm outline-none focus:ring-2 focus:ring-black/80 focus:border-black transition"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 mb-4 text-sm outline-none focus:ring-2 focus:ring-black/80 focus:border-black transition"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 mb-5 text-sm outline-none focus:ring-2 focus:ring-black/80 focus:border-black transition"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        {/* BUTTON */}
        <button
          onClick={handleRegister}
          className="w-full bg-black text-white py-2.5 rounded-lg font-medium tracking-wide hover:bg-gray-900 active:scale-[0.98] transition-all duration-200 shadow-md"
        >
          Register
        </button>

        {/* LOGIN LINK */}
        <p className="text-center text-sm text-gray-500 mt-5">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-black cursor-pointer font-medium hover:underline"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}