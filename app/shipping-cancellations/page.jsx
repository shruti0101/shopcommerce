import React from "react";
import Link from "next/link";

export default function Page() {
  return (
    <>
     <div className="w-full bg-gradient-to-r from-gray-700 to-gray-900 py-12 md:py-16 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-2">
            Shipping & Cancellations
          </h1>

          <p className="text-sm md:text-base opacity-90">
            <Link href="/" className="hover:underline">
              Home
            </Link>{" "}
            | Shipping and Cancellations
          </p>
        </div>
      </div>
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-16">
        <div className="-my-8 divide-y divide-gray-200">

          {/* SHIPPING */}
          <div className="py-10 flex flex-col md:flex-row gap-3 md:gap-6">
            <div className="md:w-64">
              <h2 className="font-semibold text-2xl text-gray-800">
                Shipping Policy
              </h2>
            </div>

            <div className="flex-1">
              <p className="text-lg text-gray-800 mb-6">
                JL Industries is committed to delivering products safely and on time. We process and dispatch orders as quickly as possible to ensure a smooth and reliable delivery experience for our customers..
              </p>

              <ul className="space-y-4">
                {[
                  "Order Processing: Orders are processed within 1–3 business days. Bulk/custom orders may take longer.",
                  "Delivery Timeline: Usually 3–10 business days depending on location and availability.",
                  "Shipping Coverage: We deliver across India via trusted logistics partners.",
                  "Shipping Charges: Charges depend on weight, size, and location and will be shared at confirmation.",
                  "Tracking: Tracking details are provided once your order is shipped.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-1">
                    
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CANCELLATION */}
          <div className="py-10 flex flex-col md:flex-row gap-3 md:gap-6">
            <div className="md:w-64">
              <h2 className="font-semibold text-2xl text-gray-800">
                Cancellation Policy
              </h2>
            </div>

            <div className="flex-1">
              <p className="text-lg text-gray-800 mb-6">
                We understand that plans can change. Our cancellation policy is designed to be simple and transparent.
              </p>

              <ul className="space-y-4">
                {[
                  "Orders can be cancelled within 24 hours or before dispatch.",
                  "Once shipped, orders cannot be cancelled.",
                  "Bulk/custom orders cannot be cancelled after processing starts.",
                  "Approved refunds are processed within 5–7 business days.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RETURNS */}
          <div className="py-10 flex flex-col md:flex-row gap-3 md:gap-6">
            <div className="md:w-64">
              <h2 className="font-semibold text-2xl text-gray-800">
                Returns & Support
              </h2>
            </div>

            <div className="flex-1">
              <p className="text-lg text-gray-800 mb-6">
                We are here to support you in case of issues with your order.
              </p>

              <ul className="space-y-4">
                {[
                  "Report damaged or incorrect items within 48 hours of delivery.",
                  "Our team will assist with replacements or resolution.",
                  "Customer satisfaction is our top priority.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
    </>
  );
}