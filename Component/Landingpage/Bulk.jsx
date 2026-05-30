"use client";

import React, { useState } from "react";
import axios from "axios";

export default function BulkEnquiryPopup({
  isOpen,
  setIsOpen,
  categories = [],
}) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [city, setCity] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^\d{10}$/.test(phone)) {
      alert("Enter a valid 10 digit phone number");
      return;
    }

    try {
      setLoading(true);

      const formData = {
        platform: "Bulk Enquiry Form",
        platformEmail: "care@inquirybazaar.com",
        name,
        companyName,
        phone,
        email,
        product,
        quantity,
        city,
        gstNumber,
        message,
      };

      const { data } = await axios.post(
        "https://brandbnalo.com/api/form/add",
        formData
      );

      if (data?.success) {
        setStatus("✅ Enquiry submitted successfully");

        const whatsappText = `*Bulk Enquiry*

Name: ${name}
Company: ${companyName}
Mobile: ${phone}
Email: ${email}
Category: ${product}
Quantity: ${quantity}
City: ${city}
GST: ${gstNumber}

Requirement:
${message}`;

        window.open(
          `https://wa.me/917669988825?text=${encodeURIComponent(
            whatsappText
          )}`,
          "_blank"
        );

        setName("");
        setCompanyName("");
        setPhone("");
        setEmail("");
        setProduct("");
        setQuantity("");
        setCity("");
        setGstNumber("");
        setMessage("");

        setTimeout(() => {
          setIsOpen(false);
        }, 2500);
      } else {
        setStatus("❌ Failed to submit enquiry");
      }
    } catch (error) {
      console.log(error);
      setStatus("❌ Something went wrong");
    } finally {
      setLoading(false);
    }
  };

return (
  <div className="fixed inset-0 z-[99999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl">

      {/* Close Button */}
      <button
        onClick={() => setIsOpen(false)}
        className="absolute right-4 top-4 text-gray-400 hover:text-red-500 text-xl"
      >
        ✕
      </button>

      <div className="p-6 md:p-8">

        {/* Heading */}
        <div className="mb-6 text-center">
          <span className="text-[#039c98] uppercase text-xs font-semibold tracking-wider">
            Bulk Enquiry
          </span>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">
            Request Bulk Quotation
          </h2>

          <p className="text-gray-500 text-sm mt-2">
            Fill in your details and receive quotations from verified suppliers.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-[#039c98]"
            />

            <input
              type="text"
              placeholder="Company Name"
              required
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-[#039c98]"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="tel"
              maxLength={10}
              placeholder="Mobile Number"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-[#039c98]"
            />

            <input
              type="email"
              placeholder="Email Address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-[#039c98]"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <select
              required
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-[#039c98]"
            >
              <option value="">Select Category</option>

              {categories?.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Required Quantity"
              required
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-[#039c98]"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="City"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-[#039c98]"
            />

            <input
              type="text"
              placeholder="GST Number (Optional)"
              value={gstNumber}
              onChange={(e) => setGstNumber(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-[#039c98]"
            />
          </div>

          <textarea
            rows={4}
            placeholder="Describe your requirement..."
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm resize-none focus:outline-none focus:border-[#039c98]"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#039c98] hover:bg-[#02817d] text-white font-semibold py-3 rounded-lg transition"
          >
            {loading ? "Submitting..." : "Submit Bulk Enquiry"}
          </button>

          {status && (
            <p className="text-center text-sm font-medium">
              {status}
            </p>
          )}
        </form>
      </div>
    </div>
  </div>
);
}