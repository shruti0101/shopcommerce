
import Link from 'next/link'
import React from 'react'

export default function page(){
  return (
    <>
    <div className="w-full bg-gradient-to-r from-gray-700 to-gray-900 py-12 md:py-16 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-2">
            Return & Refund Policy
          </h1>

          <p className="text-sm md:text-base opacity-90">
            <Link href="/" className="hover:underline">
              Home
            </Link>{" "}
            | Return and Refund Policy
          </p>
        </div>
      </div>

       <section className="max-w-5xl mx-auto px-4 md:px-6 py-12 text-black">
        
        {/* Intro */}
        <p className="text-lg md:text-xl leading-relaxed mb-8">
          At <span className="font-semibold text-gray-900">JL Industries</span>,
          we are committed to delivering high-quality products and ensuring
          customer satisfaction. If you are not completely satisfied with your
          purchase, our return and refund policy is designed to be simple and
          transparent.
        </p>

        {/* RETURNS */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-4xl font-semibold text-gray-900 mb-4">
            Returns
          </h2>
          <ul className="space-y-2 text-lg list-disc pl-5  md:text-xl leading-relaxed">
            <li>
           All sales are generally non-returnable and non-refundable. However, if you receive a damaged, defective, or incorrect product, you may request a replacement (not a refund) by contacting us within 48 hours of delivery.


            </li>
            <li>
        The item must be unused, in its original condition, and must include all original packaging materials.
            </li>
            <li>Proof of purchase is required (invoice/order confirmation).</li>
            <li>
              Exchange are not accepted for used products, customized items, or
              items Exchanged without approval.
            </li>
          </ul>
        </div>

    

        {/* EXCHANGE */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-4xl font-semibold text-gray-900 mb-4">
            Exchanges
          </h2>
          <ul className="space-y-2 list-disc pl-5 text-lg md:text-xl leading-relaxed">
            <li>
              Exchanges are available for defective or damaged products only.
            </li>
            <li>
              Requests must be made within the return period and are subject to
              product availability.
            </li>
          </ul>
        </div>

        {/* NON RETURNABLE */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-4xl font-semibold text-gray-900 mb-4">
            Non-Returnable Items
          </h2>
          <ul className="space-y-2 list-disc pl-5 text-lg md:text-xl leading-relaxed">
            <li>Bulk orders (unless damaged or defective)</li>
            <li>Customized or made-to-order products</li>
            <li>Clearance or discounted items </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div className="bg-gray-100 rounded-xl p-6">
          <h2 className="text-lg md:text-2xl font-semibold text-gray-900 mb-3">
            Need Help?
          </h2>
          <p className="text-sm md:text-base mb-2">
            For return or refund requests, contact us with your order details:
          </p>
          <p className="text-sm md:text-base">
            📧 Email:{" "}
            <span className="font-medium">jlindustriespvtltd@gmail.com</span>
          </p>
          
        </div>
      </section>
    </>
  )
}
