'use client'
import React from "react";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import Image from "next/image";
const Whatsapp = () => {
  return (
    <>
      
      <a
        href="https://wa.me/+918130385561"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp "
        className="hidden md:block fixed bottom-5 right-4 z-50 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition animate-bounce"
      >
        <FaWhatsapp size={30} />
      </a>


      <a
        href="tel:+918130385561"
        aria-label="Call Us"
        className="fixed bottom-22 right-4 z-50   p-3 rounded-full shadow-lg bg-white text-green-600 transition animate-bounce"
      >
        <Image src="/561253.png" alt="Phone Icon" width={30} height={30} />
      </a>
    </>
  );
};

export default Whatsapp;
