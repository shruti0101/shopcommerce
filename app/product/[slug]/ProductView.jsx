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
 const [selectedSize, setSelectedSize] = useState("");
const [selectedColor, setSelectedColor] = useState("");
  const addToCart = useCartStore((state) => state.addToCart);
  const updateQty = useCartStore((state) => state.updateQty);
  const removeItem = useCartStore((state) => state.removeItem);

  const wishlistItems = useWishlistStore((state) => state.wishlist);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist);

  const addToWishlist = useWishlistStore((state) => state.addToWishlist);
  const removeFromWishlist = useWishlistStore(
    (state) => state.removeFromWishlist,
  );



  // for colors
  const selectedColorData =
  product.colors?.find(
    (c) => c.color === selectedColor
  ) || null;


const selectedSizeData =
  product.sizes?.find(
    (s) => s.size === selectedSize
  ) || null;

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
      {/* LEFT */}
<div className="md:sticky md:top-38 self-start">

  {/* BREADCRUMB */}
  <p className="text-gray-500 uppercase mb-5 text-xs sm:text-sm tracking-[2px] font-poppins">
    Home /{" "}
    <span className="uppercase">
      {product.category?.name}
    </span>{" "}
    /{" "}
    <span className="text-black capitalize font-semibold">
      {product.name}
    </span>
  </p>

  {/* MAIN SLIDER */}
  <Swiper
    modules={[Autoplay]}
    autoplay={{
      delay: 2500,
      disableOnInteraction: false,
    }}
    loop={true}
    spaceBetween={0}
    onSlideChange={(swiper) => {

      const realIndex = swiper.realIndex;

      // IMAGE
      if (
        realIndex <
        product.images?.length
      ) {

        setActiveMedia({
          type: "image",
          value: product.images[realIndex],
        });

      }

      // VIDEO
      else if (product.youtubeLink) {

        setActiveMedia({
          type: "video",
          value: product.youtubeLink,
        });

      }

    }}
    className="
      overflow-hidden
      bg-white
      rounded-[20px]
      sm:rounded-[26px]
      md:rounded-[32px]
      border
      border-gray-100
      relative
      shadow-[0_10px_40px_rgba(0,0,0,0.08)]
    "
  >

    {/* IMAGE SLIDES */}
    {product.images?.map((img, i) => (

      <SwiperSlide key={i}>

        <div
          className={`
            relative
            overflow-hidden
            bg-white
            ${
              activeMedia.type === "image"
                ? "cursor-zoom-in"
                : "cursor-default"
            }
          `}
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

          <Image
            src={img}
            width={1500}
            height={1000}
            priority
            alt={product.name}
            style={
              activeMedia.value === img
                ? zoomStyle
                : {}
            }
            className="width={1500} height={1000} priority w-full sm:h-[350px] md:h-[560px] transition-transform duration-200 ease-out" 
            
          />
        </div>

      </SwiperSlide>

    ))}

    {/* VIDEO */}
    {product.youtubeLink && (

      <SwiperSlide>

        <iframe
          src={getYoutubeEmbedUrl(product.youtubeLink)}
          className="
            w-full
            h-[300px]
            sm:h-[420px]
            md:h-[560px]
          "
          allow="autoplay; encrypted-media"
          allowFullScreen
        />

      </SwiperSlide>

    )}

  </Swiper>

  {/* THUMBNAILS */}
  <Swiper
    spaceBetween={12}
    slidesPerView={"auto"}
    className="mt-5"
  >

    {/* IMAGE THUMBNAILS */}
    {product.images?.map((img, i) => (

      <SwiperSlide
        key={i}
        className="!w-auto"
      >

        <div
          onClick={() =>
            setActiveMedia({
              type: "image",
              value: img,
            })
          }
          className={`
            relative
            overflow-hidden
            rounded-2xl
            cursor-pointer
            border
            bg-white
            transition-all
            duration-300
            shadow-sm
            ${
              activeMedia.value === img
                ? "border-black shadow-xl scale-105"
                : "border-gray-200 hover:border-black hover:scale-105"
            }
          `}
        >

          <img
            src={img}
            alt={`product-${i}`}
            className="
              h-20
              w-20
              sm:h-24
              sm:w-24
              object-contain
              bg-white
              p-2
            "
          />

          {activeMedia.value === img && (

            <div className="absolute inset-x-0 bottom-0 h-1 bg-black" />

          )}

        </div>

      </SwiperSlide>

    ))}

    {/* VIDEO THUMB */}
    {product.youtubeLink && (

      <SwiperSlide className="!w-auto">

        <div
          onClick={() =>
            setActiveMedia({
              type: "video",
              value: product.youtubeLink,
            })
          }
          className={`
            relative
            flex
            items-center
            justify-center
            h-20
            w-20
            sm:h-24
            sm:w-24
            rounded-2xl
            cursor-pointer
            border
            bg-white
            transition-all
            duration-300
            shadow-sm
            ${
              activeMedia.type === "video"
                ? "border-red-500 shadow-xl scale-105"
                : "border-gray-200 hover:border-red-400 hover:scale-105"
            }
          `}
        >

          <img
            src={`https://img.youtube.com/vi/${
              getYoutubeEmbedUrl(product.youtubeLink)
                .split("/embed/")[1]
                ?.split("?")[0]
            }/hqdefault.jpg`}
            className="w-full h-full object-cover rounded-2xl"
            alt="youtube-thumbnail"
          />

          {/* PLAY ICON */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-2xl">

            <div className="bg-red-600 text-white rounded-full w-9 h-9 flex items-center justify-center text-sm shadow-lg">
              ▶
            </div>

          </div>

        </div>

      </SwiperSlide>

    )}

  </Swiper>

</div>

        {/* right */}
       <div className="relative">

  {/* TOP MINI LABEL */}
  <div className="flex items-center gap-3 mb-4">

    <div className="h-[1px] w-10 bg-black" />

    <p className="uppercase tracking-[4px] text-[11px] text-gray-500 font-medium">
      Luxury Essential
    </p>

  </div>

  {/* PRODUCT TITLE */}
  <h1 className="text-[34px] md:text-[40px] leading-[1.05] font-caladea font-semibold text-black max-w-xl">
    {product.name}
  </h1>

  {/* PRICE SECTION */}
  <div className="mt-4 flex items-end flex-wrap gap-4">

    <div className="flex items-end gap-3">

      <span className="text-[38px]   font-semibold tracking-tight text-black">
        ₹{selectedSizeData?.price || product.price}
      </span>

      {(selectedSizeData?.oldPrice ||
        product.oldPrice) > 0 && (

        <span className="text-md text-gray-400 line-through mb-2">
          ₹
          {selectedSizeData?.oldPrice ||
            product.oldPrice}
        </span>

      )}

    </div>

    {(selectedSizeData?.oldPrice ||
      product.oldPrice) > 0 && (

      <div className="mb-2 rounded-full bg-[#f4f4f4] px-3 py-1">

        <span className="text-sm font-medium text-black">

          {Math.round(
            (((selectedSizeData?.oldPrice ||
              product.oldPrice) -
              (selectedSizeData?.price ||
                product.price)) /
              (selectedSizeData?.oldPrice ||
                product.oldPrice)) *
              100
          )}
          % OFF

        </span>

      </div>

    )}

  </div>

  {/* TAX */}
  <p className="mt-2 text-sm text-red-600 font-caladea">
    Inclusive of all taxes
  </p>

  {/* DESCRIPTION */}
  <div className="mt-4">

    <p className="text-[15px] ] text-gray-800 font-caladea max-w-2xl">
      {product.description}
    </p>

  </div>

  {/* SIZE */}
  {product?.sizes?.length > 0 && (

    <div className="mt-5">

      <div className="flex items-center justify-between mb-5">

        <h3 className="text-[15px] uppercase tracking-[3px] text-black font-semibold">
          Select Size
        </h3>

      

      </div>

      <div className="flex flex-wrap gap-3">

        {product.sizes.map((item, i) => (

          <button
            key={i}
            onClick={() => setSelectedSize(item.size)}
            className={`
              h-[54px]
              min-w-[70px]
              px-5
              rounded-full
              text-sm
              font-medium
              border
              transition-all
              duration-300 uppercase
              ${
                selectedSize === item.size
                  ? "bg-black text-white border-black"
                  : "bg-white border-gray-200 hover:border-black"
              }
            `}
          >

            {item.size}

          </button>

        ))}

      </div>

    </div>

  )}

  {/* COLORS */}
  {product?.colors?.length > 0 && (

    <div className="mt-7">

      <h3 className="text-[15px] uppercase tracking-[3px] text-black font-semibold mb-5">
        Select Color
      </h3>

      <div className="flex flex-wrap gap-4">

        {product.colors.map((item, i) => (

          <button
            key={i}
            onClick={() => setSelectedColor(item.color)}
            className={`
              relative
              h-[58px]
              px-5
              rounded-full
              border
              flex
              items-center
              gap-3
              transition-all
              duration-300
              ${
                selectedColor === item.color
                  ? "border-black bg-black text-white"
                  : "border-gray-200 bg-white hover:border-black"
              }
            `}
          >

            <span
              className="h-5 w-5 rounded-full border border-white shadow"
              style={{
                backgroundColor:
                  item.code || "#000",
              }}
            />

            <span className="text-sm font-medium">
              {item.color}
            </span>

          </button>

        ))}

      </div>

    </div>

  )}

  {/* SPECIFICATIONS */}
  {product?.specifications?.length > 0 && (

    <div className="mt-10">

      <h3 className="text-[15px] uppercase tracking-[3px] text-black font-semibold mb-6">
        Product Specifications
      </h3>

      <div className="space-y-4">

        {product.specifications.map((spec, index) => (

          <div
            key={index}
            className="flex items-start justify-between gap-8 border-b border-gray-100 pb-4"
          >

            <p className="text-md uppercase tracking-wide text-gray-800 min-w-[120px]">
              {spec.key}
            </p>

            <p className="text-sm text-black text-right leading-relaxed">
              {spec.value}
            </p>

          </div>

        ))}

      </div>

    </div>

  )}

  {/* QUANTITY */}
  <div className="mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

    {/* QUANTITY BOX */}
    <div>

      <p className="text-[15px] uppercase tracking-[3px] text-black font-semibold mb-4">
        Quantity
      </p>

      <div className="flex items-center border border-gray-200 rounded-full overflow-hidden w-fit">

        <button
          onClick={() => {
            if (quantity > 1) {
              setQuantity(quantity - 1);
            }
          }}
          className="h-14 w-14 flex items-center justify-center hover:bg-black hover:text-white transition"
        >
          <Minus size={16} />
        </button>

        <div className="min-w-[60px] text-center font-semibold text-lg">
          {quantity}
        </div>

        <button
          onClick={() => setQuantity(quantity + 1)}
          className="h-14 w-14 flex items-center justify-center hover:bg-black hover:text-white transition"
        >
          <Plus size={16} />
        </button>

      </div>

    </div>

    {/* BULK ORDER */}
    <a
      href="tel:9456664444"
      className="group relative overflow-hidden rounded-full bg-black px-8 py-4 text-sm font-medium text-white transition-all duration-300 hover:scale-[1.03]"
    >

      <span className="relative z-10">
        Want Bulk Order?
      </span>

      <div className="absolute inset-0 bg-[#222] translate-y-full group-hover:translate-y-0 transition duration-500" />

    </a>

  </div>

  {/* CTA BUTTONS */}
  <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">

    {/* CART */}
    <button
      onClick={() => {

        if (
          product?.sizes?.length > 0 &&
          !selectedSize
        ) {
          toast.error("Please select size first");
          return;
        }

        const selectedSizeData =
          product?.sizes?.find(
            (s) => s.size === selectedSize
          );

        addToCart(
          {
            ...product,

            selectedSize,
            selectedColor,

            price:
              selectedSizeData?.price ||
              product.price,

            oldPrice:
              selectedSizeData?.oldPrice ||
              product.oldPrice,

            sizeStock:
              selectedSizeData?.stock || 0,
          },
          quantity
        );

        toast.success("Added to cart");
      }}
      className="
        h-[62px]
        rounded-full
        bg-black
        text-white
        font-medium
        transition-all
        duration-300
        hover:scale-[1.02]
        hover:bg-[#111]
      "
    >
      Add To Cart
    </button>

    {/* WHATSAPP */}
    <button className="h-[62px] rounded-full border border-[#25D366] bg-[#25D366] text-white font-medium transition-all duration-300 hover:scale-[1.02] hover:bg-[#1ebe5d]">
      WhatsApp Now
    </button>

    {/* WISHLIST */}
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
      className="
        h-[62px]
        rounded-full
        border
        border-gray-200
        bg-white
        flex
        items-center
        justify-center
        gap-2
        font-medium
        transition-all
        duration-300
        hover:border-black
      "
    >

      <Heart
        size={18}
        className={`transition ${
          isWishlisted
            ? "fill-red-500 text-red-500"
            : "text-gray-500"
        }`}
      />

      {isWishlisted
        ? "Wishlisted"
        : "Add Wishlist"}

    </button>

  </div>

</div>

        
      </div>

      {/* TABS */}
      <div className="mt-10 md:mt-13 max-w-4xl">
        <div className="flex gap-4 sm:gap-12 capitalize border-b mb-4 overflow-x-auto">
          {["description", "specifications", "features"].map((tab) => (
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
