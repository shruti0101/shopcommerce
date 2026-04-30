"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function Categories() {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);
const [image, setImage] = useState("");
const [uploading, setUploading] = useState(false);
  // ✅ Fetch categories




const uploadImage = async (file) => {
  setUploading(true);
  const toastId = toast.loading("Uploading...");

  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onloadend = async () => {
    const res = await fetch("/api/upload", {
      method: "POST",
      body: JSON.stringify({ image: reader.result }),
    });

    const data = await res.json();
    setImage(data.url);

    toast.success("Uploaded ✅", { id: toastId });
    setUploading(false);
  };
};





  useEffect(() => {
    refreshCategories();
  }, []);

  const refreshCategories = () => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then(setCategories);
  };

  // ✅ Add + Update
  const handleSubmit = async () => {
    if (!name) return toast.error("Enter category name");

    const toastId = toast.loading(
      editingId ? "Updating..." : "Adding..."
    );

    const payload = {
      name,
      image,
      slug: name.toLowerCase().replace(/\s+/g, "-"),
    };

    if (editingId) {
      // 🔥 UPDATE
      await fetch("/api/categories", {
        method: "PUT",
        body: JSON.stringify({ ...payload, _id: editingId }),
      });
      toast.success("Category updated", { id: toastId });
    } else {
      // 🔥 CREATE
      await fetch("/api/categories", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      toast.success("Category added", { id: toastId });
    }

    resetForm();
    refreshCategories();
  };

  // 🔄 Reset
  const resetForm = () => {
    setName("");
     setImage(""); 
    setEditingId(null);
  };

  // ✏️ Edit
  const handleEdit = (c) => {
    setEditingId(c._id);
      setImage(c.image || ""); 
    setName(c.name);
  };

  // ❌ Delete
  const handleDelete = async (id) => {
    const toastId = toast.loading("Deleting...");

    await fetch(`/api/categories?id=${id}`, {
      method: "DELETE",
    });

    setCategories((prev) => prev.filter((c) => c._id !== id));

    toast.success("Deleted", { id: toastId });
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <h1 className="text-2xl font-semibold mb-6">
        {editingId ? "Edit Category" : "Add Category"}
      </h1>

      {/* FORM */}
      <div className="bg-white p-6 rounded-xl shadow-sm max-w-md">

        <input
          className="w-full border p-2 rounded mb-3"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

   <input
  type="file"
  onChange={(e) => uploadImage(e.target.files[0])}
/>

{image && (
  <img src={image} className="w-24 h-24 object-cover mt-2 rounded" />
)}

        <div className="flex gap-2">
          <button
            onClick={handleSubmit}
            className="flex-1 bg-black text-white py-2 rounded"
          >
            {editingId ? "Update" : "Add"}
          </button>

          {editingId && (
            <button
              onClick={resetForm}
              className="flex-1 bg-gray-200 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* LIST */}
      <h2 className="text-lg font-semibold mt-8 mb-3">
        All Categories
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((c) => (
          <div
            key={c._id}
            className="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center"
          >
            <span className="text-sm">{c.name}</span>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(c)}
                className="text-blue-500 text-xs"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(c._id)}
                className="text-red-500 text-xs"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}