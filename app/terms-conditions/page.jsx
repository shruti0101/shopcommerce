import Link from 'next/link'
import React from 'react'

export default function page () {
  return (
    <>
    <div className="w-full bg-gradient-to-r from-gray-700 to-gray-900 py-12 md:py-16 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-2">
            Terms & Conditions
          </h1>

          <p className="text-sm md:text-base opacity-90">
            <Link href="/" className="hover:underline">
              Home
            </Link>{" "}
            / Terms & Conditions
          </p>
        </div>
      </div>
     <section className="max-w-5xl mx-auto px-4 md:px-8 py-10 text-black">

        <p className="text-2xl  md:text-5xl text-black text-center mb-5">
          Terms and Conditions
        </p>

        {/* INTRO */}
        <div className="space-y-4 text-lg md:text-xl leading-relaxed">
          <p>
            These Terms and Conditions govern your use of our website and services.
            By accessing or using JL Industries, you agree to comply with these terms.
          </p>
          <p>
            If you do not agree with any part of these terms, you should not use our services.
          </p>
        </div>

        {/* USE OF SERVICE */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-3">Use of Our Services</h2>
          <ol className="list-disc pl-5 space-y-2 text-lg md:text-xl">
            <li>  You agree to use our services only for lawful purposes</li>
            <li>You must not misuse or disrupt our platform</li>
            <li>Unauthorized access or activity is strictly prohibited</li>
          </ol>
        </div>

        {/* PRODUCTS */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-3">Products & Services</h2>
          <p className="text-lg md:text-xl leading-relaxed">
            JL Industries provides industrial, safety, and wholesale products.
            We reserve the right to modify or discontinue any product without prior notice.
          </p>
        </div>

        {/* PRICING */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-3">Pricing & Payments</h2>
          <ul className="list-disc pl-5 space-y-2 text-lg md:text-xl">
            <li>All prices are subject to change without notice</li>
            <li>Payments must be completed before order processing</li>
            <li>Bulk pricing may vary based on quantity and agreements</li>
          </ul>
        </div>

        {/* SHIPPING */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-3">Shipping & Delivery</h2>
          <p className="text-lg md:text-xl leading-relaxed">
            We aim to deliver products within the promised timeframe. However,
            delays may occur due to unforeseen circumstances.
          </p>
        </div>

        {/* LIABILITY */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-3">Limitation of Liability</h2>
          <p className="text-lg md:text-xl leading-relaxed">
            JL Industries shall not be held liable for any indirect, incidental,
            or consequential damages arising from the use of our products or services.
          </p>
        </div>

        {/* USER RESPONSIBILITY */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-3">User Responsibilities</h2>
          <ul className="list-disc pl-5 space-y-2 text-lg md:text-xl">
            <li>Provide accurate and complete information</li>
            <li>Maintain confidentiality of your account details</li>
            <li>Comply with all applicable laws and regulations</li>
          </ul>
        </div>

        {/* TERMINATION */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-3">Termination</h2>
          <p className="text-lg md:text-xl leading-relaxed">
            We reserve the right to suspend or terminate access to our services
            if these terms are violated.
          </p>
        </div>

        {/* CHANGES */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-3">Changes to Terms</h2>
          <p className="text-lg md:text-xl leading-relaxed">
            We may update these Terms & Conditions from time to time.
            Continued use of the service means you accept the updated terms.
          </p>
        </div>

        {/* CONTACT */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
          <p className="text-lg md:text-xl">
            For any questions regarding these terms:
          </p>
          <p className="mt-2 font-medium text-indigo-600">
            info@jlindustries.com
          </p>
        </div>

      </section>
    </>
  )
}
