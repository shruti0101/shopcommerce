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

  <div
    className="
      mx-auto
      grid
      max-w-[1500px]
      grid-cols-1
      gap-8

      px-4
      py-10

      sm:px-6
      md:px-8
      lg:grid-cols-2
      lg:gap-16
      lg:px-18
      lg:py-14
    "
  >

    {/* LEFT */}
    <div>

      {/* SMALL LABEL */}
      <div className="mb-4  flex items-center gap-3">

        <div className="h-[2px] w-8 md:w-10 bg-[#D5A63B]" />

        <span
          className="
            text-[11px]
            sm:text-[12px]
            md:text-[14px]

            font-semibold
            uppercase

            tracking-[0.18em]
            md:tracking-[0.22em]

            text-[#D5A63B]
            
          "
        >
          Why Choose Us
        </span>
      </div>

      {/* HEADING */}
      <h2
        className="
          text-[30px]
          sm:text-[38px]
          md:text-[48px]
          lg:text-[60px]

          font-semibold

          leading-[1.05]

          tracking-[-1px]
          md:tracking-[-2px]

          text-white
        "
        style={{
          fontFamily: "Georgia, serif",
        }}
      >
        The Preferred Choice

        <br className="hidden sm:block" />

        {" "}for{" "}

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

          text-[15px]
          sm:text-[17px]
          md:text-[20px]

          leading-[1.7]
          md:leading-[1.8]

          text-white
        "
      >
        When you can access a wide range of
        high-quality products from one trusted
        source, it naturally becomes your go-to
        destination.

        <br />
        <br className="hidden sm:block" />

        Here's what sets JL Industries apart.
      </p>
    </div>
  </div>
</div>

 {/* GRID */}
<div className="grid grid-cols-2 xl:grid-cols-3">

  {features.map((item, index) => (
    <div
      key={index}
      className="
        group relative
        min-h-[220px] md:min-h-[260px]
        border-b
        border-r
        border-[#DED8D0]
        bg-[#F5F5F5]

        px-4
        py-5

        sm:px-6
        md:px-8
        lg:px-10

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

          mt-2 md:mt-6

          flex
          h-[42px] w-[42px]
          md:h-[56px] md:w-[56px]

          items-center justify-center
          rounded-[14px] md:rounded-[18px]

          bg-[#041A32]
          text-[#D5A63B]

          transition-all
          duration-500
          group-hover:scale-110
          group-hover:-translate-y-1
          group-hover:shadow-[0_10px_30px_rgba(4,26,50,0.18)]
        "
      >
        <div className="scale-[0.8] md:scale-100">
          {item.icon}
        </div>
      </div>

      {/* TITLE */}
      <h3
        className="
          relative z-10

          mt-4 md:mt-8

          text-[15px]
          sm:text-[17px]
          md:text-[22px]

          font-semibold
          leading-[1.35]
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

          text-[12px]
          sm:text-[14px]
          md:text-[18px]

          leading-[1.5]
          md:leading-[1.8]

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