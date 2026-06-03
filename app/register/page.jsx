"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Register() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleRegister = async () => {
    if (loading) return;

    // ✅ Validation
    if (!form.name || !form.email || !form.password || !form.phone) {
      toast.error("All fields are required ❌");
      return;
    }

    if (form.phone.length !== 10) {
      toast.error("Enter valid 10-digit phone number 📱");
      return;
    }

    const toastId = toast.loading("Creating account...");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // ✅ important
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.msg || "Registration failed ❌", {
          id: toastId,
        });
        setLoading(false);
        return;
      }

      toast.success("Account created 🎉", { id: toastId });

      router.push("/login");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong ❌", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

return (
  <div className="relative min-h-screen overflow-hidden bg-[#f8fafc]">

    {/* Background Blobs */}
    <div className="absolute top-[-150px] left-[-100px] h-[350px] w-[350px] rounded-full bg-black/5 blur-3xl" />
    <div className="absolute bottom-[-150px] right-[-100px] h-[350px] w-[350px] rounded-full bg-gray-300/30 blur-3xl" />

    <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-6xl grid lg:grid-cols-2 overflow-hidden rounded-[32px] border border-white/40 bg-white/70 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.08)]">

        {/* LEFT SIDE */}
        <div className="hidden lg:flex flex-col justify-center bg-black text-white p-14 relative overflow-hidden">

          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 h-40 w-40 rounded-full border border-white" />
            <div className="absolute bottom-10 right-10 h-60 w-60 rounded-full border border-white" />
          </div>

          <div className="relative z-10">
            <span className="inline-flex px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm">
              Welcome 👋
            </span>

            <h1 className="text-5xl font-bold leading-tight mt-6">
              Create your
              <br />
              account today
            </h1>

            <p className="text-gray-300 mt-5 text-lg leading-relaxed">
              Join thousands of customers using our platform
              to manage products, orders and grow their business.
            </p>

            <div className="mt-10 space-y-4">
              <div className="flex items-center gap-3">
                <span>✓</span>
                <span>Fast registration process</span>
              </div>

              <div className="flex items-center gap-3">
                <span>✓</span>
                <span>Secure account protection</span>
              </div>

              <div className="flex items-center gap-3">
                <span>✓</span>
                <span>24/7 customer support</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-white/70 backdrop-blur-xl p-6 sm:p-10">

          <div className="flex justify-center">
            <Image
              src="/logo.png"
              alt="Logo"
              width={360}
              height={120}
              priority
            />
          </div>

          <div className="text-center  mb-2">
   
          </div>

          <div className="space-y-4">

            <div>
              <label className="text-sm font-medium text-gray-600 mb-2 block">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your full name"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
                className="w-full h-14 rounded-xl border border-gray-200 px-4 bg-white focus:border-black focus:ring-4 focus:ring-black/5 outline-none transition"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600 mb-2 block">
                Phone Number
              </label>

              <input
                type="tel"
                maxLength={10}
                placeholder="9876543210"
                value={form.phone}
                onChange={(e) =>
                  setForm({
                    ...form,
                    phone: e.target.value.replace(/\D/g, ""),
                  })
                }
                className="w-full h-14 rounded-xl border border-gray-200 px-4 bg-white focus:border-black focus:ring-4 focus:ring-black/5 outline-none transition"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600 mb-2 block">
                Email Address
              </label>

              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
                className="w-full h-14 rounded-xl border border-gray-200 px-4 bg-white focus:border-black focus:ring-4 focus:ring-black/5 outline-none transition"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600 mb-2 block">
                Password
              </label>

              <input
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value,
                  })
                }
                className="w-full h-14 rounded-xl border border-gray-200 px-4 bg-white focus:border-black focus:ring-4 focus:ring-black/5 outline-none transition"
              />
            </div>

            <button
              onClick={handleRegister}
              disabled={loading}
              className="w-full h-14 rounded-xl bg-black text-white font-semibold shadow-lg hover:scale-[1.01] hover:bg-gray-900 transition-all disabled:opacity-60"
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button>

            <div className="text-center text-sm text-gray-500 pt-2">
              Already have an account?{" "}
              <button
                onClick={() => router.push("/login")}
                className="font-semibold text-black hover:underline"
              >
                Sign In
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  </div>
);
}