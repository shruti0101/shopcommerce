"use client";

import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";

export default function WishlistPage() {
  const wishlist = useWishlistStore((state) => state.wishlist);
  const removeWishlist = useWishlistStore((state) => state.removeFromWishlist);
  const addToCart = useCartStore((state) => state.addToCart);





  
  return (



<>

    <div className="max-w-7xl mx-auto px-6 py-10 font-serif">

      {/* HEADER */}
      <h1 className="text-3xl font-semibold mb-8 flex items-center gap-2">
        <Heart className="text-red-500" /> My Wishlist
      </h1>

      {/* EMPTY STATE */}
      {wishlist.length === 0 && (
        <div className="text-center py-24">
          <Heart size={50} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 mb-4 text-lg">
            Your wishlist is empty
          </p>

          <Link href="/">
            <button className="bg-black text-white px-6 py-3 rounded-lg">
              Continue Shopping
            </button>
          </Link>
        </div>
      )}

      {/* GRID */}
      {wishlist.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

          {wishlist.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-4 relative group"
            >

              {/* REMOVE BUTTON */}
              <button
            onClick={() => removeWishlist(item._id)}
                className="absolute top-3 right-3 bg-white shadow p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
              >
                <Trash2 size={16} className="text-red-500" />
              </button>

              {/* IMAGE */}
              <Link href={`/product/${item.slug}`}>
                <div className="flex justify-center mb-4">
                  <img
                    src={item.images?.[0] || "/placeholder.png"}
                    className="h-40 object-contain"
                  />
                </div>
              </Link>

              {/* NAME */}
              <Link href={`/product/${item.slug}`}>
                <h3 className="text-lg font-semibold mb-2 hover:text-teal-600 transition">
                  {item.name}
                </h3>
              </Link>

              {/* PRICE */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-teal-700 font-semibold text-lg">
                  ₹{item.price}
                </span>

                {item.oldPrice > 0 && (
                  <span className="text-gray-400 line-through text-sm">
                    ₹{item.oldPrice}
                  </span>
                )}
              </div>

              {/* ACTIONS */}
              <div className="flex gap-2">

                <button
                  onClick={() => addToCart(item, 1)}
                  className="flex-1 bg-[#129c97] text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-[#0f7d79] transition"
                >
                  <ShoppingCart size={16} />
                  Add
                </button>

                <button
                onClick={() => removeWishlist(item._id)}
                  className="px-3 border rounded-lg hover:bg-gray-100"
                >
                  <Trash2 size={16} />
                </button>

              </div>
            </div>
          ))}

        </div>
      )}
    </div>

    {/* <button
  onClick={async () => {
    const token = localStorage.getItem("token");

    for (let item of wishlist) {
      await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: item._id,
          quantity: 1,
        }),
      });
    }

    // clear wishlist
    for (let item of wishlist) {
      await fetch("/api/wishlist", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: item._id }),
      });
    }

    window.location.reload();
  }}
  className="mb-6 bg-black text-white px-6 py-3 rounded-lg"
>
  Move All To Cart
</button> */}
</>

  );
}