"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import toast from "react-hot-toast";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  // AUTH CHECK
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || user.role !== "admin") {
      router.push("/login");
    }
  }, []);

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("user");

    toast.success("Logged out");

    router.push("/");
  };

  const menuItems = [
    {
      name: "Dashboard",
      icon: "📊",
      path: "/admin",
    },
    {
      name: "Products",
      icon: "📦",
      path: "/admin/products",
    },
    {
      name: "Categories",
      icon: "📂",
      path: "/admin/categories",
    },
    {
      name: "Orders",
      icon: "🧾",
      path: "/admin/allorders",
    },
    {
      name: "Users",
      icon: "👤",
      path: "/admin/users",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F6F7FB] flex">

      {/* SIDEBAR */}
<aside className="w-64 bg-white border-r shadow-sm hidden md:flex flex-col sticky top-0 h-screen">

        {/* LOGO */}
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-gray-800">
            Admin Panel
          </h1>

          <p className="text-xs text-gray-500 mt-1">
            Management Dashboard
          </p>
        </div>

        {/* MENU */}
        <nav className="flex-1 p-4 space-y-2">

          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className={`w-full text-left px-4 py-3 rounded-xl transition font-medium flex items-center gap-3
              ${
                pathname === item.path
                  ? "bg-black text-white shadow-md"
                  : "hover:bg-gray-100 text-black"
              }`}
            >
              <span>{item.icon}</span>
              {item.name}
            </button>
          ))}

        </nav>

        {/* LOGOUT */}
        <div className="p-4 border-t">

          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-3 rounded-xl hover:bg-red-600 transition font-medium"
          >
            Logout
          </button>

        </div>

        {/* FOOTER */}
        <div className="p-4 text-xs text-gray-400">
          © 2026 Admin System
        </div>

      </aside>

      {/* PAGE CONTENT */}
      <main className="flex-1 overflow-x-hidden">
        {children}
      </main>

    </div>
  );
}