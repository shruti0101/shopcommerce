"use client";

import React from "react";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";
import { useState } from "react";
const Footer = () => {

    const [showCertificate, setShowCertificate] = useState(false);
  return (
    <footer className="relative w-full overflow-hidden text-white">
      {/* Background */}
      <div className="absolute inset-0 bg-[url('/footer-bg.webp')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Main Content */}
      <div className="relative z-10 w-full mx-auto px-6 md:px-25 py-10">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 border-b border-white/20 pb-10">
          
          {/* Brand */}
          <div>
            <Link href="/">
              <img
                src="/logo.png"
                alt="logo"
                className="h-12 md:h-16 bg-white rounded-sm cursor-pointer"
              />
            </Link>

            <p className="mt-5 text-sm text-white leading-relaxed">
              A reliable eCommerce platform offering high-quality industrial
              supplies and equipment for businesses and bulk buyers.
            </p>


{/* Social Icons */}
<div className="flex items-center gap-3 mt-6">
  <a
    href="https://www.facebook.com/profile.php?id=100064843774189"
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full bg-white/20 hover:bg-[#039c98] transition flex items-center justify-center border border-white/10 hover:scale-110"
  >
    <FaFacebookF className="text-white text-sm" />
  </a>

  <a
    href="https://www.instagram.com/j_l_industries_hub/"
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full bg-white/20 hover:bg-pink-600 transition flex items-center justify-center border border-white/10 hover:scale-110"
  >
    <FaInstagram className="text-white text-sm" />
  </a>

 

  <a
    href="https://www.youtube.com/@JLIndustriesPvtltd"
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full bg-white/20 hover:bg-red-600 transition flex items-center justify-center border border-white/10 hover:scale-110"
  >
    <FaYoutube className="text-white text-sm" />
  </a>

  <a
    href="https://wa.me/918130385561"
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full bg-white/20 hover:bg-green-500 transition flex items-center justify-center border border-white/10 hover:scale-110"
  >
    <FaWhatsapp className="text-white text-sm" />
  </a>
</div>


          </div>



 {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-5 tracking-wide">
              COMPANY
            </h3>

            <ul className="space-y-3 text-sm text-white">
              <li>
                <Link href="/" className="hover:text-[#039c98] hover:pl-1 transition">
                  Home
                </Link>
              </li>

              <li>
                <Link href="/about" className="hover:text-[#039c98] hover:pl-1 transition">
                  About
                </Link>
              </li>

              <li>
                <Link href="/blogs" className="hover:text-[#039c98] hover:pl-1 transition">
                  Blogs
                </Link>
              </li>


               <li>
                <Link href="/blogs" className="hover:text-[#039c98] hover:pl-1 transition">
                  Shop
                </Link>
              </li>

     <li>
                <Link href="/bulk-enquiry" className="hover:text-[#039c98] hover:pl-1 transition">
                  Bulk Enquiry
                </Link>
              </li>

           
            </ul>
          </div>



          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-5 tracking-wide">
              SUPPORT
            </h3>

            <ul className="space-y-3 text-sm text-white">
              <li>
                <Link href="/faq" className="hover:text-[#039c98] hover:pl-1 transition">
                  Frequently Asked Questions
                </Link>
              </li>

              <li>
                <Link href="/return-refund" className="hover:text-[#039c98] hover:pl-1 transition">
                  Return & Refund Policy
                </Link>
              </li>

              <li>
                <Link href="/shipping-cancellations" className="hover:text-[#039c98] hover:pl-1 transition">
                  Shipping & Cancellations
                </Link>
              </li>



                 <li>
                <Link href="/privacy-policy" className="hover:text-[#039c98] hover:pl-1 transition">
                  Privacy Policy
                </Link>
              </li>

         

              <li>
                <Link href="/terms-conditions" className="hover:text-[#039c98] hover:pl-1 transition">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

         

          {/* Contact / CTA */}
          <div>
            <h3 className="text-lg font-semibold mb-5 tracking-wide">
              GET IN TOUCH
            </h3>

            <p className="text-sm text-white mb-4">
            Need assistance or have bulk purchasing requirements? Our team is here to help.
            </p>

            <Link
              href="/contact"
              className="inline-block bg-[#039c98] hover:bg-[#02827f] transition px-5 py-2.5 rounded-lg text-sm font-medium shadow-lg"
            >
              Contact Us
            </Link>
          </div>




{/* Trust Elite Certificate */}
<div>
  <h3 className="text-lg font-semibold mb-5 tracking-wide text-[#f5b335]">
    TRUST ELITE CERTIFICATE
  </h3>

 <div className="flex justify-center lg:justify-start mb-4">
  <button
    onClick={() => setShowCertificate(true)}
    className="group"
  >
    <img
      src="/trustseal.webp"
      alt="Trust Elite Certificate"
      className="h-24 w-auto object-contain cursor-pointer transition-transform duration-300 group-hover:scale-110"
    />
  </button>
</div>

  <p className="text-sm text-white leading-relaxed">
    We are proud to present the Trust Elite Certificate of Excellence,
    recognizing our commitment to exceptional customer service,
    outstanding business practices, and building long-term trust with
    our customers.
  </p>
</div>


        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 text-xs md:text-sm text-white">
          <p>© 2026 JL Industries. All Rights Reserved.</p>

          <p>
            Designed by Promozione Branding Pvt. Ltd{" "}
            <a
              href="https://promozionebranding.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#039c98] hover:underline"
            >
              Website Designing Company
            </a>
          </p>
        </div>
      </div>









{showCertificate && (
  <div
    className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center p-4"
    onClick={() => setShowCertificate(false)}
  >
    <div
      className="relative max-w-3xl w-full"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Close Button */}
      <button
        onClick={() => setShowCertificate(false)}
        className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-white text-black text-xl font-bold shadow-lg"
      >
        ×
      </button>

      {/* Certificate Image */}
      <img
        src="/cert.png"
        alt="Trust Elite Certificate"
        className="w-full rounded-xl shadow-2xl"
      />
    </div>
  </div>
)}

    </footer>
  );
};

export default Footer;