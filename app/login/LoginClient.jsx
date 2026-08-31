"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import {
  ArrowRight,
  ShoppingBag,
  ShieldCheck,
  Truck,
  Heart,
  Phone,
  LockKeyhole,
} from "lucide-react";

import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

import { auth } from "@/utils/firebase";

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Redirect path
  const redirect = searchParams.get("redirect");

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  const [confirmationResult, setConfirmationResult] = useState(null);

  const [loading, setLoading] = useState(false);

  // =========================
  // SEND OTP
  // =========================

  const handleSendOTP = async () => {
    if (!phone) {
      toast.error("Please enter your mobile number");
      return;
    }

    // India number validation
    const cleanPhone = phone.replace(/\D/g, "");

    if (cleanPhone.length !== 10) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }

    const toastId = toast.loading("Sending OTP...");

    try {
      setLoading(true);

      // Add +91 automatically
      const formattedPhone = `+91${cleanPhone}`;

      // Create invisible reCAPTCHA
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          {
            size: "invisible",
          },
        );
      }

      const confirmation = await signInWithPhoneNumber(
        auth,
        formattedPhone,
        window.recaptchaVerifier,
      );

      setConfirmationResult(confirmation);

      toast.success("OTP sent successfully", {
        id: toastId,
      });
    } catch (error) {
      console.error("OTP Error:", error);

      toast.error(error?.message || "Failed to send OTP", {
        id: toastId,
      });

      // Reset reCAPTCHA
      if (window.recaptchaVerifier) {
        try {
          window.recaptchaVerifier.clear();
        } catch (err) {
          console.log(err);
        }

        window.recaptchaVerifier = null;
      }
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // VERIFY OTP
  // =========================

 const handleVerifyOTP = async () => {
  if (!otp) {
    toast.error("Please enter the OTP");
    return;
  }

  if (otp.length !== 6) {
    toast.error("OTP must be 6 digits");
    return;
  }

  if (!confirmationResult) {
    toast.error("Please request OTP first");
    return;
  }

  const toastId = toast.loading("Verifying OTP...");

  try {
    setLoading(true);

    // ==========================================
    // 1. VERIFY OTP WITH FIREBASE
    // ==========================================

    const result = await confirmationResult.confirm(otp);

    const firebaseUser = result.user;

    console.log("Firebase User:", firebaseUser);

    // ==========================================
    // 2. CHECK USER IN MONGODB
    // ==========================================

    const res = await fetch("/api/auth/check-phone", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: phone.trim(),
      }),
    });

    const data = await res.json();

    console.log("Check Phone Response:", data);

    // User does not exist
    if (res.status === 404) {
      toast.error(
        "Account not found. Please register.",
        { id: toastId }
      );

      router.replace("/register");
      return;
    }

    // Other API errors
    if (!res.ok) {
      toast.error(
        data?.msg || "Login failed",
        { id: toastId }
      );

      return;
    }

    // ==========================================
    // 3. GET YOUR BACKEND JWT
    // ==========================================

    const token = data?.token;

    if (!token) {
      toast.error(
        "Login token was not generated",
        { id: toastId }
      );

      return;
    }

    console.log("Backend JWT:", token);

    // ==========================================
    // 4. STORE YOUR BACKEND JWT
    // ==========================================

    localStorage.setItem("token", token);

    // Store user
    localStorage.setItem(
      "user",
      JSON.stringify(data?.user)
    );

    // ==========================================
    // 5. SUCCESS
    // ==========================================

    toast.success("Login successful!", {
      id: toastId,
    });

    router.replace(redirect || "/");
  } catch (error) {
    console.error("Verify OTP Error:", error);

    toast.error(
      "Invalid OTP. Please try again.",
      {
        id: toastId,
      }
    );
  } finally {
    setLoading(false);
  }
};

  // =========================
  // CHANGE NUMBER
  // =========================

  const handleChangeNumber = () => {
    setConfirmationResult(null);
    setOtp("");

    if (window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier.clear();
      } catch (err) {
        console.log(err);
      }

      window.recaptchaVerifier = null;
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f8fafc]">
      {/* Background */}
      <div className="absolute top-0 left-0 h-[400px] w-[400px] rounded-full bg-yellow-200/30 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-gray-300/30 blur-3xl" />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 overflow-hidden rounded-[32px] bg-white shadow-[0_25px_80px_rgba(0,0,0,0.12)] border border-gray-100">
          {/* ================================= */}
          {/* LEFT SIDE */}
          {/* ================================= */}

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
              Sign in to access your wishlist, track orders, manage addresses
              and enjoy member-only deals.
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
                🎉 Members get exclusive discounts and early access to new
                arrivals.
              </p>
            </div>
          </div>

          {/* ================================= */}
          {/* RIGHT SIDE */}
          {/* ================================= */}

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
                Login using your mobile number.
              </p>
            </div>

            {/* ================================= */}
            {/* MOBILE NUMBER */}
            {/* ================================= */}

            {!confirmationResult && (
              <>
                <div className="relative mb-6">
                  <Phone
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <div className="absolute left-12 top-1/2 -translate-y-1/2 text-gray-500">
                    +91
                  </div>

                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    placeholder="Mobile Number"
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value.replace(/\D/g, ""))
                    }
                    className="w-full h-14 pl-24 pr-4 rounded-2xl border border-gray-200 focus:border-black focus:ring-4 focus:ring-black/5 outline-none transition"
                  />
                </div>

                <button
                  onClick={handleSendOTP}
                  disabled={loading}
                  className="w-full h-14 rounded-2xl bg-black text-white font-semibold shadow-lg hover:shadow-2xl hover:-translate-y-0.5 transition-all disabled:opacity-50"
                >
                  {loading ? "Sending OTP..." : "Send OTP"}
                </button>
              </>
            )}

            {/* ================================= */}
            {/* OTP */}
            {/* ================================= */}

            {confirmationResult && (
              <>
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-3 text-center">
                    OTP sent to{" "}
                    <span className="font-semibold text-gray-900">
                      +91 {phone}
                    </span>
                  </p>
                </div>

                <div className="relative mb-6">
                  <LockKeyhole
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    className="w-full h-14 pl-12 pr-4 rounded-2xl border border-gray-200 focus:border-black focus:ring-4 focus:ring-black/5 outline-none transition tracking-[0.4em] text-center font-semibold"
                  />
                </div>

                <button
                  onClick={handleVerifyOTP}
                  disabled={loading}
                  className="w-full h-14 rounded-2xl bg-black text-white font-semibold shadow-lg hover:shadow-2xl hover:-translate-y-0.5 transition-all disabled:opacity-50"
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>

                <button
                  onClick={handleChangeNumber}
                  className="w-full mt-4 text-sm text-gray-500 hover:text-black"
                >
                  ← Change mobile number
                </button>
              </>
            )}

            {/* Firebase reCAPTCHA */}

            <div id="recaptcha-container"></div>

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
