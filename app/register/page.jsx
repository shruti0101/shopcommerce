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

      // 👉 Redirect to login
      router.push("/login");

    } catch (err) {
      console.error(err);
      toast.error("Something went wrong ❌", { id: toastId });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F6F7FB]">
      <div className="bg-white p-8 rounded-2xl shadow w-[380px]">

        <h2 className="text-2xl font-semibold mb-6 text-center">
          Create Account
        </h2>

        {/* NAME */}
        <input
          type="text"
          placeholder="Full Name"
          className="w-full border p-3 rounded-lg mb-3"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-lg mb-3"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-lg mb-4"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        {/* BUTTON */}
        <button
          onClick={handleRegister}
          className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition"
        >
          Register
        </button>

        {/* LOGIN LINK */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-black cursor-pointer font-medium"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}