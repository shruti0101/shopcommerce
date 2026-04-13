"use client";

import Image from "next/image";

export default function Clientele() {
  const logos = [
    "/brand1.png",
    "/brand2.png",
    "/brand7.jpeg",
    "/brand6.jpeg",
  "/brand2.png",
    "/brand7.jpeg",
    "/brand1.png",
  ];

  return (
    <section className="w-full bg-[#f5f5f5] py-10 px-6 md:px-16 rounded-lg">
      
      {/* HEADER */}
      <div className="flex items-center gap-6 mb-10">
        <h2 className="text-lg md:text-xl font-medium text-gray-700 whitespace-nowrap">
          Premium Buyers <span className="text-red-500">❤</span> To Resource From JL INDUSTRIES
        </h2>
        <div className="w-full h-[1px] bg-gray-300"></div>
      </div>

      {/* LOGOS */}
      <div className="flex items-center justify-between gap-10 flex-wrap md:flex-nowrap">
        {logos.map((logo, index) => (
          <div
            key={index}
            className="flex items-center justify-center w-[120px] md:w-[240px] opacity-80 hover:opacity-100 transition"
          >
            <Image
              src={logo}
              alt="client logo"
              width={200}
              height={100}
              className="object-cover "
            />
          </div>
        ))}
      </div>
    </section>
  );
}