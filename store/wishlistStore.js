import { create } from "zustand"
import { persist } from "zustand/middleware"
import { toast } from "react-hot-toast";

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      wishlist: [],

loadWishlist: async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch("/api/wishlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      set({ wishlist: data });
    } catch (err) {
      console.error("Wishlist load error:", err);
    }
  },



      
addToWishlist: async (product) => {
  const token = localStorage.getItem("token");

  await fetch("/api/wishlist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ productId: product._id }),
  });

  set((state) => {
    const exists = state.wishlist.find((p) => p._id === product._id);
    if (exists) {
      toast("Already in wishlist ❤️");
      return state;
    }

    toast.success("Added to wishlist ❤️");

    return {
      wishlist: [...state.wishlist, product],
    };
  });
},

removeFromWishlist: async (productId) => {
  const token = localStorage.getItem("token");

  await fetch("/api/wishlist", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ productId }),
  });

  set({
    wishlist: get().wishlist.filter((item) => item._id !== productId),
  });

  toast.error("Removed from wishlist 💔");
},
     isInWishlist: (id) => {
  return get().wishlist.some((p) => p._id === id);
},
    }),
    {
      name: "wishlist-storage",
    }
  )
)