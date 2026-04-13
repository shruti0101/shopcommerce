"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import JoditEditor from "jodit-react";
import { useRef } from "react";


export default function Products() {

  const editor = useRef(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

const [oldPrice, setOldPrice] = useState("");
const [description, setDescription] = useState("");

const [longdescription, setLongdescription] = useState("");

const [features, setFeatures] = useState("");
const [stock, setStock] = useState(true);

const [specs, setSpecs] = useState([{ key: "", value: "" }]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");

  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);


  // ✅ Fetch data
  useEffect(() => {
    fetch("/api/categories").then(res => res.json()).then(setCategories);
    fetch("/api/product").then(res => res.json()).then(setProducts);
  }, []);



const addSpec = () => {
  setSpecs([...specs, { key: "", value: "" }]);
};

const updateSpec = (index, field, value) => {
  const updated = [...specs];
  updated[index][field] = value;
  setSpecs(updated);
};

const removeSpec = (index) => {
  setSpecs(specs.filter((_, i) => i !== index));
};


  // ✅ Upload Images
  const uploadImages = async (files) => {
    setUploading(true);
    const toastId = toast.loading("Uploading images...");

    let uploadedUrls = [];

    for (let file of files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      await new Promise((resolve) => {
        reader.onloadend = async () => {
          const res = await fetch("/api/upload", {
            method: "POST",
            body: JSON.stringify({ image: reader.result }),
          });

          const data = await res.json();
          uploadedUrls.push(data.url);
          resolve();
        };
      });
    }

  setImages((prev) => [...prev, ...uploadedUrls]);
    setUploading(false);

    toast.success("Images uploaded", { id: toastId });
  };

  // ✅ Create / Update
  const handleSubmit = async () => {
    if (!images.length) return toast.error("Upload image first");

    const toastId = toast.loading(editingId ? "Updating..." : "Adding...");

   const payload = {
  name,
  slug: name.toLowerCase().replace(/\s+/g, "-"),
  price,
oldPrice: oldPrice ? Number(oldPrice) : 0,
price: Number(price),
  description,
  features: features.split(","),
  stock,
  category,
  images,
  longdescription,
  specifications: specs,
};

    if (editingId) {
      await fetch("/api/product", {
        method: "PUT",
        body: JSON.stringify({ ...payload, _id: editingId }),
      });
      toast.success("Product updated", { id: toastId });
    } else {
      await fetch("/api/product", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      toast.success("Product added", { id: toastId });
    }

    resetForm();
    refreshProducts();
  };

  const resetForm = () => {
    setName("");
    setPrice("");
    setCategory("");
    setImages([]);
    setEditingId(null);
  };

  const refreshProducts = () => {
    fetch("/api/product").then(res => res.json()).then(setProducts);
  };

  // ✅ Edit
const handleEdit = (p) => {
  setEditingId(p._id);
  setName(p.name);
  setPrice(p.price);
  setOldPrice(p.oldPrice || "");
  setDescription(p.description || "");
  setFeatures(p.features?.join(",") || "");
  setStock(p.stock);
  setCategory(p.category?._id || p.category);
  setImages(p.images);
  setLongdescription(p.longdescription || "");
  setSpecs(p.specifications || [{ key: "", value: "" }]);

};

  // ✅ Delete
  const handleDelete = async (id) => {
    const toastId = toast.loading("Deleting...");

    await fetch(`/api/product?id=${id}`, { method: "DELETE" });

    setProducts(prev => prev.filter(p => p._id !== id));

    toast.success("Deleted", { id: toastId });
  };


  return (
  <div className="p-8 bg-[#F6F7FB] min-h-screen">

    {/* HEADER */}
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-2xl font-semibold text-gray-800">
        {editingId ? "Edit Product" : "Add Product"}
      </h1>

      {editingId && (
        <button
          onClick={resetForm}
          className="text-sm bg-gray-200 px-4 py-2 rounded-lg"
        >
          Cancel Edit
        </button>
      )}
    </div>

    {/* MAIN GRID */}
    <div className="grid md:grid-cols-3 gap-6">

      {/* LEFT FORM */}
      <div className="md:col-span-2 space-y-6">

        {/* BASIC INFO */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="font-semibold mb-4 text-gray-700">Basic Info</h2>

          <input
            className="w-full border p-3 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-black/20"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-3">
            <input
              className="border p-3 rounded-lg"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <input
              className="border p-3 rounded-lg"
              placeholder="Old Price"
              value={oldPrice}
              onChange={(e) => setOldPrice(e.target.value)}
            />
          </div>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border p-3 rounded-lg mt-3"
          >
            <option>Select Category</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* DESCRIPTION */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="font-semibold mb-4 text-gray-700">Product Content</h2>

          <textarea
            className="w-full border p-3 rounded-lg mb-3"
            placeholder="Short Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <textarea
            className="w-full border p-3 rounded-lg mb-3"
            placeholder="Features (comma separated)"
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
          />

          <div>
            <p className="mb-2 text-sm font-medium text-gray-600">
              Full Description
            </p>

            <div className="border rounded-lg overflow-hidden">
              <JoditEditor
                ref={editor}
                value={longdescription}
                onChange={(newContent) => setLongdescription(newContent)}
              />
            </div>
          </div>
        </div>

        {/* SPECIFICATIONS */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-gray-700">Specifications</h2>

            <button
              onClick={addSpec}
              className="text-sm bg-black text-white px-3 py-1 rounded-lg"
            >
              + Add
            </button>
          </div>

          <div className="space-y-3">
            {specs.map((spec, i) => (
              <div
                key={i}
                className="grid grid-cols-5 gap-2 items-center"
              >
                <input
                  placeholder="Key"
                  value={spec.key}
                  onChange={(e) => updateSpec(i, "key", e.target.value)}
                  className="col-span-2 border p-2 rounded-lg"
                />

                <input
                  placeholder="Value"
                  value={spec.value}
                  onChange={(e) => updateSpec(i, "value", e.target.value)}
                  className="col-span-2 border p-2 rounded-lg"
                />

                <button
                  onClick={() => removeSpec(i)}
                  className="bg-red-100 text-red-600 rounded-lg h-10"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* RIGHT PANEL */}
      <div className="space-y-6">

        {/* STATUS */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="font-semibold mb-4 text-gray-700">Status</h2>

          <select
            value={stock}
            onChange={(e) => setStock(e.target.value === "true")}
            className="w-full border p-3 rounded-lg"
          >
            <option value="true">In Stock</option>
            <option value="false">Out of Stock</option>
          </select>
        </div>

        {/* IMAGE UPLOAD */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="font-semibold mb-4 text-gray-700">Images</h2>

          <input
            type="file"
            multiple
            onChange={(e) => uploadImages([...e.target.files])}
            className="mb-3"
          />

          <div className="grid grid-cols-3 gap-2">
            {images.map((img, i) => (
              <div key={i} className="relative">
                <img
                  src={img}
                  className="w-full h-20 object-cover rounded-lg"
                />

                <button
                  onClick={() =>
                    setImages(images.filter((_, idx) => idx !== i))
                  }
                  className="absolute top-1 right-1 bg-black text-white text-xs px-1 rounded"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* SUBMIT */}
        <button
          onClick={handleSubmit}
          disabled={uploading}
          className="w-full bg-black text-white py-3 rounded-xl font-medium hover:opacity-90 transition"
        >
          {uploading
            ? "Uploading..."
            : editingId
            ? "Update Product"
            : "Publish Product"}
        </button>

      </div>

    </div>

    {/* PRODUCT GRID */}
    <div className="mt-12">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        All Products
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {products.map((p) => (
          <div
            key={p._id}
            className="bg-white p-3 rounded-xl shadow-sm hover:shadow-md transition"
          >
            <img
              src={p.images?.[0]}
              className="w-full h-32 object-cover rounded-lg"
            />

            <h3 className="mt-2 text-sm font-medium">{p.name}</h3>

            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold">₹{p.price}</p>
              {p.oldPrice > 0 && (
                <span className="text-xs line-through text-gray-400">
                  ₹{p.oldPrice}
                </span>
              )}
            </div>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => handleEdit(p)}
                className="flex-1 bg-gray-100 py-1 rounded text-sm"
              >
                Edit
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
    </div>

  </div>
);

}