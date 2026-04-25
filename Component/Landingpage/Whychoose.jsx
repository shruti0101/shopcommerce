import React from "react";
import {
  Package,
  BadgeDollarSign,
  ShieldCheck,
  Truck,
  Users,
  Headphones,
} from "lucide-react";

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

const Whychoose = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="max-w-7xl px-4 py-6 md:py-9 mx-auto">
        
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-black mb-6 md:mb-12">
          Why Choose Us?
        </h1>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
          {features.map((item, index) => (
            <div key={index}>
              <div className="relative h-full bg-white border border-gray-200 rounded-xl p-5 md:p-6 overflow-hidden group transition-all duration-300 hover:shadow-xl">
                
                {/* SLIDE HOVER EFFECT */}
                <div className="absolute inset-0 bg-[#ffed00] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0"></div>

                {/* Content */}
                <div className="relative z-10">
                  
                  {/* Icon + Title */}
                  <div className="flex items-start gap-3 mb-3">
                    
                    {/* Icon */}
                    <div className="w-11 h-11 flex items-center justify-center rounded-full bg-indigo-100 text-[#033665] flex-shrink-0 group-hover:bg-white transition">
                      <div className="w-5 h-5">
                        {item.icon}
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-base md:text-lg font-semibold text-gray-900 leading-snug">
                      {item.title}
                    </h2>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {item.desc}
                  </p>

                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Whychoose;