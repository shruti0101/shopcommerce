"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const testimonials = [
  {
    name: "Amit Sharma",
    role: "Home Owner",
    review:
      "Absolutely loved the quality! The diffuser completely transformed my living space. Will definitely order again.",
    rating: 5,
  },
  {
    name: "Priya Mehta",
    role: "Interior Designer",
    review:
      "The designs are elegant and premium. My clients loved the decor pieces I sourced from here.",
    rating: 5,
  },
  {
    name: "Rahul Verma",
    role: "Business Owner",
    review:
      "Reliable bulk supply and great pricing. Perfect partner for our corporate gifting needs.",
    rating: 4,
  },
  {
    name: "Sneha Kapoor",
    role: "Lifestyle Blogger",
    review:
      "Super aesthetic products! The humidifier is both functional and stylish. Totally worth it.",
    rating: 5,
  },

{
  name: "Vikas Gupta",
  role: "Retail Store Owner",
  review:
    "Great variety and consistent quality. The products sell really well in my store. Highly recommended for bulk buyers.",
  rating: 4,
},
{
  name: "Neha Arora",
  role: "Working Professional",
  review:
    "The ordering process was super smooth and delivery was quick. Loved the packaging and product finish.",
  rating: 5,
},
{
  name: "Karan Malhotra",
  role: "Architect",
  review:
    "Perfect blend of functionality and design. These products fit beautifully into modern interiors.",
  rating: 5,
},
{
  name: "Anjali Singh",
  role: "Homemaker",
  review:
    "Very happy with my purchase! The decor items added a fresh and elegant touch to my home.",
  rating: 4,
}

];

export default function TestimonialSlider() {
  return (
    <section className="bg-[#f9fafb] py-12 md:py-16">
      <div className=" mx-auto px-10 md:px-15">

        {/* HEADING */}
        <div className="text-start mb-5">
          <h2 className="text-2xl md:text-4xl  font-bebas tracking-wide">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 mt-3 text-lg">
            Real experiences from people who trust our products
          </p>
        </div>

        {/* SLIDER */}
        <div className="relative">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation={{
              nextEl: ".testi-next",
              prevEl: ".testi-prev",
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {testimonials.map((item, i) => (
              <SwiperSlide key={i}>
                <div className="h-full bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">

                  {/* STARS */}
                  <div className="flex mb-3">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} size={18} className="text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>

                  {/* REVIEW */}
                  <p className="text-gray-700 text-sm leading-relaxed mb-5">
                    “{item.review}”
                  </p>

                  {/* USER */}
                  <div>
                    <h4 className="font-semibold text-base">{item.name}</h4>
                    <p className="text-gray-500 text-sm">{item.role}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* ARROWS */}
          <button className="testi-prev absolute left-0 md:-left-5 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full w-10 h-10 flex items-center justify-center">
            <ChevronLeft size={20} />
          </button>

          <button className="testi-next absolute right-0 md:-right-5 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full w-10 h-10 flex items-center justify-center">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}