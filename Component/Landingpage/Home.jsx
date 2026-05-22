"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import {
  CheckCircle,
  
} from "lucide-react";

import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Category from "./Category";

import Clientele from "./Clientele";
import Catslider from "./Catslider";
import Bestsellers from "./BestSeller";
import Whychoose from "./Whychoose";
import TestimonialSlider from "./Testimonial";

import Subcategory from "../Subcategory";
export default function Hero() {


// ✅ ADD YOUR IMAGES HERE
const desktopBanners = [
  "/banner4.webp",
  "/banner/banner5.png",
    "/banner/banner-2.png",
    "/banner/banner-1.png",
    // "/banner/banner6.png",
  
];

const mobileBanners = [
  "/banner/mob1.png",
  "/banner/mob2.png",
   "/banner/mob3.png",
    "/banner/mob4.png",
    "/banner/mob6.png",
];







  return (
    <>

   {/* HERO */}


{/* h-[400px] sm:h-[25vh] md:h-[30vh] xl:h-[85vh]  */}

      <section className="w-full bg-[#f7f7f7]">
        <div className="relative h-[400px]  md:h-full md:w-full overflow-hidden">

          {/* ONE SWIPER (handles both desktop + mobile) */}
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation={{
              nextEl: ".hero-next",
              prevEl: ".hero-prev",
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            loop
            className=" h-full w-full"
          >
            {desktopBanners.map((desk, i) => (
              <SwiperSlide key={i}>
                <div className="relative w-full h-full ">
                  
                  {/* Desktop Image */}
                  <Image
                    src={desk}
                    alt="banner"
                    width={2000}
                    height={1500}
                    priority={i === 0}
                    className="hidden md:block max-w-full h-auto  xl:hfull w-full"
                  />

                  {/* Mobile Image */}
                  <Image
                    src={mobileBanners[i]}
                    alt="mobile banner"
                    fill
                    priority={i === 0}
                    className="block md:hidden max-w-full h-auto"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* ARROWS */}
          <button className="hero-prev absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-9 h-9 md:w-11 md:h-11 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg z-10">
            <ChevronLeft size={20} />
          </button>

          <button className="hero-next absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-9 h-9 md:w-11 md:h-11 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg z-10">
            <ChevronRight size={20} />
          </button>
        </div>

        {/* CATEGORY SLIDER */}
        <div className="md:mt-6">
          <Catslider />
        </div>
      </section>

      <Category></Category>

      <section className="w-full bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center md:gap-6 h-full">
          {/* LEFT CONTENT */}
          <div className="md:px-8 p-5 lg:col-span-4 flex flex-col justify-center">
            <p className="text-xs font-bebas tracking-[3px] text-gray-500 mb-2">
              NEW COLLECTION
            </p>

            <h1 className="text-2xl xl:text-5xl font-bebas  font-semibold tracking-wide mb-4">
              OUR BESTSELLING COLLECTION
            </h1>

            <p className="text-black text-md leading-relaxed mb-4 xl:mb-6 max-w-sm">
              Customize freely! Reli adapts to your child's changing passions
              with versatile fronts—choose smooth wardrobes or open, playful
              shelves.
            </p>

            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 text-sm font-medium w-fit flex items-center gap-2 transition">
              SHOP COLLECTION
              <span>→</span>
            </button>
          </div>

          {/* RIGHT SLIDER */}
          <div className="relative lg:col-span-8 h-[160px] md:h-[500px] lg:h-full overflow-hidden">
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{ delay: 3500, disableOnInteraction: false }}
              loop
              pagination={{ clickable: true }}
              className="h-full"
            >
              {["/slider1.png", "/slider-2.png"].map((img, i) => (
                <SwiperSlide key={i}>
                  <div className="relative w-full h-full">
                    <Image
                      src={img}
                      width={1200}
                      height={700}
                      alt="slide"
                      className="max-w-full h-auto"
                      priority={i === 0}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      <Bestsellers></Bestsellers>

      {/* <div className="w-full h-[50vh] verflow-hidden relative">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          loop
          className="h-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className=" h-full items-center ">
               
                <div className="">
                  <Image
                    src={slide.image}
                    alt="card"
                    fill
                    className="object-cover "
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div> */}
      <Clientele></Clientele>

      {/* <section className="w-full mt-3 mx-auto rounded-xl bg-gray-50 py-16 px-6 md:px-16">
      
        <div className="flex items-center gap-6 mb-12">
          <h2 className="text-xl font-semibold text-gray-700 whitespace-nowrap">
            Our Services
          </h2>
          <div className="w-full h-[1px] bg-gray-300"></div>
        </div>

      
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-20 gap-y-12">
          {services.map((item, index) => (
            <div key={index} className="flex items-start gap-5">
            
              <div className="mt-1">{item.icon}</div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {item.title}
                </h3>

                <p className="text-black text-sm leading-relaxed max-w-sm">
                  {item.desc}
                </p>

                <div className="mt-3 flex items-center gap-2 text-blue-500 text-sm font-medium cursor-pointer">
                  Read More
                  <span className="text-lg">›</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section> */}

      <Whychoose></Whychoose>
      <Subcategory></Subcategory>

    <div className="bg-white">

  {/* WHY SECTION */}
  <section className="py-10 ">
    <div className=" mx-auto px-5 md:px-12">
      <h2 className="text-3xl md:text-5xl font-bebas tracking-wide leading-tight mb-4">
        Why J L Industries Hub Private Limited is a Preferred Choice?
      </h2>

      <p className="text-lg text-black mb-8 leading-relaxed">
        When you can access a wide range of high-quality products from one
        trusted source, it naturally becomes your go-to destination.
        Here’s what sets us apart:
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        {[
          "Extensive product variety",
          "Strong quality assurance",
          "Competitive market pricing",
          "Reliable supply chain",
          "Customer-centric services",
          "Custom solutions for bulk  needs",
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-3">
            <CheckCircle className="text-black mt-1" size={20} />
            <p className="text-black text-lg">{item}</p>
          </div>
        ))}
      </div>
    </div>
  </section>

  <TestimonialSlider></TestimonialSlider>




  {/* USE CASES */}
  {/* <section className="bg-[#fafafa] py-12 ">
    <div className=" mx-auto px-8 md:px-12">
      <h2 className="text-3xl md:text-5xl font-semibold mb-5">
        Perfect for Every Space
      </h2>

      <div className="space-y-6">
        {[
          {
            title: "Residential Spaces",
            desc: "Enhance comfort, design, and functionality in your home.",
          },
          {
            title: "Commercial Spaces",
            desc: "Provide durable and efficient solutions for offices, retail stores, and more.",
          },
          {
            title: "Hospitality Sector",
            desc: "Offer stylish and reliable products for hotels and guest spaces.",
          },
          {
            title: "Industrial Use",
            desc: "Ensure high-performance products for industrial applications.",
          },
        ].map((item, i) => (
          <div key={i}>
            <h4 className="text-xl font-semibold">{item.title}</h4>
            <p className="text-black text-md">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section> */}

  {/* GIFTS */}
  <section className="py-12 ">
    <div className=" mx-auto px-8 md:px-12">
      <h2 className="text-3xl md:text-5xl font-bebas tracking-wide mb-2">
        Gifts for Every Occasion

      </h2>

      <p className="text-lg text-black mb-5">
        Looking for the perfect gift? J L Industries Hub Private Limited
        offers a variety of products suitable for:
      </p>

      <div className="space-y-2 text-black text-lg">
        {[
          "● Housewarming gifts",
          "● Corporate gifting",
          "● Festive occasions",
          "● Personal celebrations",
        ].map((item, i) => (
          <p key={i}>{item}</p>
        ))}
      </div>

 
    </div>
  </section>

  {/* SHOPPING */}
  <section className="bg-white py-10 ">
    <div className=" mx-auto px-8 md:px-12">
      <h2 className="text-3xl md:text-5xl  mb-3 font-bebas tracking-wide">
        Easy and Convenient Shopping Experience
      </h2>

      <p className="text-lg text-black mb-5">
        We focus on providing a seamless and hassle-free experience for
        our customers:
      </p>

      <div className="space-y-2 text-black text-lg">
        {[
          "● User-friendly product selection",
          "● Detailed product specifications",
          "● Transparent pricing",
          "● Secure payment options",
        ].map((item, i) => (
          <p key={i}>{item}</p>
        ))}
      </div>

      <p className="text-black mt-8 text-xl leading-relaxed">
        Whether you are purchasing a single item or placing a bulk order,
        we ensure a smooth process from start to finish.
      </p>
    </div>
  </section>

</div>
    </>
  );
}

// const services = [
//   {
//     icon: <Truck size={42} className="text-blue-500" />,
//     title: "Shipping",
//     desc: "Abraa manages everything perfectly when it comes to getting your goods from the factory floor to your doorstep. Being a ...",
//   },
//   {
//     icon: <Warehouse size={42} className="text-blue-500" />,
//     title: "Warehousing",
//     desc: "Abraa.com is globally well-linked with multiple logistics and warehouse associates. Positioned in the heart of Dubai, w ...",
//   },
//   {
//     icon: <SearchCheck size={42} className="text-orange-500" />,
//     title: "Products Inspection",
//     desc: "At Abraa.com, every buyer’s product is physically verified through onsite inspection for those suppliers in the U.A.E. ...",
//   },
//   {
//     icon: <ShieldCheck size={42} className="text-blue-500" />,
//     title: "Buyer Protection",
//     desc: "Are you worried about account safety, payment security, and product quality while buying online? Worry no more, Abraa of ...",
//   },
//   {
//     icon: <CreditCard size={42} className="text-orange-500" />,
//     title: "Secure Payment",
//     desc: "What is Abraa Secure Payment (ASP)? Abraa Secure Payment (ASP) is a payment gateway solution that grants high protectio ...",
//   },
//   {
//     icon: <Globe size={42} className="text-blue-500" />,
//     title: "On site Verification",
//     desc: "Any global-based supplier can sign up for free on Abraa.com and instantly launch their product, however with a systemati ...",
//   },
// ];

// const slides = [
//   {
//     title: "Mashreq noon Savings Account",
//     subtitle: "noon | mashreq",
//     button: "LEARN MORE",
//     image: "/slide1.avif",
//   },
//   {
//     title: "Premium Banking Experience",
//     subtitle: "Fast • Secure • Digital",
//     button: "GET STARTED",
//     image: "/slider2.avif",
//   },
// ];

const banners = [
  "/banner/banner3.png",

  "/banner/banner5.png",

  // "/banner2.gif",
  // "/banner3.avif",
  // "/banner1.avif",
];

const categories = [
  { name: "Led Lights", image: "/led-spot-light.jpg" },
  { name: "Fitness Product", image: "/download.jfif" },
  { name: "Kitchen Product", image: "/images.jfif" },
  { name: "Massager Product", image: "/massage.jfif" },
  {
    name: "House Hold Product",
    image: "/38603104-1c4e-4fa8-94f3-f355971cf90f.avif",
  },
  { name: "Candle & Lamps", image: "/download(1).jfif" },
  { name: "Table Fans", image: "/tablefan.jfif" },
  { name: "Vaccum Flask", image: "/vaccum.jfif" },
  { name: "Slimming Patch", image: "/patch.webp" },
  { name: "Led Lights", image: "/led-spot-light.jpg" },
  { name: "Fitness Product", image: "/download.jfif" },
  { name: "Kitchen Product", image: "/images.jfif" },
  { name: "Massager Product", image: "/massage.jfif" },
  {
    name: "House Hold Product",
    image: "/38603104-1c4e-4fa8-94f3-f355971cf90f.avif",
  },
  { name: "Candle & Lamps", image: "/download(1).jfif" },
  { name: "Table Fans", image: "/tablefan.jfif" },
  { name: "Vaccum Flask", image: "/vaccum.jfif" },
  { name: "Slimming Patch", image: "/patch.webp" },
];
