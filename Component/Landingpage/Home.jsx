"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import {
  CheckCircle,
  Home,
  Utensils,
  Bath,
  Sparkles,
  Factory,
  HeartPulse
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

export default function Hero() {
  return (
    <>
    <section className="w-full bg-[#f7f7f7]">

  {/* HERO SECTION */}
  <div className="w-full  ">
    <div className="relative w-full h-[220px] sm:h-[260px] md:h-[320px] lg:h-[70vh] xl:h-[85vh] overflow-hidden">

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{
          nextEl: ".hero-next",
          prevEl: ".hero-prev",
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        className="h-full w-full"
      >
        {banners.map((item, i) => (
          <SwiperSlide key={i}>
            <div className="relative w-full h-full">
              <Image
                src={item}
                width={1500}
                height={1000}
                alt="banner"
                priority={i === 0}
                className="max-w-full h-auto md:w-full md:h-full  rounded-lg"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ARROWS */}
      <button className="hero-prev absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-9 h-9 md:w-11 md:h-11 bg-white/80 hover:bg-white backdrop-blur rounded-full flex items-center justify-center shadow-lg transition">
        <ChevronLeft size={20} />
      </button>

      <button className="hero-next absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-9 h-9 md:w-11 md:h-11 bg-white/80 hover:bg-white backdrop-blur rounded-full flex items-center justify-center shadow-lg transition">
        <ChevronRight size={20} />
      </button>
    </div>
  </div>

  {/* CATEGORY SLIDER */}
  <div className="mt-4 md:mt-6">
    <Catslider />
  </div>


</section>

   

      <Category></Category>

         <section className="w-full bg-[#f6f6f6]">
  <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-6 h-full">

    {/* LEFT CONTENT */}
    <div className="px-8 p-5 lg:col-span-4 flex flex-col justify-center">
      <p className="text-xs tracking-[3px] text-gray-500 mb-2">
        NEW COLLECTION
      </p>

      <h1 className="text-3xl lg:text-4xl font-semibold tracking-tight mb-4">
        OUR BESTSELLING COLLECTION
      </h1>

      <p className="text-black text-md leading-relaxed mb-6 max-w-sm">
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
    <div className="relative lg:col-span-8 h-[400px] md:h-[500px] lg:h-full overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        loop
        pagination={{ clickable: true }}
        className="h-full"
      >
        {["/slider1.png", "/slider-2.png", ].map((img, i) => (
          <SwiperSlide key={i}>
            <div className="relative w-full h-full">
              <Image
                src={img}
                fill
                alt="slide"
                className="object-cover"
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



    <div className="bg-white overflow-hidden">

      {/* WHY SECTION */}
      <section className="relative bg-[#EEF1EA] text-black py-15">
    

        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-semibold mb-4 leading-tight">
            Why J L Industries Hub Private Limited is a Preferred Choice?
          </h2>

          <p className="text-black max-w-3xl mx-auto mb-8 text-lg">
            When you can access a wide range of high-quality products from one trusted source, it naturally becomes your go-to destination. Here’s what sets us apart:
          </p>


          <div className="grid md:grid-cols-3 gap-6">
            {[
              "Extensive product variety",
              "Strong quality assurance",
              "Competitive market pricing",
              "Reliable supply chain",
              "Customer-centric services",
              "Custom solutions for bulk  needs",
              
            ].map((item, i) => (
              <div
                key={i}
                className="group bg-black/40 flex items-center gap-3 backdrop-blur-lg border border-white/10 rounded-xl px-5 py-4 hover:bg-black/30 hover:scale-[1.02] transition"
              >
                <CheckCircle
                  size={18}
                  className="text-white"
                />
                <span className="text-md text-white">{item}</span>
              </div>
            ))}
          </div>

         
        </div>
      </section>

    
 {/* CATEGORIES */}
<section className="py-12 bg-[#f4f6f8]">
  <div className="max-w-7xl mx-auto px-4">

    <div className="grid md:grid-cols-2 gap-8">

      {[
        {
          icon: Home,
          title: "1. Home Furnishing Products",
          image: "/cat1.jpg",
          content: [
            "Your living space reflects your personality. We offer a wide range of furnishing products that enhance comfort and style, including:",
            "● Cushion covers and fillers",
            "● Curtains and drapes",
            "● Sofa covers and throws",
            "● Decorative fabrics",
            "These products are designed to add elegance while ensuring long-term usability.",
          ],
        },
        {
          icon: Utensils,
          title: "2. Kitchen & Utility Products",
          image: "/cat2.jpg",
          content: [
            "The kitchen is the heart of every home. Our kitchen range combines practicality with modern design:",
            "● Storage containers",
            "● Cookware and utensils",
            "● Kitchen organizers",
            "● Utility tools",
            "Each product is crafted to improve efficiency and convenience in your daily routine.",
          ],
        },
        {
          icon: Bath,
          title: "3. Bathroom Accessories",
          image: "/cat3.jpg",
          content: [
            "Transform your bathroom into a functional and stylish space with our range of:",
            "● Towel holders and racks",
            "● Soap dispensers and holders",
            "● Bathroom fittings and accessories",
            "● Utility storage solutions",
            "Our products ensure hygiene, durability, and modern aesthetics.",
          ],
        },
        {
          icon: Sparkles,
          title: "4. Home Decor Items",
          image: "/cat4.jpg",
          content: [
            "Enhance your interiors with thoughtfully designed decor products:",
            "● Decorative lighting solutions",
            "● Wall decor and art pieces",
            "● Showpieces and accessories",
            "● Functional decor items",
            "These elements help create a visually appealing and welcoming environment.",
          ],
        },
        {
          icon: Factory,
          title: "5. Industrial & Utility Solutions",
          image: "/cat5.jpg",
          content: [
            "J L Industries Hub Private Limited is not limited to home products—we also cater to industrial and commercial needs:",
            "● Custom hardware solutions",
            "● Industrial components",
            "● Utility equipment",
            "● Bulk supply services",
            "Our expertise allows us to serve both individual customers and large-scale businesses.",
          ],



          
        },


         {
    icon: HeartPulse, // 👈 import from lucide-react
    title: "6. Fitness & Health Products",
    image: "/cat6.webp",
    content: [
      "Stay active and maintain a healthy lifestyle with our range of fitness and health products:",
      "● Home workout equipment",
      "● Yoga mats and accessories",
      "● Fitness accessories",
      "● Health and wellness products",
      "Our products are designed to support your daily fitness routine and overall well-being.",
    ],
  },
      ].map((item, i) => (
        <div
          key={i}
          className="group  rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
        >
          {/* IMAGE */}
          <div className="relative h-[220px] overflow-hidden">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover group-hover:scale-105 transition duration-500"
            />

            {/* icon */}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur p-2 rounded-lg shadow">
              <item.icon size={30} />
            </div>
          </div>

          {/* CONTENT */}
          <div className="p-3">
            <h3 className="text-lg font-semibold mb-3">
              {item.title}
            </h3>

            <div className="space-y-1.5 text-black text-sm leading-relaxed">
              {item.content.map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>
          </div>
        </div>
      ))}

    </div>
  </div>
</section>


      {/* USE CASES */}
      <section className="bg-[#fafafa] py-24">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-14">
            Perfect for Every Space
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
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
              <div
                key={i}
                className="p-6 bg-white rounded-2xl hover:shadow-xl hover:-translate-y-1 transition"
              >
                <h4 className="font-semibold mb-2 text-lg">
                  {item.title}
                </h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GIFTS */}
      <section className="py-15 bg-[#F6F6F6] text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">
            Gifts for Every Occasion
          </h2>

          <p className="text-black mb-10 text-lg">
            Looking for the perfect gift? J L Industries Hub Private Limited offers a variety of products suitable for:
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {[
              "● Housewarming gifts",
              "● Corporate gifting",
              "● Festive occasions",
              "● Personal celebrations",
            ].map((item, i) => (
              <span
                key={i}
                className="px-5 py-2.5 border rounded-full text-sm bg-black text-white transition hover:scale-105"
              >
                {item}
              </span>
            ))}
          </div>

          <p className="text-gray-600 mt-10 text-lg">
            Our versatile product range ensures you find something meaningful for every occasion.
          </p>
        </div>
      </section>

      {/* SHOPPING */}
    <section className="bg-white py-5">
  <div className="max-w-6xl mx-auto px-4 text-center">

    {/* HEADING */}
    <h2 className="text-3xl md:text-4xl font-semibold mb-6">
      Easy and Convenient Shopping Experience
    </h2>

    <p className="text-gray-600 mb-14 text-lg max-w-2xl mx-auto">
      We focus on providing a seamless and hassle-free experience for our customers:
    </p>

    {/* FEATURES */}
    <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
      {[
        "● User-friendly product selection",
        "● Detailed product specifications",
        "● Transparent pricing",
        "● Secure payment options",
        "● Reliable delivery services",
      ].map((item, i) => (
        <div
          key={i}
          className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-sm font-medium text-gray-700"
        >
          {item}
        </div>
      ))}
    </div>

    {/* FOOT TEXT */}
    <p className="text-gray-600 mt-14 text-lg max-w-3xl mx-auto leading-relaxed">
      Whether you are purchasing a single item or placing a bulk order, we ensure a smooth process from start to finish.
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




