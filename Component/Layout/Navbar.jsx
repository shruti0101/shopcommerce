"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";


import Image from "next/image";
import {
  Search,
  MapPin,
  User,
  ShoppingBag,
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
  const [accountOpen, setAccountOpen] = useState(false); //  added
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
    return () => window.removeEventListener("scroll", handleScroll);
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
      <div className="bg-gray-200 min-h-[60px] flex items-center px-3 sm:px-4 md:px-15 justify-between">
        <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
          <button className="md:hidden" onClick={() => setMenuOpen(true)}>
            <Menu />
          </button>

          <Link href="/">
            <Image
              src="/logo.png"
              alt="Logo"
              width={220}
              height={160}
              className="object-contain w-[140px] sm:w-[180px] md:w-[220px]"
            />
          </Link>

          <div className="hidden sm:flex items-center gap-6 ml-8 text-xl">
        
            <Link href="/">Home</Link>
             <Link href="/shop">Shop</Link>
          </div>
        </div>

        {/* SEARCH */}
        <div className="flex-1 px-2 sm:px-3 md:px-6">
          <div className="max-w-[600px] mx-auto relative w-full">
            <div className="flex items-center bg-gray-100 rounded-full px-4 h-[40px]">
              <Search size={16} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setShowResults(true)}
                placeholder="Search products..."
                className="ml-2 w-full bg-transparent outline-none text-sm sm:text-base"
              />

              {showResults && results.length > 0 && (
                <div className="absolute top-[50px] left-0 w-full bg-white shadow-lg rounded-lg z-50 max-h-[300px] overflow-y-auto">
                  {results.map((item) => (
                    <Link
                      key={item._id}
                      href={`/product/${item.slug}`}
                      onClick={() => {
                        setShowResults(false);
                        setQuery("");
                      }}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100"
                    >
                      <img src={item.images?.[0]} className="w-10 h-10 rounded" />
                      <span className="text-sm">{item.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT (unchanged) */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6 text-sm">



      {/* USER */}
       {/* USER */}
<div className="relative group">

  {/* USER BUTTON */}
  <button
    type="button"
    className="
      flex
      items-center
      gap-2
      cursor-pointer
      px-2
      py-1.5
      rounded-full
      hover:bg-gray-100
      transition-all
      duration-200
    "
  >

    {/* Avatar */}
    <div className="relative">

      <div className="
        w-9
        h-9
        rounded-full
        bg-gradient-to-br
        from-yellow-400
        to-orange-500
        text-white
        flex
        items-center
        justify-center
        text-[12px]
        font-semibold
        shadow-sm
      ">

        {user
          ? user.name?.charAt(0).toUpperCase()
          : <User size={18} />
        }

      </div>

      {/* Online Dot */}
      {user && (
        <span className="
          absolute
          -bottom-0.5
          -right-0.5
          w-3
          h-3
          bg-green-500
          border-2
          border-white
          rounded-full
        " />
      )}

    </div>

    {/* Name */}
    <span className="
      hidden
      lg:block
      text-[15px]
      font-medium
      text-[#2f3b52]
    ">
      {user
        ? `Hi, ${user.name?.split(" ")[0]} 👋`
        : "Login / Register"
      }
    </span>

  </button>

  {/* DROPDOWN */}
  <div
    className="
      absolute
      right-0
      top-full
      mt-3
      w-[260px]
      bg-white
      rounded-2xl
      border
      border-gray-100
      shadow-[0_15px_40px_rgba(0,0,0,0.12)]
      opacity-0
      invisible
      translate-y-2
      group-hover:opacity-100
      group-hover:visible
      group-hover:translate-y-0
      transition-all
      duration-300
      z-50
      overflow-hidden
    "
  >

    {user ? (
      <>

        {/* USER INFO */}
        <div className="px-5 py-4 bg-gray-50 border-b">

          <p className="text-xs text-gray-500 mb-1">
            Signed in as
          </p>

          <p className="font-semibold text-black truncate">
            {user.name}
          </p>

          <p className="text-sm text-gray-500 truncate mt-1">
            {user.email}
          </p>

        </div>

        {/* LINKS */}
        <div className="py-2">

          <Link
            href="/profile"
            className="
              block
              px-5
              py-3
              text-sm
              text-gray-700
              hover:bg-gray-100
              transition
            "
          >
            Profile
          </Link>

          <Link
            href="/orders"
            className="
              block
              px-5
              py-3
              text-sm
              text-gray-700
              hover:bg-gray-100
              transition
            "
          >
            Orders
          </Link>

        </div>

        {/* LOGOUT */}
        <div className="border-t">

          <button
            onClick={handleLogout}
            className="
              w-full
              text-left
              px-5
              py-3
              text-sm
              text-red-500
              hover:bg-red-50
              transition
            "
          >
            Logout
          </button>

        </div>

      </>
    ) : (
      <div className="py-2">

        <Link
          href="/login"
          className="
            block
            px-5
            py-3
            text-sm
            text-gray-700
            hover:bg-gray-100
            transition
          "
        >
          Login
        </Link>

        <Link
          href="/register"
          className="
            block
            px-5
            py-3
            text-sm
            text-gray-700
            hover:bg-gray-100
            transition
          "
        >
          Register
        </Link>

      </div>
    )}

  </div>

</div>





          <Link href="/wishlist" className="relative flex items-center gap-1">
            <Heart size={18} />
            {mounted && wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-1.5 rounded-full">
                {wishlist.length}
              </span>
            )}
            Wishlist
          </Link>

<div
  onClick={openCart}
  className="flex items-center gap-2 cursor-pointer"
>

  {/* Cart Wrapper */}
  <div className="relative w-[42px] h-[42px]">

    <Image
      src="/cart.png"
      alt="Cart"
      fill
      className="object-contain"
    />

    {/* Quantity */}
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

  <p className="text-lg text-[#2f3b52]">
    Cart
  </p>

</div>

        </div>
      </div>

      {/* MOBILE OVERLAY */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setMenuOpen(false)} />
      )}

      {/* MOBILE MENU */}
      <div
        className={`fixed left-0 top-0 h-full w-[75%] max-w-[260px] bg-white z-50 transform transition ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 border-b flex justify-between">
          <span>Menu</span>
          <button onClick={() => setMenuOpen(false)}>✕</button>
        </div>

        <div className="p-4 flex flex-col gap-4">
          <Link href="/profile">Profile</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/wishlist">Wishlist</Link>

          <div
            onClick={() => {
              openCart();
              setMenuOpen(false);
            }}
          >
            Cart
          </div>
        </div>

        {/* ✅ FIXED MOBILE ACCOUNT */}
        <div className="p-4 border-t">
          <div
            onClick={() => setAccountOpen(!accountOpen)}
            className="flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 text-white flex items-center justify-center text-[11px]">
                {user ? user.name?.charAt(0).toUpperCase() : <User size={17} />}
              </div>

              <span>
                {user ? `Hi, ${user.name?.split(" ")[0]} 👋` : "Login / Register"}
              </span>
            </div>

            <span>{accountOpen ? "▲" : "▼"}</span>
          </div>

          {accountOpen && (
            <div className="mt-3 bg-gray-50 rounded-lg border overflow-hidden">
              {user ? (
                <>
                  <Link href="/profile" onClick={() => setMenuOpen(false)} className="block px-4 py-2">
                    Profile
                  </Link>
                  <Link href="/orders" onClick={() => setMenuOpen(false)} className="block px-4 py-2">
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
                  <Link href="/login" onClick={() => setMenuOpen(false)} className="block px-4 py-2">
                    Login
                  </Link>
                  <Link href="/register" onClick={() => setMenuOpen(false)} className="block px-4 py-2">
                    Register
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>

    
    {/* CATEGORY NAV */}
<div className="h-[60px] flex items-center px-3 sm:px-4 md:px-6 bg-white/90 backdrop-blur-md border-y border-gray-100 shadow-sm overflow-hidden">
  <Swiper
    slidesPerView="auto"
    spaceBetween={12}
    freeMode
    className="flex-1"
  >
    {categories.map((cat) => (
      <SwiperSlide key={cat._id} className="!w-auto">
        <Link
          href={`/category/${cat.slug}`}
          className="
            group relative inline-flex items-center
            text-[13px] sm:text-[15px] md:text-[16px]
            font-medium whitespace-nowrap
            px-4 py-2 rounded-full
            bg-gradient-to-br from-yellow-100/ to-yellow-50
            border border-yellow-200
            shadow-sm
            transition-all duration-300
            hover:shadow-md hover:-translate-y-[1px]
            hover:bg-yellow-50 hover:text-black
          "
        >
          {/* subtle glow */}
          <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 bg-yellow-300/20 blur-md transition"></span>

          <span className="relative z-10">{cat.name}</span>
        </Link>
      </SwiperSlide>
    ))}
  </Swiper>
</div>


    </div>
  );
}