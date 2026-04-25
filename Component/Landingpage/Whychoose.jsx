import React from "react";

const features = [
  {
    title: "Wide Product Variety",
    desc: "We offer a comprehensive range of products across multiple categories, making us a one-stop solution.",
    icon: <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>,
  },
  {
    title: "Competitive Pricing",
    desc: "Our strong sourcing network allows us to provide cost-effective wholesale pricing.",
    icon: (
      <>
        <circle cx="6" cy="6" r="3"></circle>
        <circle cx="6" cy="18" r="3"></circle>
        <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
      </>
    ),
  },
  {
    title: "Quality Assurance",
    desc: "All products go through strict quality checks to ensure performance and durability.",
    icon: <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>,
  },
  {
    title: "Timely Delivery",
    desc: "Efficient logistics ensure your orders are delivered on time, every time.",
    icon: <path d="M3 3h18v13H3zM8 21h8"></path>,
  },
  {
    title: "Customer-Centric Approach",
    desc: "We prioritize long-term relationships by focusing on trust, transparency, and service excellence.",
    icon: <circle cx="12" cy="7" r="4"></circle>,
  },

  // ✅ New Point Added
  {
    title: "Reliable Support",
    desc: "Our dedicated support team is always ready to assist you with queries, ensuring a smooth and hassle-free experience.",
    icon: (
      <>
        <path d="M18 10c0-4-3-7-6-7s-6 3-6 7v4a4 4 0 004 4h4a4 4 0 004-4z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </>
    ),
  },
];

const Whychoose = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="max-w-7xl px-4 pb-3 pt-3 md:py-8 mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-center text-black mb-3 md:mb-12">
          Why Choose Us?
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {features.map((item, index) => (
            <div key={index} className="p-2 md:p-4">
              <div className="relative flex flex-col h-full bg-white shadow-md rounded-xl p-4 overflow-hidden group hover:shadow-lg hover:scale-105 transition">
                {/* Overlay */}
                <div className="absolute inset-0 bg-[#ffed00] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out z-0"></div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon + Title (same line) */}
                  <div className="flex flex-col  md:flex-row items-start md:items-center gap-3 mb-3">
                    <div className="w-10 h-10 flex items-center  justify-center rounded-full bg-indigo-100 text-[#033665] flex-shrink-0">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        {item.icon}
                      </svg>
                    </div>

                    <h2 className="text-gray-900 text-sm md:text-xl font-bold group-hover:text-black">
                      {item.title}
                    </h2>
                  </div>

                  {/* Description below */}
                  <p className="leading-relaxed text-sm text-black group-hover:text-black">
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
