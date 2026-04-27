"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AllProductsAdmin() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // ✅ MODAL STATE
  const [selectedProduct, setSelectedProduct] = useState(null);

  // ✅ FETCH
  useEffect(() => {
    Promise.all([
      fetch("/api/product").then((res) => res.json()),
      fetch("/api/categories").then((res) => res.json()),
    ]).then(([productsData, categoryData]) => {
      setProducts(productsData || []);
      setFiltered(productsData || []);
      setCategories(categoryData || []);
      setLoading(false);
    });
  }, []);

  // ✅ FILTER
  useEffect(() => {
    let temp = [...products];

    if (search) {
      temp = temp.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedCategory) {
      temp = temp.filter(
        (p) =>
          p.category?._id === selectedCategory ||
          p.category === selectedCategory
      );
    }

    setFiltered(temp);
  }, [search, selectedCategory, products]);

  // ✅ DELETE
  const handleDelete = async (id) => {
    const toastId = toast.loading("Deleting...");

    await fetch(`/api/product?id=${id}`, {
      method: "DELETE",
    });

    setProducts((prev) => prev.filter((p) => p._id !== id));

    toast.success("Deleted", { id: toastId });
  };

  return (
    <div className="p-6 md:p-10 bg-[#F6F7FB] min-h-screen">

      <h1 className="text-2xl font-semibold mb-6">All Products</h1>

      {/* FILTER */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border px-4 py-2 rounded-lg"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border px-4 py-2 rounded-lg"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <button
          onClick={() => {
            setSearch("");
            setSelectedCategory("");
          }}
          className="bg-gray-200 px-4 py-2 rounded-lg"
        >
          Reset
        </button>
      </div>

      {/* LIST */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-48 bg-gray-200 animate-pulse rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {filtered.map((p) => (
            <div
              key={p._id}
              className="bg-white p-3 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <img
                src={p.images?.[0]}
                className="w-full h-32 object-cover rounded-lg"
              />

              <h3 className="mt-2 text-sm font-medium line-clamp-2">
                {p.name}
              </h3>

              <p className="text-xs text-gray-500">
                {p.category?.name || "No category"}
              </p>

              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold">₹{p.price}</p>
                {p.oldPrice > 0 && (
                  <span className="text-xs line-through text-gray-400">
                    ₹{p.oldPrice}
                  </span>
                )}
              </div>

              {/* ACTIONS */}
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => setSelectedProduct(p)}
                  className="flex-1 bg-blue-500 text-white py-1 rounded text-sm"
                >
                  View
                </button>

                <button
                  onClick={() => handleDelete(p._id)}
                  className="flex-1 bg-red-500 text-white py-1 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ✅ MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-3xl rounded-2xl p-6 relative overflow-y-auto max-h-[90vh]">

            {/* CLOSE */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-3 right-3 text-gray-500"
            >
              ✕
            </button>

            {/* IMAGE */}
            <img
              src={selectedProduct.images?.[0]}
              className="w-full h-60 object-contain mb-4"
            />

            {/* TITLE */}
            <h2 className="text-xl font-semibold">
              {selectedProduct.name}
            </h2>

            {/* PRICE */}
            <p className="text-lg font-bold mt-2">
              ₹{selectedProduct.price}
            </p>

            {/* DESC */}
            <p className="text-gray-600 mt-3">
              {selectedProduct.description}
            </p>

            {/* FEATURES */}
            {selectedProduct.features?.length > 0 && (
              <div className="mt-4">
                <h3 className="font-medium mb-2">Features</h3>
                <ul className="grid grid-cols-2 gap-2 text-sm">
                  {selectedProduct.features.map((f, i) => (
                    <li key={i} className="bg-gray-100 px-2 py-1 rounded">
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* SPECIFICATIONS */}
            {selectedProduct.specifications?.length > 0 && (
              <div className="mt-4">
                <h3 className="font-medium mb-2">Specifications</h3>
                {selectedProduct.specifications.map((s, i) => (
                  <div key={i} className="flex justify-between text-sm py-1 border-b">
                    <span>{s.key}</span>
                    <span>{s.value}</span>
                  </div>
                ))}
              </div>
            )}

            {/* LONG DESC */}
            {selectedProduct.longdescription && (
              <div
                className="mt-4 text-sm"
                dangerouslySetInnerHTML={{
                  __html: selectedProduct.longdescription,
                }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}