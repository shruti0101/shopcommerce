import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { ChevronLeft, ChevronRight, NotebookText } from "lucide-react";
import { Autoplay, Navigation} from "swiper/modules";
const Topstrip = () => {
  return (
    <div>
           {/* TOP STRIP */}
      <div className="bg-blue-900 text-white py-3 text-center">
        <Swiper modules={[Autoplay]} autoplay={{ delay: 2500 }} loop>
          {["Big Sale 🔥", "Free Shipping 🚚", "New Arrivals ✨"].map((text, i) => (
            <SwiperSlide key={i}>{text}</SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default Topstrip