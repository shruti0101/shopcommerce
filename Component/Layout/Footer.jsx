"use client";

import React from "react";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
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
      <div className="relative z-10 w-full mx-auto px-6 md:px-15 py-10">
        
        {/* Top Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[1.3fr_1.3fr_1fr_1fr_1fr] gap-10 border-b border-white/10 pb-12">
          
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





      <div>
  <h3 className="text-lg font-semibold mb-5 tracking-wide">
    GET IN TOUCH
  </h3>



  {/* Contact Details */}
  <div className="space-y-4 mb-6">
    <a
      href="tel:+919891000561"
      className="flex items-start gap-3 group"
    >
      <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#039c98] transition">
        <FaPhoneAlt className="text-sm" />
      </div>

      <div>
        <p className="text-xs text-white/60 uppercase tracking-wider">
          Call Us
        </p>

        <p className="text-sm text-white">
      +91 9891000561
        </p>
      </div>
    </a>

    <a
      href="mailto:info@jlindustries.com"
      className="flex items-start gap-3 group"
    >
      <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#039c98] transition">
        <FaEnvelope className="text-sm" />
      </div>

      <div>
        <p className="text-xs text-white/60 uppercase tracking-wider">
          Email
        </p>

        <p className="text-sm text-white break-all">
        jlindustriespvtltd@gmail.com
        </p>
      </div>
    </a>

    <div className="flex items-start gap-3">
   
        <FaMapMarkerAlt className="text-3xl" />
      
      <div>
        <p className="text-xs text-white/60 uppercase tracking-wider">
          Address
        </p>

        <p className="text-xs text-white leading-relaxed">
    253, BLOCK E-2 ICICI BANK,2ND FLOOR,, SHASTRI NAGAR, NEW DELHI, NORTH WEST DELHI,  NEW DELHI, INDIA, 110052
        </p>
      </div>
    </div>
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
                <Link href="/blog" className="hover:text-[#039c98] hover:pl-1 transition">
                  Articles
                </Link>
              </li>
                <li>
                <Link href="/contact-us" className="hover:text-[#039c98] hover:pl-1 transition">
                  Contact Us
                </Link>
              </li>



               <li>
                <Link href="/shop" className="hover:text-[#039c98] hover:pl-1 transition">
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

  <p className="text-xs text-white leading-relaxed">
  We are proud to present the Trust Elite Certificate of Excellence to JL Industries, recognizing their commitment to exceptional customer service, outstanding business practices, and a dedication to building trust with their customers.
  </p>
</div>


        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-3 text-xs pb-10 md:pb-0 md:text-sm text-white">
          <p>© 2026 JL Industries. All Rights Reserved.</p>

          <p>
           Website Designed By Inquiry Bazaar Pvt. Ltd. {" "}
            <a
              href="https://promozionebranding.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#039c98] hover:underline"
            >
            B2B Marketplace
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