import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { ChevronLeft, ChevronRight, NotebookText } from "lucide-react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import {
  Search,
  MapPin,
  User,
  ShoppingBag,
  Heart,
  Globe,
  Menu,
} from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {


const openCart = useCartStore((state) => state.openCart);
const totalItems = useCartStore((state) => state.totalItems());

const wishlist = useWishlistStore((state) => state.wishlist);


  const [categories, setCategories] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const category = [
    { name: "Beauty & Health", href: "/category/beauty-&-health" },
    { name: "Decorative Product", href: "/category/decorative-product" },
    { name: "Health", href: "/category/health" },
    { name: "Home decorative", href: "/category/home-decorative" },
    { name: "Office Product", href: "/category/office-product" },
    { name: "Home Product", href: "/category/home-product" },
    { name: "Fitness & Health", href: "/category/fitness-&-health" },
    { name: "Smart Gadgets", href: "/category/smart-gadgets" },
    { name: "Kids Items", href: "/category/kids-items" },
    { name: "Water Bottles", href: "/category/water-bottles" },
    { name: "Home & Kitchen", href: "/category/home-&-kitchen" },
    { name: "Others", href: "/category/others" },
  ];

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then(setCategories);
  }, []);

  return (
    <div className="w-full font-sans">
      {/* ================= TOP NAV ================= */}
      <div className="bg-[#FFED00] h-[64px] flex items-center px-4 md:px-6 justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-4 md:gap-6 min-w-fit">
          {/* 🍔 HAMBURGER (MOBILE ONLY) */}
          <button className="md:hidden" onClick={() => setMenuOpen(true)}>
            <Menu />
          </button>

          <img src="/logo.png" alt="logo" className="h-[50px] md:h-[38px]" />

          <div className="hidden sm:flex items-center gap-1 text-[13px] md:text-[14px] text-black">
            <MapPin size={16} />
            <span className="font-medium">Other - India</span>
          </div>
        </div>

        {/* SEARCH */}
        <div className="flex-1 px-3 md:px-6">
          <div className="w-full max-w-[640px] mx-auto">
            <div className="flex items-center bg-[#F5F5F5] h-[40px] md:h-[44px] rounded-full px-3 md:px-4">
              <Search size={16} className="text-gray-500" />
              <input
                type="text"
                placeholder="Search"
                className="ml-2 w-full bg-transparent outline-none text-[13px] md:text-[14px]"
              />
            </div>
          </div>
        </div>

        {/* RIGHT (HIDDEN ON MOBILE) */}
        <div className="hidden md:flex items-center gap-6 text-[14px] text-black min-w-fit">
          <div className="flex items-center gap-1 cursor-pointer">
            <Globe size={18} />
            <span>India</span>
          </div>

          <div className="flex items-center gap-1 cursor-pointer">
            <User size={18} />
            <span>Log in</span>
          </div>

          <div className="flex items-center gap-1 cursor-pointer">
            <ShoppingBag size={18} />
            <span>Orders</span>
          </div>

        {/* WISHLIST */}
<Link href="/wishlist" className="flex items-center gap-1 cursor-pointer relative">
  <Heart size={18} />

  {wishlist.length > 0 && (
    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-1.5 rounded-full">
      {wishlist.length}
    </span>
  )}

  <span>Wishlist</span>
</Link>

{/* CART */}
<div
  onClick={openCart}
  className="flex items-center gap-1 cursor-pointer relative"
>
  <ShoppingBag size={18} />

  {totalItems > 0 && (
    <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] px-1.5 rounded-full">
      {totalItems}
    </span>
  )}

  <span>Cart</span>
</div>
        </div>
      </div>

      {/* OVERLAY */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full w-[260px] bg-white z-50 shadow-lg transform transition-transform duration-300
  ${menuOpen ? "translate-x-0" : "-translate-x-full"}
`}
      >
        {/* HEADER */}
        <div className="p-4 border-b flex justify-between items-center">
          <span className="font-semibold text-lg">Menu</span>
          <button onClick={() => setMenuOpen(false)}>✕</button>
        </div>

        {/* MENU ITEMS */}
        <div className="flex flex-col p-4 gap-4 text-[15px]">
          <div className="flex items-center gap-2">
            <User size={18} />
            Login
          </div>

          <div className="flex items-center gap-2">
            <ShoppingBag size={18} />
            Orders
          </div>

          <div className="relative group">
            {/* TRIGGER */}
            <div className="flex items-center gap-2 cursor-pointer">
              <NotebookText size={18} />
              <span>Categories</span>
            </div>

            {/* DROPDOWN */}
            <div
              className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg border 
    opacity-0 invisible group-hover:opacity-100 group-hover:visible 
    transition-all duration-200 z-50"
            >
              <ul className="py-2 text-sm text-gray-700 min-h-[32px] max-h-[250px] overflow-y-auto">
                {category.map((cat) => (
                  <Link key={cat.name} href={cat.href}>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer whitespace-nowrap">
                      {cat.name}
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Heart size={18} />
            Wishlist
          </div>

          <div className="flex items-center gap-2">
            <ShoppingBag size={18} />
            Cart
          </div>
        </div>
      </div>

      {/* ================= CATEGORY NAV ================= */}
      <div className="h-[48px] flex items-center px-6 bg-white ">
        <div className="flex items-center w-full">
          {/* 🔥 SWIPER */}
          <Swiper
            slidesPerView="auto"
            spaceBetween={28}
            freeMode={true}
            className="flex-1"
          >
            {categories.map((cat) => (
              <SwiperSlide key={cat._id} className="!w-auto">
                <Link
                  href={`/category/${cat.slug}`}
                  className="text-[17px] capitalize font-semibold text-[#2E2E2E] whitespace-nowrap hover:text-black transition"
                >
                  {cat.name}
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* 🔥 DELIVERY BADGE (FIXED RIGHT SIDE) */}
          <div className="hidden md:flex ml-6  items-center bg-white border rounded-full px-4 py-1 text-[13px] shadow-sm whitespace-nowrap">
            <span className="mr-1">Get</span>
            <span className="font-semibold">Free Delivery</span>
            <span className="ml-1">with</span>

            <span className="ml-1 bg-yellow-400 text-black px-2 rounded-full text-[12px]">
              JL INDUSTRY
            </span>
          </div>
        </div>
      </div>

      {/* TOP BLUE STRIP */}
      <div className="w-full h-[56px] bg-[#1E3A8A] flex items-center justify-between px-6 relative">
        <button className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center">
          <ChevronLeft className="text-white" />
        </button>

        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop={true}
          className="w-full"
        >
          {[
            "Get Latest Deals On JL INDUSTRY",
            "Big Discounts On Electronics ⚡",
            "Free Shipping On Orders Above ₹999 🚚",
            "New Arrivals Just Dropped 🔥",
          ].map((text, i) => (
            <SwiperSlide key={i}>
              <div className="text-white font-semibold text-lg tracking-wide text-center">
                {text.split("JL INDUSTRY").map((part, idx) => (
                  <span key={idx}>
                    {part}
                    {idx < text.split("JL INDUSTRY").length - 1 && (
                      <span className="text-yellow-300">JL INDUSTRY</span>
                    )}
                  </span>
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center">
          <ChevronRight className="text-white" />
        </button>
      </div>
    </div>
  );
}
