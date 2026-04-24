
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
              Products can be returned within{" "}
              <span className="font-medium">7 days of delivery</span> if they are
              defective, damaged, or incorrect.
            </li>
            <li>
              Items must be unused and in original condition with packaging and
              accessories.
            </li>
            <li>Proof of purchase is required (invoice/order confirmation).</li>
            <li>
              Returns are not accepted for used products, customized items, or
              items returned without approval.
            </li>
          </ul>
        </div>

        {/* REFUNDS */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-4xl font-semibold text-gray-900 mb-4">
            Refunds
          </h2>
          <ul className="space-y-2 list-disc pl-5 text-lg md:text-xl leading-relaxed">
            <li>
              Once your return is received and inspected, we will notify you of
              the approval status.
            </li>
            <li>
              Approved refunds are processed within{" "}
              <span className="font-medium">5–7 business days</span>.
            </li>
            <li>
              Refunds are credited to the original payment method.
            </li>
            <li>
              Shipping charges are non-refundable unless the return is due to
              our error.
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
            <li>Clearance or discounted items (if marked non-returnable)</li>
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
            <span className="font-medium">support@jlindustries.com</span>
          </p>
          
        </div>
      </section>
    </>
  )
}
