import Link from 'next/link'
import React from 'react'

export default function page  ()  {
  return (
   <>
  <div className="w-full bg-gradient-to-r from-gray-700 to-gray-900 py-12 md:py-16 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-2">
            Privacy Policy
          </h1>

          <p className="text-sm md:text-base opacity-90">
            <Link href="/" className="hover:underline">
              Home
            </Link>{" "}
            / Privacy Policy
          </p>
        </div>
      </div>

   <section className="max-w-5xl mx-auto px-4 md:px-8 py-10 text-gray-700">
      

      <p className="text-sm md:text-xl text-center text-gray-500 mb-10">
        Last updated: Apirl 24, 2026
      </p>

      {/* Intro */}
      <div className="space-y-4 text-sm sm md:text-xl leading-relaxed">
        <p>
          This Privacy Policy describes Our policies and procedures on the
          collection, use and disclosure of Your information when You use the
          Service and tells You about Your privacy rights and how the law protects You.
        </p>

        <p>
          We use Your Personal data to provide and improve the Service. By using
          the Service, You agree to the collection and use of information in
          accordance with this Privacy Policy.
        </p>
      </div>

      {/* Definitions */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-3">Definitions</h2>

        <ul className="space-y-1 text-sm sm md:text-xl leading-relaxed list-disc pl-5">
          <li><strong>Company:</strong> JL Industries, India</li>
          <li><strong>Service:</strong> Refers to the Website</li>
          <li><strong>Personal Data:</strong> Information that identifies an individual</li>
          <li><strong>Usage Data:</strong> Data collected automatically</li>
          <li><strong>Device:</strong> Any device such as computer or mobile</li>
          <li><strong>You:</strong> The user accessing the Service</li>
        </ul>
      </div>

      {/* Data Collection */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-3">
          Collecting and Using Your Personal Data
        </h2>

        <h3 className="font-medium  md:text-xl mt-4 mb-2">Types of Data Collected</h3>

        <ul className="list-disc pl-5 space-y-1 md:text-xl text-sm md:text-base">
          <li>Email address</li>
          <li>Full name</li>
          <li>Phone number</li>
          <li>Address details</li>
          <li>Usage Data</li>
        </ul>
      </div>

      {/* Usage */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold  mb-3">
          Use of Your Personal Data
        </h2>

        <ul className="list-disc pl-5 space-y-2 text-sm md:text-xl leading-relaxed">
          <li>To provide and maintain our Service</li>
          <li>To manage Your account</li>
          <li>To contact You via email, phone, or SMS</li>
          <li>To improve our services and user experience</li>
          <li>To provide offers, updates, and promotions</li>
        </ul>
      </div>

      {/* Cookies */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-3">
          Tracking Technologies and Cookies
        </h2>

        <p className="text-sm md:text-xl leading-relaxed">
          We use cookies and similar tracking technologies to track activity on
          our Service and store certain information. You can instruct your browser
          to refuse all cookies or indicate when a cookie is being sent.
        </p>
      </div>

      {/* Data Sharing */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-3">
          Sharing of Your Personal Data
        </h2>

        <ul className="list-disc pl-5 space-y-2 text-sm md:text-xl">
          <li>With service providers</li>
          <li>With business partners</li>
          <li>During business transfers</li>
          <li>With your consent</li>
        </ul>
      </div>

      {/* Retention */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-3">
          Retention of Your Data
        </h2>

        <p className="text-sm md:text-xl leading-relaxed">
          We retain your personal data only as long as necessary for legal and
          business purposes.
        </p>
      </div>

      {/* Security */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-3">
          Security of Your Data
        </h2>

        <p className="text-sm md:text-xl leading-relaxed">
          We use commercially acceptable means to protect your data, but no method
          of transmission over the Internet is 100% secure.
        </p>
      </div>

      {/* Children */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-3">
          Children’s Privacy
        </h2>

        <p className="text-sm md:text-xl leading-relaxed">
          Our Service does not address anyone under the age of 13. We do not knowingly
          collect personal data from children.
        </p>
      </div>

      {/* Changes */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-3">
          Changes to this Privacy Policy
        </h2>

        <p className="text-sm md:text-xl leading-relaxed">
          We may update our Privacy Policy from time to time. Changes will be posted
          on this page.
        </p>
      </div>

      {/* Contact */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-3">
          Contact Us
        </h2>

        <p className="text-sm md:text-xl">
          If you have any questions, contact us at:
        </p>

        <p className="mt-2 font-medium text-indigo-600">
          info@jlindustries.com
        </p>
      </div>
    </section>
   </>
  )
}
