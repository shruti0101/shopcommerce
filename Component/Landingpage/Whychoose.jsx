"use client";

import {
  Headphones ,
  BadgeDollarSign,
  Users,
  Package,
  Truck,
  ShieldCheck ,
} from "lucide-react";

export default function WhyChooseUs() {
 const features = [
  {
    title: "Wide Product Variety",
    desc: "We offer a comprehensive range of products across multiple categories, making us a one-stop solution.",
    icon: <Package />,
  },
  {
    title: "Competitive Pricing",
    desc: "Our strong sourcing network allows us to provide cost-effective wholesale pricing.",
    icon: <BadgeDollarSign />,
  },
  {
    title: "Quality Assurance",
    desc: "All products go through strict quality checks to ensure performance and durability.",
    icon: <ShieldCheck />,
  },
  {
    title: "Timely Delivery",
    desc: "Efficient logistics ensure your orders are delivered on time, every time.",
    icon: <Truck />,
  },
  {
    title: "Customer-Centric Approach",
    desc: "We prioritize long-term relationships by focusing on trust, transparency, and service excellence.",
    icon: <Users />,
  },
  {
    title: "Reliable Support",
    desc: "Our dedicated support team is always ready to assist you with queries, ensuring a smooth and hassle-free experience.",
    icon: <Headphones />,
  },
];

  return (
    <section className="w-full bg-[#F5F5F5] overflow-hidden">

      {/* TOP SECTION */}
      <div className="relative bg-[#041A32] overflow-hidden">

        {/* CIRCLE SHAPES */}
        <div
          className="
            absolute 
            left-[32%] 
            top-[40px]
            h-[250px] 
            w-[250px]
            rounded-full 
            border-[22px] 
            border-[#1b2d42]/70
          "
        />

        <div
          className="
            absolute 
            right-[-120px] 
            top-[-140px]
            h-[420px] 
            w-[420px]
            rounded-full 
            border-[34px] 
            border-[#1b2d42]/70
          "
        />

        <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-16 px-6 py-8 lg:grid-cols-2 lg:px-18">

          {/* LEFT */}
          <div>

            {/* SMALL LABEL */}
            <div className="mb-6 flex items-center gap-3">
              <div className="h-[2px] w-10 bg-[#D5A63B]" />

              <span
                className="
                  text-[14px]
                  font-semibold
                  uppercase
                  tracking-[0.22em]
                  text-[#D5A63B]
                "
              >
                Why Choose Us
              </span>
            </div>

            {/* HEADING */}
            <h2
              className="
                
                text-[38px]
                font-semibold
                leading-[1.04]
                tracking-[-2px]
                text-white
                lg:text-[60px]
              "
              style={{
                fontFamily: "Georgia, serif",
              }}
            >
              The Preferred Choice
          
              for{" "}
              <span className="italic text-[#E1BC63]">
                Smart Buyers
              </span>
            </h2>
          </div>

          {/* RIGHT */}
          <div className="flex items-center lg:justify-end">

            <p
              className="
                max-w-[560px]
                text-[20px]
                leading-[1.8]
                text-white
              "
            >
              When you can access a wide range of high-quality
              products from one trusted source, it naturally becomes
              your go-to destination.
              <br />
              Here's what sets JL Industries apart.
            </p>
          </div>
        </div>
      </div>

      {/* GRID */}
   {/* GRID */}
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">

  {features.map((item, index) => (
    <div
      key={index}
      className="
        group relative
        min-h-[208px]
        border-b
        border-r
        border-[#DED8D0]
        bg-[#F5F5F5]
        px-10
        py-5
        overflow-hidden
        transition-all
        duration-500
        hover:bg-[#f0ece4]
      "
    >

      {/* HOVER BORDER BOTTOM */}
      <span
        className="
          absolute
          bottom-0
          left-0
          h-[4px]
          w-0
          bg-[#e1bc63]
          transition-all
          duration-500
          group-hover:w-full
        "
      />

      {/* HOVER GLOW */}
      <div
        className="
          absolute
          inset-0
          opacity-0
          transition-all
          duration-500
          group-hover:opacity-100
          bg-gradient-to-br
          from-[#D5A63B]/5
          to-transparent
        "
      />

      {/* ICON BOX */}
      <div
        className="
          relative z-10
          mt-8
          flex h-[56px] w-[56px]
          items-center justify-center
          rounded-[18px]
          bg-[#041A32]
          text-[#D5A63B]
          transition-all
          duration-500
          group-hover:scale-110
          group-hover:-translate-y-1
          group-hover:shadow-[0_10px_30px_rgba(4,26,50,0.18)]
        "
      >
        {item.icon}
      </div>

      {/* TITLE */}
      <h3
        className="
          relative z-10
          mt-8
          text-[22px]
          font-semibold
          leading-[1.4]
          tracking-[-0.5px]
          text-[#1B2430]
          transition-all
          duration-300
          group-hover:text-[#041A32]
        "
      >
        {item.title}
      </h3>

      {/* DESC */}
      <p
        className="
          relative z-10
          mt-2
          max-w-[420px]
          text-[18px]
          leading-[1.8]
          text-black
          transition-all
          duration-300
          group-hover:text-[#3b4654]
        "
      >
        {item.desc}
      </p>
    </div>
  ))}
</div>
    </section>
  );
}