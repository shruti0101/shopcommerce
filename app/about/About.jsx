"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import Image from "next/image";
const About = () => {
  const slides = [
    {
      title: "RENEWED TECH",
      subtitle: "Premium Quality • Lower Price",
      offer: "Save Up to 60% off",
      image: "/slider1.png",
    },
    {
      title: "SMART DEVICES",
      subtitle: "Latest Tech • Best Deals",
      offer: "Up to 50% off",
      image: "/slider-2.png",
    },
  ];
  return (
    <section className="w-full mt-4 px-3 overflow-hidden ">
      {/* Heading */}
      <h1 className="text-3xl md:text-7xl text-center font-bold mt-2 text-gray-900 mb-6">
        About Us
      </h1>

      <div className="w-full px-6 mt-2 mb-4">
        <div className="relative rounded-2xl overflow-hidden shadow-lg">
          {/* NAV BUTTONS */}
          <div className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur w-10 h-10 rounded-full flex items-center justify-center shadow cursor-pointer">
            <ChevronLeft />
          </div>

          <div className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur w-10 h-10 rounded-full flex items-center justify-center shadow cursor-pointer">
            <ChevronRight />
          </div>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation={{
              prevEl: ".swiper-button-prev-custom",
              nextEl: ".swiper-button-next-custom",
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000 }}
            loop
          >
            {slides.map((slide, i) => (
              <SwiperSlide key={i}>
                <div className="relative h-[70vh]">
                  {/* IMAGE */}
              <Image
  src={slide.image}
  alt="slide-image"
  width={2000}
  height={2000}
className="absolute inset-0 w-full h-full object-cover"
/>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Description */}

     <section className="relative overflow-hidden bg-[#f7f4ee] py-8">

  {/* BACKGROUND BLURS */}
  <div className="absolute -top-24 left-0 h-[320px] w-[320px] rounded-full bg-[#d7c2a3]/30 blur-3xl" />
  <div className="absolute bottom-0 right-0 h-[260px] w-[260px] rounded-full bg-[#c7d2fe]/30 blur-3xl" />

  <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">

    <div
      className="
        grid
        grid-cols-1
        lg:grid-cols-2
        gap-12
        items-center
      "
    >

      {/* IMAGE */}
      <div className="relative group">

        {/* GLOW */}
        <div
          className="
            absolute
            inset-0
            rounded-[35px]
            bg-gradient-to-br
            from-[#d7c2a3]/30
            to-[#1e3a8a]/10
            blur-2xl
            scale-105
          "
        />

        <img
          src="/bg-images/about.webp"
          alt="JL Industries"
          className="
            relative
            h-[320px]
            sm:h-[420px]
            md:h-[520px]
            w-full
            rounded-[35px]
            object-cover
            shadow-[0_30px_80px_rgba(0,0,0,0.12)]
          "
        />

        {/* FLOATING BADGE */}
        <div
          className="
            absolute
            bottom-6
            left-6
            rounded-2xl
            border
            border-white/20
            bg-white/80
            px-5
            py-4
            backdrop-blur-xl
            shadow-xl
          "
        >
          <h3 className="text-2xl font-bold text-[#111]">
            20+
          </h3>

          <p className="text-sm text-[#666]">
            Years Industry Experience
          </p>
        </div>

      </div>

      {/* CONTENT */}
      <div>

        {/* LABEL */}
        <span
          className="
            inline-flex
            items-center
            rounded-full
            border
            border-[#d7c2a3]
            bg-white/80
            px-5
            py-2
            text-[11px]
            font-semibold
            uppercase
            tracking-[0.3em]
            text-[#9f7a3d]
            shadow-sm
            backdrop-blur-xl
          "
        >
          Premium Industrial Supplier
        </span>

        {/* TITLE */}
        <h1
          className="
            mt-6
            text-4xl
            md:text-6xl
            font-bold
            leading-tight
            text-[#111]
          "
        >
          About JL Industries
        </h1>

        {/* TEXT */}
        <div className="mt-6 space-y-5">

          <p className="text-[15px] md:text-[17px] leading-8 text-[#444]">
            JL Industries is a trusted name in industrial supply and
            safety solutions, known for delivering premium-quality
            products with consistency, reliability, and sourcing
            excellence.
          </p>

          <p className="text-[15px] md:text-[17px] leading-8 text-[#444]">
            As a leading importer and wholesaler, we bridge the gap
            between global manufacturers and local industries by
            providing durable products at competitive pricing with
            dependable service support.
          </p>

          <p className="text-[15px] md:text-[17px] leading-8 text-[#444]">
            With strong supply chain management and strict quality
            standards, we ensure every product meets performance,
            durability, and safety expectations across industries.
          </p>

        </div>

        {/* PREMIUM STATS */}
        <div className="mt-5 grid grid-cols-3 gap-4">

          <div
            className="
              rounded-3xl
              bg-white
              p-5
              shadow-[0_15px_40px_rgba(0,0,0,0.06)]
            "
          >
            <h3 className="text-3xl font-bold text-[#111]">
              500+
            </h3>

            <p className="mt-1 text-sm text-[#666]">
              Products
            </p>
          </div>

          <div
            className="
              rounded-3xl
              bg-white
              p-5
              shadow-[0_15px_40px_rgba(0,0,0,0.06)]
            "
          >
            <h3 className="text-3xl font-bold text-[#111]">
              100%
            </h3>

            <p className="mt-1 text-sm text-[#666]">
              Quality Focus
            </p>
          </div>

          <div
            className="
              rounded-3xl
              bg-white
              p-5
              shadow-[0_15px_40px_rgba(0,0,0,0.06)]
            "
          >
            <h3 className="text-3xl font-bold text-[#111]">
              24/7
            </h3>

            <p className="mt-1 text-sm text-[#666]">
              Support
            </p>
          </div>

        </div>

      </div>

    </div>

    {/* BOTTOM CONTENT */}
    <div
      className="
        mt-16
        rounded-[35px]
        border
        border-white/40
        bg-white/70
        p-8
        md:p-12
        shadow-[0_20px_70px_rgba(0,0,0,0.06)]
        backdrop-blur-xl
      "
    >

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* BOX 1 */}
        <div>

          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-[#f3efe8]
              text-2xl
              shadow-inner
            "
          >
            🌍
          </div>

          <h3 className="mt-5 text-xl font-bold text-[#111]">
            Global Sourcing
          </h3>

          <p className="mt-3 text-[15px] leading-7 text-[#666]">
            Extensive supplier networks delivering international-grade
            industrial products and safety equipment.
          </p>

        </div>

        {/* BOX 2 */}
        <div>

          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-[#eef2ff]
              text-2xl
              shadow-inner
            "
          >
            ⚡
          </div>

          <h3 className="mt-5 text-xl font-bold text-[#111]">
            Reliable Supply
          </h3>

          <p className="mt-3 text-[15px] leading-7 text-[#666]">
            Consistent inventory availability with efficient logistics
            and timely delivery support.
          </p>

        </div>

        {/* BOX 3 */}
        <div>

          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-[#fff7ed]
              text-2xl
              shadow-inner
            "
          >
            🛡️
          </div>

          <h3 className="mt-5 text-xl font-bold text-[#111]">
            Quality Assurance
          </h3>

          <p className="mt-3 text-[15px] leading-7 text-[#666]">
            Every product undergoes strict quality checks to ensure
            safety, durability, and performance standards.
          </p>

        </div>

      </div>

    </div>

  </div>

</section>

     

      {/* MISSION & VISION */}
   {/* MISSION & VISION */}
<section className="relative py-7 overflow-hidden bg-[#f8f5ef]">

  {/* BLURS */}
  <div className="absolute top-0 left-0 h-[300px] w-[300px] rounded-full bg-[#d7c2a3]/20 blur-3xl" />
  <div className="absolute bottom-0 right-0 h-[250px] w-[250px] rounded-full bg-[#c7d2fe]/20 blur-3xl" />

  <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8">

    {/* TITLE */}
    <div className="text-center mb-14">

      <span
        className="
          inline-flex
          rounded-full
          border
          border-[#d7c2a3]
          bg-white/80
          px-5
          py-2
          text-[11px]
          font-semibold
          uppercase
          tracking-[0.3em]
          text-[#9f7a3d]
          shadow-sm
          backdrop-blur-xl
        "
      >
        Our Foundation
      </span>

      <h2 className="mt-5 text-4xl md:text-6xl font-bold text-[#111]">
        Mission & Vision
      </h2>

      <p className="mt-4 max-w-2xl mx-auto text-[15px] md:text-[17px] leading-8 text-[#666]">
        Driven by quality, reliability, and innovation, JL Industries
        continues to build strong relationships through dependable
        industrial supply solutions.
      </p>

    </div>

    {/* CARDS */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

      {/* MISSION */}
      <div
        className="
          group
          relative
          overflow-hidden
          rounded-[35px]
          border
          border-white/40
          bg-white/80
          p-8
          shadow-[0_20px_70px_rgba(0,0,0,0.06)]
          backdrop-blur-xl
          transition-all
          duration-500
          hover:-translate-y-2
          hover:shadow-[0_30px_80px_rgba(0,0,0,0.10)]
        "
      >

        {/* GLOW */}
        <div
          className="
            absolute
            top-0
            right-0
            h-32
            w-32
            rounded-full
            bg-[#c7d2fe]/20
            blur-3xl
          "
        />

        {/* ICON */}
        <div
          className="
            relative
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            bg-[#eef2ff]
            shadow-inner
            text-3xl
          "
        >
          🚀
        </div>

        {/* CONTENT */}
        <h3 className="mt-7 text-3xl font-bold text-[#111]">
          Our Mission
        </h3>

        <p className="mt-5 text-[15px] md:text-[16px] leading-8 text-[#555]">
          To provide high-quality industrial and safety products
          through reliable sourcing, efficient distribution, and
          customer-focused service that delivers long-term value,
          trust, and operational excellence.
        </p>

        {/* BOTTOM LINE */}
        <div
          className="
            mt-8
            h-[2px]
            w-20
            rounded-full
            bg-gradient-to-r
            from-[#1e3a8a]
            to-transparent
          "
        />

      </div>

      {/* VISION */}
      <div
        className="
          group
          relative
          overflow-hidden
          rounded-[35px]
          border
          border-white/40
          bg-white/80
          p-8
          shadow-[0_20px_70px_rgba(0,0,0,0.06)]
          backdrop-blur-xl
          transition-all
          duration-500
          hover:-translate-y-2
          hover:shadow-[0_30px_80px_rgba(0,0,0,0.10)]
        "
      >

        {/* GLOW */}
        <div
          className="
            absolute
            bottom-0
            left-0
            h-32
            w-32
            rounded-full
            bg-[#d7c2a3]/20
            blur-3xl
          "
        />

        {/* ICON */}
        <div
          className="
            relative
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            bg-[#fff7ed]
            shadow-inner
            text-3xl
          "
        >
          👑
        </div>

        {/* CONTENT */}
        <h3 className="mt-7 text-3xl font-bold text-[#111]">
          Our Vision
        </h3>

        <p className="mt-5 text-[15px] md:text-[16px] leading-8 text-[#555]">
          To become a globally recognized importer and wholesaler
          known for premium quality products, sourcing excellence,
          innovation, and long-term partnerships across industries.
        </p>

        {/* BOTTOM LINE */}
        <div
          className="
            mt-8
            h-[2px]
            w-20
            rounded-full
            bg-gradient-to-r
            from-[#9f7a3d]
            to-transparent
          "
        />

      </div>

    </div>

  </div>

</section>

  
<section className="relative overflow-hidden bg-white py-5">

  <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">

    {/* HEADING */}
    <div className="text-center">

      <span
        className="
          inline-flex
          rounded-full
          border
          border-[#d7c2a3]
          bg-white/80
          px-5
          py-2
          text-[11px]
          font-semibold
          uppercase
          tracking-[0.3em]
          text-[#9f7a3d]
          shadow-sm
          backdrop-blur-xl
        "
      >
        Why Choose JL Industries
      </span>

      <h2
        className="
          mt-5
          text-4xl
          md:text-6xl
          font-bold
          leading-tight
          text-[#111]
        "
      >
        What We Offer
      </h2>

      <p
        className="
          mt-2
          max-w-3xl
          mx-auto
          text-[15px]
          md:text-[17px]
          leading-8
          text-[#666]
        "
      >
        A trusted importer and wholesaler delivering premium-quality
        industrial and lifestyle products with reliability, consistency,
        and competitive pricing.
      </p>

    </div>

    {/* CONTENT */}
    <div
      className="
        mt-5
        grid
        grid-cols-1
        lg:grid-cols-2
        gap-14
        items-center
      "
    >

      {/* IMAGE SIDE */}
      <div className="relative group">

        {/* GLOW */}
        <div
          className="
            absolute
            inset-0
            rounded-[35px]
            bg-gradient-to-br
            from-[#d7c2a3]/30
            to-[#1e3a8a]/10
            blur-2xl
            scale-105
          "
        />

        <img
          className="
            relative
            w-full
            rounded-[35px]
            object-contain
            shadow-[0_25px_80px_rgba(0,0,0,0.12)]
          "
          src="/bg-images/JL.webp"
          alt="JL Industries"
        />

        {/* FLOAT CARD */}
        <div
          className="
            absolute
            bottom-6
            left-6
            rounded-2xl
            border
            border-white/20
            bg-white/80
            px-5
            py-4
            backdrop-blur-xl
            shadow-xl
          "
        >
          <h3 className="text-2xl font-bold text-[#111]">
            Trusted by
          </h3>

          <p className="mt-1 text-sm text-[#666]">
            Retailers, Businesses & Bulk Buyers
          </p>
        </div>

      </div>

      {/* RIGHT SIDE */}
      <div>

        <div className="space-y-8">

          {/* FEATURE 1 */}
          <div
            className="
              group
              flex
              gap-5
              rounded-[28px]
              border
              border-white/40
              bg-white/70
              p-6
              shadow-[0_15px_50px_rgba(0,0,0,0.05)]
              backdrop-blur-xl
              transition-all
              duration-500
              hover:-translate-y-1
            "
          >

            <div
              className="
                flex
                h-16
                w-16
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-[#eef2ff]
                text-3xl
                shadow-inner
              "
            >
              ⚡
            </div>

            <div>

              <h3 className="text-2xl font-bold text-[#111]">
                Wide Product Range
              </h3>

              <p className="mt-3 text-[15px] leading-8 text-[#666]">
                From industrial solutions and safety equipment to
                lifestyle and utility products — all sourced under one
                trusted network.
              </p>

            </div>

          </div>

          {/* FEATURE 2 */}
          <div
            className="
              group
              flex
              gap-5
              rounded-[28px]
              border
              border-white/40
              bg-white/70
              p-6
              shadow-[0_15px_50px_rgba(0,0,0,0.05)]
              backdrop-blur-xl
              transition-all
              duration-500
              hover:-translate-y-1
            "
          >

            <div
              className="
                flex
                h-16
                w-16
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-[#fff7ed]
                text-3xl
                shadow-inner
              "
            >
              💎
            </div>

            <div>

              <h3 className="text-2xl font-bold text-[#111]">
                Quality & Affordability
              </h3>

              <p className="mt-3 text-[15px] leading-8 text-[#666]">
                Carefully sourced products designed to deliver
                durability, performance, and excellent value at
                competitive wholesale pricing.
              </p>

            </div>

          </div>

          {/* FEATURE 3 */}
          <div
            className="
              group
              flex
              gap-5
              rounded-[28px]
              border
              border-white/40
              bg-white/70
              p-6
              shadow-[0_15px_50px_rgba(0,0,0,0.05)]
              backdrop-blur-xl
              transition-all
              duration-500
              hover:-translate-y-1
            "
          >

            <div
              className="
                flex
                h-16
                w-16
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-[#f3efe8]
                text-3xl
                shadow-inner
              "
            >
              🤝
            </div>

            <div>

              <h3 className="text-2xl font-bold text-[#111]">
                Reliable Wholesale Supply
              </h3>

              <p className="mt-3 text-[15px] leading-8 text-[#666]">
                Trusted by businesses for consistent inventory,
                dependable logistics, smooth bulk transactions, and
                responsive customer support.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  </div>

</section>
      {/* Closing */}
    </section>
  );
};

export default About;
