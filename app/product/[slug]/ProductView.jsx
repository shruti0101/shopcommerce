






"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Link from "next/link";
import { Heart, Minus, Plus } from "lucide-react";
import { toast } from "react-hot-toast";

import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";

export default function ProductView({ product, relatedProducts }) {
  const [activeImage, setActiveImage] = useState(
    product.images?.[0] || "/placeholder.png",
  );
  const [zoomStyle, setZoomStyle] = useState({});
  const [activeTab, setActiveTab] = useState("description");
  const [animate, setAnimate] = useState(false);

  const addToCart = useCartStore((state) => state.addToCart);
  const updateQty = useCartStore((state) => state.updateQty);
  const removeItem = useCartStore((state) => state.removeItem);

  const wishlistItems = useWishlistStore((state) => state.wishlist);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist);

  const addToWishlist = useWishlistStore((state) => state.addToWishlist);
  const removeFromWishlist = useWishlistStore(
    (state) => state.removeFromWishlist,
  );

  const isWishlisted = isInWishlist(product._id);

  const [quantity, setQuantity] = useState(1);

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();

    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
setZoomStyle({
  transformOrigin: `${x}% ${y}%`,
  transform: "scale(2.3)",
});
  };

 const handleMouseLeave = () => {
  setZoomStyle({
    transform: "scale(1)",
    transformOrigin: "center center",
  });
};

  // yt link

  const [activeMedia, setActiveMedia] = useState({
    type: "image",
    value: product.images?.[0] || "/placeholder.png",
  });

  const getYoutubeEmbedUrl = (url) => {
    if (!url) return "";

    const regExp = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;

    const match = url.match(regExp);

    return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1` : "";
  };

  return (
    <div className="bg-white  font-caladea px-4 sm:px-6 md:px-10 lg:px-20 py-6 md:py-8 mt-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* left */}
    <div className="sticky top-20 self-start">
          <p className="text-gray-600 uppercase mb-4 text-xs sm:text-sm font-poppins" >
            Home / <span className="uppercase ">{product.category?.name}</span> /{" "}
            <span className="text-red-500   capitalize">
              {product.name}
            </span>
          </p>

          
        {/* main image div */}
<div

  className={`overflow-hidden bg-white rounded-2xl border relative ${ 
    activeMedia.type === "image"
      ? "cursor-zoom-in"
      : "cursor-default"
  }`}
  onMouseMove={
    activeMedia.type === "image"
      ? handleMouseMove
      : undefined
  }
  onMouseLeave={
    activeMedia.type === "image"
      ? handleMouseLeave
      : undefined
  }
>
  {activeMedia.type === "image" ? (
    <Image
      src={activeMedia.value}
      width={1500}
      height={1000}
      priority
      className="w-full sm:h-[350px]   md:h-[560px] transition-transform duration-200 ease-out"
      style={zoomStyle}
      alt={product.name}
    />
  ) : (
    <iframe
      src={getYoutubeEmbedUrl(activeMedia.value)}
      className="w-full h-[350px] md:h-[550px]"
      allow="autoplay; encrypted-media"
      allowFullScreen
    />
  )}
</div>

          {/* THUMBNAILS */}
          <Swiper spaceBetween={12} slidesPerView={"auto"} className="mt-5">
            {/* IMAGE THUMBNAILS */}
            {product.images?.map((img, i) => (
              <SwiperSlide key={i} className="!w-auto">
                <div
                  onClick={() =>
                    setActiveMedia({
                      type: "image",
                      value: img,
                    })
                  }
                  className={`relative overflow-hidden rounded-xl cursor-pointer border-2 transition-all duration-300 ${
                    activeMedia.value === img
                      ? "border-yellow-400 shadow-md scale-105"
                      : "border-gray-200 hover:border-gray-400 hover:scale-105"
                  }`}
                >
                  <img
                    src={img}
                    alt={`product-${i}`}
                    className="h-20 w-20 object-contain bg-white"
                  />

                  {activeMedia.value === img && (
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-black" />
                  )}
                </div>
              </SwiperSlide>
            ))}

            {/*yt thumbnai;l */}
            {product.youtubeLink && (
              <SwiperSlide className="!w-auto">
                <div
                  onClick={() =>
                    setActiveMedia({
                      type: "video",
                      value: product.youtubeLink,
                    })
                  }
                  className={`relative flex items-center justify-center h-20 w-20 rounded-xl cursor-pointer border-2 transition-all duration-300 ${
                    activeMedia.type === "video"
                      ? "border-red-500 shadow-md scale-105"
                      : "border-gray-200 hover:border-red-400 hover:scale-105"
                  }`}
                >
                  <img
                    src={`https://img.youtube.com/vi/${
                      getYoutubeEmbedUrl(product.youtubeLink)
                        .split("/embed/")[1]
                        ?.split("?")[0]
                    }/hqdefault.jpg`}
                    className="w-full h-full object-cover rounded-xl"
                    alt="youtube-thumbnail"
                  />

                  {/* play icon */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-xl">
                    <div className="bg-red-600 text-white rounded-full w-9 h-9 flex items-center justify-center text-lg shadow-lg">
                      ▶
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            )}
          </Swiper>
        </div>

        {/* right */}
        <div>
       

          <h2 className="text-3xl font-caladea sm:text-2xl md:text-4xl font-semibold ">
            {product.name} {" "} 
          </h2>

    

          {/* pricing */}
          <div className="mt-6 flex flex-wrap items-center gap-2 sm:gap-3">
            
            <span className="text-xl sm:text-2xl font-bold  font-caladea">
              ₹{product.price}
            </span>
            



            {product.oldPrice > 0 && (
              <>
                <span className="line-through  font-caladea text-gray-400 text-sm">
                  ₹{product.oldPrice}
                </span>

                <span className="text-red-500  font-caladea text-xs sm:text-sm">
                  {Math.round(
                    ((product.oldPrice - product.price) / product.oldPrice) *
                      100,
                  )}
                  % OFF
                </span>
              </>
            )}

              <p className="text-red-500  font-caladea  text-sm capitalize ">
            (inclusive of all taxes)
          </p>
          </div>
         

          {/* stick */}
          <p className="mt-2 text-sm font-caladea">
            {product.stock ? (
              <span className="text-green-600 ">Availability : In Stock</span>
            ) : (
              <span className="text-red-500">Out of Stock</span>
            )}
          </p>

      

          {/* DESCRIPTION */}
          <p className="mt-2 text-gray-700 font-caladea text-[17px] ">
            {product.description}
          </p>

       

          {/* SPECIFICATIONS */}
{product?.specifications?.length > 0 && (
  <div className="mt-6 border-t pt-5 font-caladea">
    <h3 className="text-lg font-semibold mb-4">
      Specifications
    </h3>

    <div className="space-y-1">
      {product.specifications.map((spec, index) => (
        <div
          key={index}
          className="grid grid-cols-2 gap-4 border rounded-xl p-3 bg-[#fafafa]"
        >
          <p className="font-medium text-black">
            {spec.key}
          </p>

          <p className="text-gray-800">
            {spec.value}
          </p>
        </div>
      ))}
    </div>
  </div>
)}

          <div className="mt-3 flex flex-col font-bold font-caladea">
            Quantity:
            <div className="flex items-center gap-6 mt-3">
              {/* quantity */}
              <div className="flex bg-gray-200 w-fit p-3 rounded-sm items-center gap-4">
                <button
                  onClick={() => {
                    if (quantity > 1) {
                      setQuantity(quantity - 1);
                    }
                  }}
                  className="p-1 border rounded-md hover:bg-gray-100"
                >
                  <Minus size={14} />
                </button>

                <span className="text-md font-medium">{quantity}</span>

                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1 border rounded-md hover:bg-gray-100"
                >
                  <Plus size={14} />
                </button>
              </div>

              {/* bulk order button */}
              <a
                href="tel:9456664444"
                className="bg-black animate-pulse text-white px-8 h-full py-3 rounded-sm text-sm hover:bg-gray-800 transition"
              >
                Want Bulk Order
              </a>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6">
            <button
              onClick={() => {
                addToCart(product, quantity);
                toast.success("Added to cart");
              }}
              className="flex-1 bg-black text-white py-2 rounded-lg text-sm sm:text-base"
            >
              Add to Cart
            </button>

            <button className="bg-green-500 hover:bg-green-600 text-sm sm:text-base capitalize rounded-lg px-3 text-white py-2 cursor-pointer">
              whatsapp now
            </button>

            <button
              onClick={() => {
                setAnimate(true);
                setTimeout(() => setAnimate(false), 300);

                if (isWishlisted) {
                  removeFromWishlist(product._id);
                } else {
                  addToWishlist(product);
                }
              }}
              className="border px-4 py-2 rounded-lg flex items-center justify-center gap-2 text-sm"
            >
              <Heart
                size={18}
                className={`transition ${
                  isWishlisted ? "fill-red-500 text-red-500" : "text-gray-500"
                }`}
              />
              {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
            </button>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="mt-10 md:mt-13 max-w-4xl">
        <div className="flex gap-4 sm:gap-12 capitalize border-b mb-4 overflow-x-auto">
          {["description", "specifications","features"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 whitespace-nowrap text-sm sm:text-lg capitalize ${
                activeTab === tab ? "border-b-2 border-red-500" : ""
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "description" && (
          <div
            className="text-sm sm:text-base"
            dangerouslySetInnerHTML={{
              __html: product.longdescription || "No description available",
            }}
          />
        )}

        {activeTab === "specifications" && (
          <div className="text-sm sm:text-base">
            {product.specifications?.length ? (
              product.specifications.map((s, i) => (
                <div key={i} className="flex justify-between py-2">
                  <span>{s.key}</span>
                  <span>{s.value}</span>
                </div>
              ))
            ) : (
              <p>No specifications</p>
            )}
          </div>
        )}



{activeTab === "features" && (
     
          <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {product.features?.map((f, i) => (
              <li
                key={i}
                className="flex items-start gap-2 bg-gray-50 hover:bg-gray-100 transition p-1 rounded-lg border"
              >
                {/* ICON */}
                <span className="text-red-600 mt-[2px]">✔</span>

                {/* TEXT */}
                <span className="text-xs sm:text-[16px] text-gray-900 leading-relaxed">
                  {f}
                </span>
              </li>
            ))}
          </ul>
)}

      </div>

      {/* RELATED PRODUCTS */}
      <div className="mt-10 md:mt-12">
        <h2 className="text-xl sm:text-3xl font-semibold mb-6">
          Related Products
        </h2>

        {!relatedProducts ? (
          <div className="flex gap-4 overflow-hidden">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-40 sm:w-52 md:w-60 h-64 sm:h-72 bg-gray-100 animate-pulse rounded-xl"
              />
            ))}
          </div>
        ) : relatedProducts.length ? (
        <Swiper
  modules={[Autoplay]}
  autoplay={{
    delay: 1000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  }}
  loop={true}
  speed={800}
  spaceBetween={20}
  observer={true}
  observeParents={true}
  breakpoints={{
    320: {
      slidesPerView: 2,
    },
    640: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
    },
  }}
>
            {relatedProducts.map((item) => (
              <SwiperSlide key={item._id}>
                <Link
                  href={`/product/${item.slug}`}
                  className="border rounded-xl p-3 block hover:shadow-md"
                >
                  <Image
                    src={item.images?.[0] || "/placeholder.png"}
                    width={300}
                    height={300}
                    className="w-full h-40 sm:h-44 md:h-64 object-cover"
                    alt={item.name}
                  />

                  <h3 className="mt-2 text-xs sm:text-sm line-clamp-2">
                    {item.name}
                  </h3>

                  <p className="font-semibold mt-1 text-sm">₹{item.price}</p>

                      {/* BUTTON */}
              <button className="w-full mt-4 bg-black text-white py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition">
                View Product
              </button>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-gray-500 text-sm">No related products found</p>
        )}
      </div>
    </div>
  );
}
