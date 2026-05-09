'use client'
import React from "react";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

const Whatsapp = () => {
  return (
    <>
      
      <a
        href="https://wa.me/+919999402424"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with Dk Modular Contractor Contractor"
        className="fixed bottom-5 right-4 z-50 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition animate-bounce"
      >
        <FaWhatsapp size={30} />
      </a>


      <a
        href="tel:+919999402424"
        aria-label="Call Dk Modular Contractor Contractor"
        className="fixed bottom-21 right-4 z-50 bg-red-500 text-white p-3 rounded-full shadow-lg hover:bg-red-600 transition animate-bounce"
      >
        <FaPhoneAlt size={27} />
      </a>
    </>
  );
};

export default Whatsapp;
