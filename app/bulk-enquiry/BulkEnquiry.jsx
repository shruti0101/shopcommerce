"use client";
import React, { useState } from "react";
import axios from "axios";

const BulkEnquiry = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [product, setProduct] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        platform: "JL Industries",
        platformEmail: "Inquiry.promozione@gmail.com",
        name,
        phone,
        email,
        place: "N/A",
        product,
        message,
      };

      const { data } = await axios.post(
        "https://brandbnalo.com/api/form/add",
        formData,
      );

      if (!data?.success) {
        console.log("some Error");
      }

      setName("");
        setPhone("");
        setEmail("");
        setProduct("");
        setMessage("");
      console.log("all good");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <div className="py-3 md:py-6">
          <h1 className="text-center text-2xl font-bold md:text-4xl">
            Get in touch with JL Industries
          </h1>
        </div>
        <section className="flex items-center justify-center pt-3 pb-7 px-4">
          <div className="grid md:grid-cols-2 md:gap-10 lg:gap-20 max-w-7xl w-full items-center">
            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6 md:p-10">
              {/* Heading */}
              <h1 className="text-2xl md:text-4xl font-semibold text-gray-900 text-start mb-3">
                Bulk Enquiry
              </h1>

              <p className="text-sm md:text-base text-gray-500 text-start mb-8">
                Fill in the details below and our team will get back to you
                shortly.
              </p>

              {/* FORM */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-md text-black mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-indigo-500"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-md text-black mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-indigo-500"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-md text-black mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-indigo-500"
                  />
                </div>

                {/* Product */}
                <div>
                  <label className="block text-md text-black mb-2">
                    Product
                  </label>
                  <input
                    type="text"
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-indigo-500"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-md text-black mb-2">
                    Message
                  </label>
                  <textarea
                    rows="4"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm outline-none resize-none focus:border-indigo-500"
                  ></textarea>
                </div>

                {/* Button */}
                <button
                  type="submit"
                  className="w-full py-3 bg-[#FFED00] text-black rounded-lg text-sm font-medium hover:shadow-lg transition"
                >
                  Send Enquiry
                </button>
              </form>
            </div>

            <div className="rounded-3xl p-10 relative min-h-[662px] w-full max-w-[520px]  md:flex flex-col justify-between overflow-hidden">
              <img
                src={
                  "https://i.pinimg.com/736x/9d/20/a6/9d20a6230a8967318dd921c3282e6329.jpg"
                }
                alt="3D shapes"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default BulkEnquiry;
