import React from 'react'
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
const Catslider = () => {


const categories = [
  { name: "Led Lights", image: "/led-spot-light.jpg" },
  { name: "Fitness Product", image: "/download.jfif" },
  { name: "Kitchen Product", image: "/images.jfif" },
  { name: "Massager Product", image: "/massage.jfif" },
  { name: "House Hold Product", image: "/38603104-1c4e-4fa8-94f3-f355971cf90f.avif" },
  { name: "Candle & Lamps", image: "/download(1).jfif" },
  { name: "Table Fans", image: "/tablefan.jfif" },
  { name: "Vaccum Flask", image: "/vaccum.jfif" },
  { name: "Slimming Patch", image: "/patch.webp" },
  { name: "Led Lights", image: "/led-spot-light.jpg" },
  { name: "Fitness Product", image: "/download.jfif" },
  { name: "Kitchen Product", image: "/images.jfif" },
  { name: "Massager Product", image: "/massage.jfif" },
  { name: "House Hold Product", image: "/38603104-1c4e-4fa8-94f3-f355971cf90f.avif" },
  { name: "Candle & Lamps", image: "/download(1).jfif" },
  { name: "Table Fans", image: "/tablefan.jfif" },
  { name: "Vaccum Flask", image: "/vaccum.jfif" },
  { name: "Slimming Patch", image: "/patch.webp" },
];


  return (
    <div>

        
                  <div className="mt-6 px-6">
                    <Swiper
                      slidesPerView={9}        // 4 per row
                      grid={{
                        rows: 2,              // 2 rows → total 8 cards
                        fill: "row",
                      }}
                      spaceBetween={5}
                      className="overflow-hidden"
                    >
                      {categories.map((item, i) => (
                        <SwiperSlide key={i}>
                          <div className="flex flex-col items-center">
                            <div className="w-[130px] h-[130px] bg-white rounded-2xl flex items-center justify-center shadow-sm hover:shadow-md transition">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-25 h-25 object-cover"
                              />
                            </div>
                            <span className="text-base mt-2 text-center text-gray-900 font-medium leading-tight">
                              {item.name}
                            </span>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
        
                    {/* Pagination Indicator */}
                    <div className="flex justify-center mt-4">
                      <div className="w-16 h-[4px] bg-gray-200 rounded-full relative">
                        <div className="absolute left-0 w-6 h-[4px] bg-gray-800 rounded-full transition-all"></div>
                      </div>
                    </div>
                  </div>

    </div>
  )
}

export default Catslider