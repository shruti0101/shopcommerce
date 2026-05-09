"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ContactForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
const [categories,setCategories] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [product, setProduct] = useState("");
  const [message, setMessage] = useState("");



  const fetchCatgories= async()=>{

    try{


        const res = await fetch("/api/categories")
        const data = await res.json()
        setCategories(data)
    }catch{
        console.log("error")
    }
  }

useEffect(()=>{
fetchCatgories();
},[])


  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 15000);
    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  const handleClose = () => setIsOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("Sending...");

    try {
      const formData = {
        platform: "DPACK Popup Form",
        platformEmail: "dpacksolutionindia@gmail.com",
        name,
        phone,
        email,
        product,
        message,
        place: "N/A",
      };

      if (!/^\d{10}$/.test(formData.phone)) {
        return alert("Enter a valid 10-digit phone number");
      }

      const { data } = await axios.post(
        "https://brandbnalo.com/api/form/add",
        formData
      );

      if (data?.success) {
        setStatus("✅ Your enquiry has been submitted successfully!");

        const whatsappText = `Hi, I am ${name}.
Email: ${email}
Product: ${product}
Message: ${message}
Contact: ${phone}`;

        setTimeout(() => {
          window.open(
            `https://wa.me/917669988825?text=${encodeURIComponent(
              whatsappText
            )}`,
            "_blank"
          );
        }, 1000);

        setName("");
        setPhone("");
        setEmail("");
        setProduct("");
        setMessage("");

        setTimeout(() => setIsOpen(false), 3000);
      } else {
        setStatus("❌ Failed to send. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setStatus("❌ Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

return (
  <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/70 backdrop-blur-md p-3 overflow-y-auto">

    <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white max-w-4xl w-full border border-white/20">

      {/* background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#039c98]/10 via-white to-orange-50"></div>

      <div className="relative grid md:grid-cols-[1fr_1.1fr]">

        {/* LEFT */}
        <div className="hidden md:flex flex-col justify-between p-7 bg-gradient-to-br from-[#021414] via-[#032d2c] to-[#039c98] text-white">

          <div>
            <span className="inline-block bg-white/10 px-3 py-1 rounded-full text-center text-[8px] tracking-[2px] uppercase border border-white/20">
              JL Industries <br></br>
              wholesaler & importer
            </span>

            <h2 className="text-3xl font-bold leading-tight mt-5">
              Bulk Orders &
              <br />
              Premium Products
            </h2>

            <p className="mt-3 text-white/90 leading-relaxed text-md">
          Explore premium-quality home furnishing, kitchen essentials, bathroom accessories, décor items, and fitness products designed for residential, commercial, hospitality, and industrial spaces. 
            </p>
          </div>

          {/* mini features */}
          <div className="grid grid-cols-2 gap-3 mt-2">
            {[
              "Bulk Orders",
              "Fast Dispatch",
              "Premium Quality",
              "Best Pricing",
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/10 border border-white/10 rounded-xl px-3 py-2 text-sm text-center"
              >
                {item}
              </div>
            ))}
          </div>

          {/* bottom */}
          <div className="flex items-center gap-3 mt-6">
            <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
              🚚
            </div>

            <div>
              <p className="text-sm font-semibold">
                PAN India Delivery
              </p>

              <p className="text-[11px] text-white/70">
                Wholesale & retail support
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative p-5 md:p-7 bg-white">

          {/* close */}
          <button
            className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-lg transition"
            onClick={handleClose}
          >
            ✕
          </button>

          {/* heading */}
          <div className="mb-5">
            <span className="text-[#039c98] text-xs font-semibold tracking-wider uppercase">
              Contact Us
            </span>

            <h3 className="text-2xl font-bold text-gray-900 mt-1">
              Get Bulk Quote
            </h3>

            <p className="text-gray-500 mt-2 text-xs leading-relaxed">
              Submit your enquiry and our team will contact you shortly.
            </p>
          </div>

          {/* form */}
          <form className="space-y-3" onSubmit={handleSubmit}>

            {/* top row */}
            <div className="grid md:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Your Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#039c98]"
              />

              <select
                required
                disabled={loading}
                onChange={(e) => setProduct(e.target.value)}
                defaultValue=""
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#039c98]"
              >
                <option value="">Select Category</option>

                 {categories?.map((cat) => (
    <option key={cat._id} value={cat.name}>
      {cat.name}
    </option>
  ))}

              </select>
            </div>

            {/* phone */}
            <div className="flex items-center rounded-xl border border-gray-200 bg-gray-50 overflow-hidden">
              <div className="px-3 text-sm border-r bg-white h-full flex items-center">
                🇮🇳
              </div>

              <input
                type="tel"
                maxLength={10}
                placeholder="Phone Number"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={loading}
                className="w-full bg-gray-50 px-4 py-2.5 text-sm focus:outline-none"
              />
            </div>

            {/* email */}
            <input
              type="email"
              placeholder="Email Address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#039c98]"
            />

            {/* message */}
            <textarea
              placeholder="Requirement / Quantity / Bulk Details..."
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={loading}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm h-24 resize-none focus:outline-none focus:ring-2 focus:ring-[#039c98]"
            />

            {/* button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#039c98] to-[#027874] text-white text-sm font-semibold shadow-lg hover:opacity-95 transition"
            >
              {loading ? "Submitting..." : "Request Quote"}
            </button>

            {/* status */}
            {status && (
              <p
                className={`text-center text-xs font-medium ${
                  status.startsWith("✅")
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {status}
              </p>
            )}
          </form>

          {/* bottom badges */}
          <div className="grid grid-cols-3 gap-2 mt-5">
            {[
              "Secure",
              "Wholesale",
              "Fast Support",
            ].map((item, i) => (
              <div
                key={i}
                className="text-center rounded-lg bg-gray-50 border py-2 text-[11px] font-medium text-gray-700"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);
}
