"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Clientele() {

  const logos = [
    "/client/1.webp",
    "/client/2.webp",
    "/client/3.webp",
    "/client/4.webp",
    "/client/5.webp",
    "/client/6.webp",
    "/client/7.webp",
    "/client/8.webp",
  ];

  return (
    <section className="relative overflow-hidden bg-[#faf7f2] pt-6 pb-8 ">

      {/* TOP BLUR */}
      <div className="absolute left-0 top-0 h-52 w-52 rounded-full bg-[#f3e6cf] blur-3xl opacity-40" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-4 sm:px-6 md:px-10">

        {/* HEADER */}
        <div className="mb-8  flex flex-col items-center text-center">

          <span
            className="
              mb-3
              rounded-full
              border
              border-[#d9c7a5]
              bg-white
              px-4
              py-2
              text-[10px]
              sm:text-[11px]
              font-semibold
              uppercase
              tracking-[0.25em]
              text-[#9f7a3d]
              shadow-sm
            "
          >
            Trusted By Brands
          </span>

          <h1
            className="
              font-bebas
              text-4xl
              sm:text-5xl
              md:text-7xl
              leading-none
              tracking-wide
              text-[#111]
            "
          >
            Our Partners
          </h1>


        </div>

        {/* SLIDER WRAPPER */}
        <div className="relative">

          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={{
              nextEl: ".partner-next",
              prevEl: ".partner-prev",
            }}
            autoplay={{
              delay: 2200,
              disableOnInteraction: false,
            }}
            loop
            speed={800}
            spaceBetween={14}
            breakpoints={{
              0: {
                slidesPerView: 2,
              },

              480: {
                slidesPerView: 2,
              },

              640: {
                slidesPerView: 3,
              },

              768: {
                slidesPerView: 4,
              },

              1024: {
                slidesPerView: 5,
              },

            }}
          >

            {logos.map((logo, i) => (

              <SwiperSlide key={i}>

                <div
                  className="
                    group
                    flex
                    h-[120px]
                
                
                    items-center
                    justify-center
                    rounded-[28px]
                    border
                    border-[#efe7db]
                    bg-white
                    
                    shadow-[0_10px_35px_rgba(0,0,0,0.04)]
                    transition-all
                    duration-500
                    hover:-translate-y-2
                    hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]
                  "
                >

                  {/* GLOW */}
                  <div
                    className="
                      absolute
                      h-20
                      w-20
                      rounded-full
                      bg-[#f5ede1]
                      blur-2xl
                      opacity-0
                      transition
                      duration-500
                      group-hover:opacity-100
                    "
                  />

                  <Image
                    src={logo}
                    alt="partner-logo"
                    width={180}
                    height={90}
                    className="
                      relative
                      z-10
                      h-auto
                      w-auto
                      max-h-[90px]
                      object-cover
                      transition-all
                      duration-500
                      group-hover:scale-105
                    "
                  />

                </div>

              </SwiperSlide>

            ))}

          </Swiper>

          {/* LEFT BUTTON */}
          <button
            className="
              partner-prev
              absolute
              left-0
              top-1/2
              z-20
              hidden
              h-11
              w-11
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              border
              border-[#ece2d5]
              bg-white
              shadow-lg
              transition-all
              duration-300
              hover:bg-black
              hover:text-white
              md:flex
            "
          >
            <ChevronLeft size={18} />
          </button>

          {/* RIGHT BUTTON */}
          <button
            className="
              partner-next
              absolute
              right-0
              top-1/2
              z-20
              hidden
              h-11
              w-11
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              border
              border-[#ece2d5]
              bg-white
              shadow-lg
              transition-all
              duration-300
              hover:bg-black
              hover:text-white
              md:flex
            "
          >
            <ChevronRight size={18} />
          </button>

        </div>

      </div>

    </section>
  );
}