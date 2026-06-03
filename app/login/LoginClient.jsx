"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, ChevronRight } from "lucide-react";
import {
  Mail,
  Lock,
  ShoppingBag,
  ShieldCheck,
  Truck,
  Heart,
  
  
  
} from "lucide-react";

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ✅ get redirect path
  const redirect = searchParams.get("redirect");

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

      // ✅ store user
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success("Welcome back! " + data.user.name, { id: toastId });

     
      if (data.user.role === "admin") {
        router.push("/admin");
      } else {
        router.push(redirect || "/"); 
      }

    } catch (err) {
      toast.error("Error", { id: toastId });
    }
  };

return (
  <div className="relative min-h-screen overflow-hidden bg-[#f8fafc]">

    {/* Background */}
    <div className="absolute top-0 left-0 h-[400px] w-[400px] rounded-full bg-yellow-200/30 blur-3xl" />
    <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-gray-300/30 blur-3xl" />

    <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-6xl grid lg:grid-cols-2 overflow-hidden rounded-[32px] bg-white shadow-[0_25px_80px_rgba(0,0,0,0.12)] border border-gray-100">

        {/* LEFT SIDE */}
        <div className="hidden lg:flex bg-black text-white p-14 flex-col justify-center relative overflow-hidden">

          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-40 h-40 border rounded-full border-white" />
            <div className="absolute bottom-10 right-10 w-60 h-60 border rounded-full border-white" />
          </div>

          <span className="relative z-10 inline-flex w-fit px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm">
            Welcome Back 👋
          </span>

          <h1 className="relative z-10 text-5xl font-bold leading-tight mt-6">
            Continue
            <br />
            Shopping
          </h1>

          <p className="relative z-10 mt-5 text-gray-300 text-lg leading-relaxed">
            Sign in to access your wishlist, track orders,
            manage addresses and enjoy member-only deals.
          </p>

          <div className="relative z-10 mt-10 space-y-5">

            <div className="flex items-center gap-3">
              <Truck size={20} />
              Fast Order Tracking
            </div>

            <div className="flex items-center gap-3">
              <Heart size={20} />
              Saved Wishlist
            </div>

            <div className="flex items-center gap-3">
              <ShieldCheck size={20} />
              Secure Checkout
            </div>

          </div>

          <div className="relative z-10 mt-12 bg-white/10 border border-white/10 rounded-2xl p-5">
            <p className="text-sm text-gray-300">
              🎉 Members get exclusive discounts and early access to new arrivals.
            </p>
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="p-8 sm:p-10 lg:p-14 flex flex-col justify-center">

          {/* Logo */}
          <div className="flex justify-center">
            <Image
              src="/logo.png"
              alt="Logo"
              width={260}
              height={120}
              priority
            />
          </div>

          {/* Heading */}
          <div className="text-center mt-4 mb-8">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 text-sm font-medium">
              <ShoppingBag size={16} />
              Customer Login
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-5">
              Welcome Back
            </h2>

            <p className="text-gray-500 mt-2">
              Login to continue your shopping experience.
            </p>

          </div>

          {/* Email */}
          <div className="relative mb-4">

            <Mail
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              placeholder="Email Address"
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              className="w-full h-14 pl-12 pr-4 rounded-2xl border border-gray-200 focus:border-black focus:ring-4 focus:ring-black/5 outline-none transition"
            />

          </div>

          {/* Password */}
          <div className="relative mb-6">

            <Lock
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="password"
              placeholder="Password"
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
              className="w-full h-14 pl-12 pr-4 rounded-2xl border border-gray-200 focus:border-black focus:ring-4 focus:ring-black/5 outline-none transition"
            />

          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="w-full h-14 rounded-2xl bg-black text-white font-semibold shadow-lg hover:shadow-2xl hover:-translate-y-0.5 transition-all"
          >
            Login To Account
          </button>

          {/* Register */}
          <div className="text-center mt-6">

            <p className="text-gray-500">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="font-semibold text-black hover:underline"
              >
                Create Account
              </Link>
            </p>

          </div>

          {/* Back Home */}
          <div className="flex justify-center mt-6">

            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#C8921C] text-white font-medium hover:opacity-90 transition"
            >
              Back To Home
              <ArrowRight size={18} />
            </Link>

          </div>

        </div>

      </div>

    </div>
  </div>
);
}