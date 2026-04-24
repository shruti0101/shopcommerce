"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";

const About = () => {
  const slides = [
    {
      title: "RENEWED TECH",
      subtitle: "Premium Quality • Lower Price",
      offer: "Save Up to 60% off",
      image: "/catbg1.avif",
    },
    {
      title: "SMART DEVICES",
      subtitle: "Latest Tech • Best Deals",
      offer: "Up to 50% off",
      image: "/catbg2.avif",
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
                <div className="relative h-[300px] md:h-[340px]">
                  {/* IMAGE */}
                  <img
                    src={slide.image}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Description */}

      <section className="text-gray-600 body-font overflow-hidden">
        <div className="w-full px-4 md:px-6 lg:px-10 pt-16 pb-10">
          <div className="w-full mx-auto flex flex-wrap items-center">
            {/* IMAGE */}
            <img
              alt="JL Industries"
              className="lg:w-[55%] w-full h-[250px] sm:h-[320px] md:h-[400px] object-cover object-center rounded-xl"
              src="/bg-images/about.webp"
            />

            {/* CONTENT */}
            <div className="lg:w-[40%] w-full lg:pl-10 mt-6 lg:mt-0">
              <h1 className="text-gray-900 text-2xl md:text-3xl font-semibold mb-3">
                About JL Industries
              </h1>

              <p className="leading-relaxed text-black text-sm md:text-base">
                JL Industries is a trusted name in the field of industrial
                supply and safety solutions, known for delivering high-quality
                products with reliability and consistency. As a leading
                wholesaler and importer, we are committed to bridging the gap
                between global manufacturers and local industries by providing
                premium products at competitive prices.
              </p>

              <p className="leading-relaxed text-black text-sm md:text-base mt-3">
                We take pride in our efficient supply chain management, ensuring
                timely availability of products for our clients across various
                sectors. Every product we supply undergoes strict quality checks
                to ensure performance, durability, and safety compliance.
              </p>
            </div>
             <div className="max-w-7xl mt-7 px-5  text-black text-sm md:text-base leading-relaxed md:text-start  mb-10">
        <p>
          With a strong focus on quality, sourcing excellence, and customer
          satisfaction, JL Industries specializes in importing and supplying a
          wide range of industrial equipment, fire protection systems, and
          safety products. Our extensive network of global suppliers enables us
          to offer advanced and durable solutions that meet international
          standards and cater to diverse industrial requirements. Driven by
          years of industry experience and a customer-centric approach, JL
          Industries has built long-term relationships with clients by offering
          reliable sourcing, bulk supply capabilities, competitive pricing, and
          responsive support. Our goal is to support businesses with dependable
          products that enhance safety, productivity, and operational
          efficiency.
        </p>
      </div>
          </div>
        </div>
      </section>

     

      {/* MISSION & VISION */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {/* Mission */}
        <div className="flex gap-4 border rounded-lg p-5">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-100 shrink-0">
            <svg
              className="w-6 h-6"
              stroke="#1E3A8A"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
            </svg>
          </div>
          <div>
            <h2 className="font-bold text-lg mb-2">Our Mission</h2>
            <p className="text-sm text-gray-600">
              To provide high-quality industrial and safety products through
              reliable sourcing and efficient distribution, ensuring value,
              performance, and customer satisfaction.
            </p>
          </div>
        </div>

        {/* Vision */}
        <div className="flex gap-4 border rounded-lg p-5">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-100 shrink-0">
            <svg
              className="w-6 h-6"
              stroke="#1E3A8A"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <div>
            <h2 className="font-bold text-lg mb-2">Our Vision</h2>
            <p className="text-sm text-gray-600">
              To become a leading importer and wholesaler recognized for quality
              products, global sourcing excellence, and strong customer
              relationships in the industrial supply sector.
            </p>
          </div>
        </div>
      </div>

      <style>{`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

  * {
    font-family: 'Poppins', sans-serif;
  }
`}</style>

      <h1 className="text-3xl font-semibold text-center mx-auto">
        About JL Industries
      </h1>

      <p className="text-sm text-slate-500 text-center mt-2 max-w-md mx-auto">
        A trusted importer and wholesaler delivering quality products across
        health, beauty, kitchen, office, and fitness categories.
      </p>

      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 px-4 md:px-0 py-10">
        <img
          className="max-w-sm w-full rounded-xl h-[50vh] md:h-auto"
          src="/bg-images/JL.webp/"
          alt="JL Industries"
        />

        <div>
          <h1 className="text-3xl font-semibold">What We Offer</h1>

          <p className="text-sm text-slate-500 mt-2">
            We provide a wide range of high-quality products sourced globally,
            ensuring affordability, reliability, and consistency for businesses
            and bulk buyers.
          </p>

          <div className="flex flex-col gap-10 mt-6">
            {/* Feature 1 */}
            <div className="flex items-center gap-4">
              <div className="size-9 p-2 bg-indigo-50 border border-indigo-200 rounded">
                 <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/flashEmoji.png" alt="" />
              </div>
              <div>
                <h3 className="text-base font-medium text-slate-600">
                  Wide Product Range
                </h3>
                <p className="text-sm text-slate-500">
                  From health & beauty to kitchen, office, and fitness products
                  — all in one place.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-center gap-4">
              <div className="size-9 p-2 bg-indigo-50 border border-indigo-200 rounded">
                <img
                  src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/colorsEmoji.png"
                  alt=""
                />
              </div>
              <div>
                <h3 className="text-base font-medium text-slate-600">
                  Quality & Affordability
                </h3>
                <p className="text-sm text-slate-500">
                  Carefully sourced products that ensure durability, value, and
                  competitive pricing.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-center gap-4">
              <div className="size-9 p-2 bg-indigo-50 border border-indigo-200 rounded">
                <img
                  src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/puzzelEmoji.png"
                  alt=""
                />
              </div>
              <div>
                <h3 className="text-base font-medium text-slate-600">
                  Reliable Wholesale Supply
                </h3>
                <p className="text-sm text-slate-500">
                  Trusted by retailers and businesses for consistent supply and
                  smooth bulk transactions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Closing */}
    </section>
  );
};

export default About;
