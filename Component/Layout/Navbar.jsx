"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";

import Image from "next/image";
import {
  Search,
  User,
  Heart,
  Menu,
} from "lucide-react";

import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {

  const [categories, setCategories] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const openCart = useCartStore((state) => state.openCart);
  const cart = useCartStore((state) => state.cart);
  const wishlist = useWishlistStore((state) => state.wishlist);

  useEffect(() => {

    if (!query) {
      setResults([]);
      return;
    }

    const delay = setTimeout(async () => {

      const res = await fetch(`/api/searchbar/search?q=${query}`);

      const data = await res.json();

      setResults(data);

      setShowResults(true);

    }, 300);

    return () => clearTimeout(delay);

  }, [query]);

  useEffect(() => {

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);

  }, []);

  useEffect(() => setMounted(true), []);

  useEffect(() => {

    const stored = localStorage.getItem("user");

    if (stored) setUser(JSON.parse(stored));

  }, []);

  useEffect(() => {

    fetch("/api/categories")
      .then((res) => res.json())
      .then(setCategories);

  }, []);

  const totalItems = mounted
    ? cart.reduce((acc, item) => acc + item.quantity, 0)
    : 0;

  const handleLogout = () => {

    localStorage.removeItem("user");

    localStorage.removeItem("token");

    window.location.reload();

  };

  return (

    <div
      className={`w-full font-sans sticky top-0 z-[999] transition-all duration-300 ${
        scrolled ? "shadow-lg bg-white" : "bg-transparent"
      }`}
    >

   {/* TOP BAR */}
<div
  className="
    bg-[#071B31]
    flex flex-col
    sm:flex-row
    sm:items-center
    justify-between
    px-3
    sm:px-4
    md:px-12
    py-2
    gap-2
  "
>

  {/* LEFT */}
  <div
    className="
      flex flex-wrap items-center
      gap-1 sm:gap-3
      text-[10px]
      sm:text-[11px]
      md:text-[13px]
      tracking-[0.02em]
      text-white
      font-medium
    "
  >

    <span className="whitespace-nowrap">
      GST No. 07AAGCJ7313Q1Z2
    </span>

    {/* SEPARATOR */}
    <div className=" h-4 w-[1px] bg-white" />

    <span className="whitespace-nowrap">
      Trusted Importer & Wholesaler since 2005
    </span>

  </div>

  {/* RIGHT */}
  <div
    className="
      flex flex-wrap
      items-center
      justify-start
      sm:justify-end
      gap-3
      sm:gap-5
      md:gap-8
      text-[10px]
      sm:text-[12px]
      md:text-[14px]
      font-medium
      text-white
      whitespace-nowrap
    "
  >

    <Link
      href="/"
      className="flex items-center gap-3 hover:text-gray-300 transition"
    >
      Track Order
      <span className=" h-4 w-[1px] bg-white" />
    </Link>

    <Link
      href="/"
      className="flex items-center gap-3 hover:text-gray-300 transition"
    >
      Bulk Enquiry
      <span className=" h-4 w-[1px] bg-white" />
    </Link>

    <Link
      href="/"
      className="hover:text-gray-300 transition"
    >
      Contact Us
    </Link>

  </div>

</div>

      {/* MAIN NAVBAR */}
      <div className="bg-white border-b-2 border-[#e2cd95]">

        <div className="min-h-[75px] flex items-center justify-between px-2 sm:px-4 md:px-12 gap-2">

          {/* LEFT */}
          <div className="flex items-center gap-2 sm:gap-4 lg:gap-12 flex-shrink-0">

            {/* MOBILE MENU */}
            <button
              className="md:hidden"
              onClick={() => setMenuOpen(true)}
            >
              <Menu className="w-7 h-7 text-[#071B31]" />
            </button>

            {/* LOGO */}
            <Link href="/">

              <Image
                src="/logo.png"
                alt="Logo"
                width={250}
                height={250}
                className="
                  w-[120px]
                  sm:w-[150px]
                  md:w-[180px]
                  lg:w-[280px]
                  h-auto
                  object-contain
                "
              />

            </Link>

            {/* NAV LINKS */}
            <div className="hidden lg:flex items-center gap-12 text-[17px]">

              <Link
                href="/"
                className="
                  relative
                  font-semibold
                  text-[#071B31]
                  after:absolute
                  after:left-0
                  after:-bottom-[16px]
                  after:w-full
                  after:h-[2px]
                  after:bg-[#D6AE45]
                "
              >
                Home
              </Link>

              <Link
                href="/shop"
                className="font-medium text-[#071B31]"
              >
                Shop
              </Link>

              <Link
                href="/about"
                className="font-medium text-[#071B31]"
              >
                About
              </Link>

            </div>
          </div>

          {/* SEARCH */}
          <div className="flex-1 px-1 sm:px-3 md:px-8 min-w-0">

            <div className="max-w-[500px] xl:max-w-[560px] mx-auto relative w-full">

              <div
                className="
                  flex items-center
                  bg-[#F3EFEA]
                  border border-[#DDD4CB]
                  rounded-[18px]
                  px-4 sm:px-5
                  h-[42px] sm:h-[46px] md:h-[52px]
                "
              >

                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setShowResults(true)}
                  placeholder="Search..."
                  className="
                    w-full bg-transparent outline-none
                    text-[13px] sm:text-[14px] md:text-[16px]
                    text-[#071B31]
                    placeholder:text-[#7D7B78]
                  "
                />

                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#6B6870]" />

              </div>

              {/* SEARCH RESULTS */}
              {showResults && results.length > 0 && (

                <div
                  className="
                    absolute top-[55px] sm:top-[62px] left-0 w-full
                    bg-white rounded-[18px]
                    shadow-xl border border-[#e5ded5]
                    z-50 max-h-[300px] overflow-y-auto
                  "
                >

                  {results.map((item) => (

                    <Link
                      key={item._id}
                      href={`/product/${item.slug}`}
                      onClick={() => {
                        setShowResults(false);
                        setQuery("");
                      }}
                      className="
                        flex items-center gap-3
                        px-4 py-3
                        hover:bg-[#faf7f2]
                      "
                    >

                      <img
                        src={item.images?.[0]}
                        className="w-11 h-11 rounded-xl object-cover"
                      />

                      <span className="text-[15px] text-[#071B31]">
                        {item.name}
                      </span>

                    </Link>

                  ))}
                </div>

              )}
            </div>
          </div>

          {/* RIGHT */}
          <div className="hidden md:flex items-center flex-shrink-0">

            {/* USER */}
            <div className="relative group px-4 lg:px-6">

              <div className="flex items-center gap-3 cursor-pointer">

                <div className="relative">

                  <div
                    className="
                      w-9 h-9 rounded-full
                      border border-[#d7d0c8]
                      flex items-center justify-center
                      bg-white
                    "
                  >

                    {user ? (

                      <span className="text-[12px] font-semibold text-[#071B31]">
                        {user.name?.charAt(0).toUpperCase()}
                      </span>

                    ) : (

                      <User size={18} className="text-[#071B31]" />

                    )}
                  </div>

                  {user && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border border-white" />
                  )}
                </div>

                <span className="text-[15px] lg:text-[17px] font-medium text-[#071B31] whitespace-nowrap">
                  {user
                    ? `Hi, ${user.name?.split(" ")[0]} 👋`
                    : "Login"}
                </span>
              </div>

              {/* DROPDOWN */}
              <div className="absolute right-0 mt-5 w-56 bg-white shadow-xl rounded-2xl border border-[#ece4dc] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden">

                {user ? (
                  <>
                    <div className="px-4 py-3 text-sm text-gray-500 border-b">

                      Signed in as

                      <p className="text-black font-medium truncate">
                        {user.name}
                      </p>

                    </div>

                    <div className="px-4 py-3 text-sm border-b text-gray-500">

                      <p className="text-black font-medium truncate">
                        {user.email}
                      </p>

                    </div>

                    <Link
                      href="/profile"
                      className="block px-4 py-3 hover:bg-[#faf7f2] text-sm"
                    >
                      Profile
                    </Link>

                    <Link
                      href="/orders"
                      className="block px-4 py-3 hover:bg-[#faf7f2] text-sm"
                    >
                      Orders
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-500 text-sm"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="block px-4 py-3 hover:bg-[#faf7f2] text-sm"
                    >
                      Login
                    </Link>

                    <Link
                      href="/register"
                      className="block px-4 py-3 hover:bg-[#faf7f2] text-sm"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* DIVIDER */}
            <div className="h-[34px] w-[1px] bg-[#DDD4CB]" />

            {/* WISHLIST */}
            <Link
              href="/wishlist"
              className="relative flex items-center gap-2 px-4 lg:px-6"
            >

              <Heart size={20} className="text-[#6E6874]" />

              <span className="text-[15px] lg:text-[17px] font-medium text-black whitespace-nowrap">
                Wishlist
              </span>

              {mounted && wishlist.length > 0 && (
                <span className="absolute top-0 right-3 bg-red-500 text-white text-[10px] px-1.5 rounded-full">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* DIVIDER */}
            <div className="h-[34px] w-[1px] bg-[#DDD4CB]" />

            {/* CART */}
            <div
              onClick={openCart}
              className="flex items-center gap-2 cursor-pointer px-2"
            >

              <div className="relative w-[42px] h-[42px]">

                <Image
                  src="/cart.png"
                  alt="Cart"
                  fill
                  className="object-contain"
                />

                {mounted && (
                  <span
                    className="
                      absolute
                      inset-0
                      flex
                      items-center
                      justify-center
                      text-[#ff5a1f]
                      text-[20px]
                      font-bold
                      z-10
                      pb-[15px]
                    "
                  >
                    {totalItems}
                  </span>
                )}
              </div>

              <p className="text-[16px] lg:text-lg text-[#2f3b52] whitespace-nowrap">
                Cart
              </p>

            </div>
          </div>
        </div>
      </div>

      {/* CATEGORY NAV */}
{/* CATEGORY NAV */}
<div className="h-[54px] sm:h-[60px] md:h-[65px] flex items-center px-2 sm:px-4 bg-[#FAF7F2] border-b border-[#d9d0c7] overflow-hidden">

<Swiper
  modules={[Autoplay]}
  slidesPerView="auto"
  spaceBetween={10}
  loop={true}
  speed={3000}
  centeredSlides={false}
  allowTouchMove={true}
  autoplay={{
    delay: 0,
    disableOnInteraction: false,
    pauseOnMouseEnter: false,
    waitForTransition: true,
  }}
  observer={true}
  observeParents={true}
  updateOnWindowResize={true}
  className="category-swiper"
>
  {[...categories, ...categories].map((cat, index) => (

    <SwiperSlide
      key={`${cat._id}-${index}`}
      className="!w-auto"
    >

      <Link
        href={`/category/${cat.slug}`}
        className="
          inline-flex items-center
          h-[32px] sm:h-[36px] md:h-[45px]
          px-4 sm:px-5 md:px-7
          rounded-full
          border border-[#DDCFB5]
          bg-[#FAF7F2]
          text-[12px] sm:text-[14px] md:text-[16px]
          font-medium
          text-black
          whitespace-nowrap
          hover:bg-[#071b31]
          hover:text-white
          transition-all duration-200
        "
      >
        {cat.name}
      </Link>

    </SwiperSlide>

  ))}
</Swiper>

</div>

      {/* MOBILE OVERLAY */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* MOBILE MENU */}
      <div
        className={`fixed left-0 top-0 h-full w-[82%] sm:w-[75%] max-w-[320px] bg-white z-50 transform transition ${
          menuOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >

        <div className="p-4 border-b flex justify-between">

          <span>Menu</span>

          <button onClick={() => setMenuOpen(false)}>
            ✕
          </button>

        </div>

        <div className="p-4 flex flex-col gap-4">

          <Link href="/profile">Profile</Link>

          <Link href="/orders">Orders</Link>

          <Link href="/wishlist">Wishlist</Link>

          <div
            onClick={openCart}
            className="flex items-center gap-2 cursor-pointer"
          >

            <div className="relative w-[42px] h-[42px]">

              <Image
                src="/cart.png"
                alt="Cart"
                fill
                className="object-contain"
              />

              {mounted && (
                <span
                  className="
                    absolute
                    inset-0
                    flex
                    items-center
                    justify-center
                    text-[#ff5a1f]
                    text-[20px]
                    font-bold
                    z-10
                    pb-[15px]
                  "
                >
                  {totalItems}
                </span>
              )}
            </div>

            <p className="text-[16px] text-[#2f3b52]">
              Cart
            </p>
          </div>
        </div>

        {/* MOBILE ACCOUNT */}
        <div className="p-4 border-t">

          <div
            onClick={() =>
              setAccountOpen(!accountOpen)
            }
            className="flex items-center justify-between cursor-pointer"
          >

            <div className="flex items-center gap-2">

              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 text-white flex items-center justify-center text-[11px]">

                {user ? (
                  user.name?.charAt(0).toUpperCase()
                ) : (
                  <User size={17} />
                )}
              </div>

              <span>
                {user
                  ? `Hi, ${user.name?.split(" ")[0]} 👋`
                  : "Login / Register"}
              </span>
            </div>

            <span>
              {accountOpen ? "▲" : "▼"}
            </span>
          </div>

          {accountOpen && (

            <div className="mt-3 bg-gray-50 rounded-lg border overflow-hidden">

              {user ? (
                <>
                  <Link
                    href="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2"
                  >
                    Profile
                  </Link>

                  <Link
                    href="/orders"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2"
                  >
                    Orders
                  </Link>

                  <button
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-red-500"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2"
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>

          )}
        </div>
      </div>
    </div>
  );
}