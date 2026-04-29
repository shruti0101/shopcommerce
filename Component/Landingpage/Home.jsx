"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Category from "./Category";
import {
  Truck,
  Warehouse,
  ShieldCheck,
  CreditCard,
  Globe,
  SearchCheck,
} from "lucide-react";
import Clientele from "./Clientele";
import Catslider from "./Catslider";
import Bestsellers from "./BestSeller";
import Whychoose from "./Whychoose";

export default function Hero() {
  return (
    <>
    <section className="w-full bg-[#f7f7f7]">

  {/* HERO SECTION */}
  <div className="w-full">
    <div className="relative w-full h-[220px] sm:h-[260px] md:h-[320px] lg:h-[70vh] xl:h-[76vh] overflow-hidden">

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
                width={1000}
                height={1000}
                alt="banner"
                priority={i === 0}
                className="max-w-full h-auto md:w-full md:h-full object-cover"
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

  {/* MAIN GRID */}
  <div className="w-full mx-auto px-3 sm:px-5 md:px-10 py-6 md:py-10">
    <div className="grid grid-cols-12 gap-4 md:gap-6">

      {/* LEFT */}
      <div className="col-span-12 lg:col-span-3">
        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold mb-4">
          More reasons to shop
        </h2>

        <div className="grid grid-cols-2 gap-3">
          {categories2.map((item, i) => (
            <div
              key={i}
              className={`rounded-xl p-3 ${item.bg} cursor-pointer transition-all duration-200 hover:scale-[1.04] hover:shadow-md`}
            >
              <div className="relative w-full h-20 sm:h-24">
                <Image
                  src={item.img}
                  fill
                  alt={item.title}
                  className="object-cover rounded-md"
                />
              </div>

              <h3 className="font-semibold mt-2 text-xs sm:text-sm md:text-base">
                {item.title}
              </h3>
              <p className="text-[11px] sm:text-xs text-gray-600">
                {item.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CENTER */}
      <div className="col-span-12 lg:col-span-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base sm:text-lg md:text-xl font-semibold">
            Mega deals
          </h2>

          <button className="bg-gray-900 hover:bg-black text-white text-xs sm:text-sm px-3 md:px-4 py-1.5 rounded-full shadow transition">
            ALL DEALS
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
          {deals.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-3 shadow-sm hover:shadow-lg transition relative group"
            >
              {/* TAG */}
              <span className="absolute top-2 left-2 bg-yellow-300 text-[10px] px-2 py-0.5 rounded">
                {item.tag}
              </span>

              {/* IMAGE */}
              <div className="relative w-full h-24 sm:h-28 md:h-32 mb-2">
                <Image
                  src={item.img}
                  fill
                  alt={item.title}
                  className="object-cover rounded-md"
                />
              </div>

              {/* TITLE */}
              <p className="text-xs sm:text-sm line-clamp-2 mb-1">
                {item.title}
              </p>

              {/* PRICE */}
              <div className="flex items-center gap-2">
                <span className="text-sm md:text-base font-bold">
                  ₹ {item.price}
                </span>
                <span className="line-through text-gray-400 text-xs">
                  ₹ {item.old}
                </span>
              </div>

              {/* BUTTON */}
              <button className="absolute bottom-3 right-3 w-7 h-7 md:w-8 md:h-8 rounded-full bg-gray-100 group-hover:bg-black group-hover:text-white flex items-center justify-center text-lg transition">
                +
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT */}
      <div className="col-span-12 lg:col-span-3 flex flex-col gap-4 mt-2 lg:mt-10">

        <div className="relative w-full h-[140px] sm:h-[180px] md:h-[220px] rounded-xl overflow-hidden shadow-md">
          <Image
            src="/cat1.avif"
            fill
            alt="banner"
            className="object-cover"
          />
        </div>

        <div className="relative w-full h-[140px] sm:h-[180px] md:h-[220px] rounded-xl overflow-hidden shadow-md">
          <Image
            src="/sidebanner1.avif"
            fill
            alt="banner"
            className="object-cover"
          />
        </div>

      </div>

    </div>
  </div>
</section>

      <section className="w-full bg-[#f6f6f6]">
  <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-6 h-full">

    {/* LEFT CONTENT */}
    <div className="px-8 lg:col-span-4 flex flex-col justify-center">
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
        {["/banner1.avif", "/banner2.gif", "/banner3.avif"].map((img, i) => (
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

      <Category></Category>

      <div className="w-full h-[50vh] verflow-hidden relative">
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
                {/* RIGHT IMAGE */}
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
      </div>

      <Bestsellers></Bestsellers>

      <Clientele></Clientele>

      <section className="w-full mt-3 mx-auto rounded-xl bg-gray-50 py-16 px-6 md:px-16">
        {/* HEADER */}
        <div className="flex items-center gap-6 mb-12">
          <h2 className="text-xl font-semibold text-gray-700 whitespace-nowrap">
            Our Services
          </h2>
          <div className="w-full h-[1px] bg-gray-300"></div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-20 gap-y-12">
          {services.map((item, index) => (
            <div key={index} className="flex items-start gap-5">
              {/* ICON */}
              <div className="mt-1">{item.icon}</div>

              {/* CONTENT */}
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
      </section>

      <Whychoose></Whychoose>
    </>
  );
}

const services = [
  {
    icon: <Truck size={42} className="text-blue-500" />,
    title: "Shipping",
    desc: "Abraa manages everything perfectly when it comes to getting your goods from the factory floor to your doorstep. Being a ...",
  },
  {
    icon: <Warehouse size={42} className="text-blue-500" />,
    title: "Warehousing",
    desc: "Abraa.com is globally well-linked with multiple logistics and warehouse associates. Positioned in the heart of Dubai, w ...",
  },
  {
    icon: <SearchCheck size={42} className="text-orange-500" />,
    title: "Products Inspection",
    desc: "At Abraa.com, every buyer’s product is physically verified through onsite inspection for those suppliers in the U.A.E. ...",
  },
  {
    icon: <ShieldCheck size={42} className="text-blue-500" />,
    title: "Buyer Protection",
    desc: "Are you worried about account safety, payment security, and product quality while buying online? Worry no more, Abraa of ...",
  },
  {
    icon: <CreditCard size={42} className="text-orange-500" />,
    title: "Secure Payment",
    desc: "What is Abraa Secure Payment (ASP)? Abraa Secure Payment (ASP) is a payment gateway solution that grants high protectio ...",
  },
  {
    icon: <Globe size={42} className="text-blue-500" />,
    title: "On site Verification",
    desc: "Any global-based supplier can sign up for free on Abraa.com and instantly launch their product, however with a systemati ...",
  },
];

const slides = [
  {
    title: "Mashreq noon Savings Account",
    subtitle: "noon | mashreq",
    button: "LEARN MORE",
    image: "/slide1.avif", // replace with your image
  },
  {
    title: "Premium Banking Experience",
    subtitle: "Fast • Secure • Digital",
    button: "GET STARTED",
    image: "/slider2.avif",
  },
];

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

const categories2 = [
  {
    title: "Grocery",
    subtitle: "Top deals, wide selection",
    img: "/images/grocery.png",
    bg: "bg-green-100",
  },
  {
    title: "Bestsellers",
    subtitle: "Shop our top picks",
    img: "/images/bestseller.png",
    bg: "bg-yellow-100",
  },
  {
    title: "New arrivals",
    subtitle: "The latest, curated for you",
    img: "/images/new.png",
    bg: "bg-purple-100",
  },
  {
    title: "Mahali",
    subtitle: "Support local businesses",
    img: "/images/mahali.png",
    bg: "bg-orange-100",
  },
];

const deals = [
  {
    title: "Samsung Galaxy S25 AI Dual SIM",
    price: "2099",
    old: "3199",
    img: "/cat1/mobile.png",
    tag: "Mobile Phones deals",
  },
  {
    title: "Vitamin D3 Softgel",
    price: "53",
    old: "79",
    img: "/images/vitamin.png",
    tag: "NUTRAXIN deals",
  },
  {
    title: "MacBook Air Case",
    price: "99",
    old: "149",
    img: "/images/mac.png",
    tag: "Computers & Accessories",
  },
  {
    title: "Baby Wipes",
    price: "21",
    old: "35",
    img: "/images/wipes.png",
    tag: "Home Care & Cleaning",
  },
  {
    title: "Samsung Galaxy S25 AI Dual SIM",
    price: "2099",
    old: "3199",
    img: "/cat1/mobile.png",
    tag: "Mobile Phones deals",
  },
  {
    title: "Vitamin D3 Softgel",
    price: "53",
    old: "79",
    img: "/images/vitamin.png",
    tag: "NUTRAXIN deals",
  },
];
