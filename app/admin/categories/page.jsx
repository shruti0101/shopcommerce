"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function Categories() {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);

  // Upload Image
  const uploadImage = async (file) => {
    if (!file) return;

    try {
      setUploading(true);

      const toastId = toast.loading("Uploading image...");

      const formData = new FormData();
      formData.append("files", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setImage(data.urls[0]);

        toast.success("Image uploaded ✅", {
          id: toastId,
        });
      } else {
        toast.error("Upload failed", {
          id: toastId,
        });
      }
    } catch (err) {
      console.log(err);
      toast.error("Upload failed");
    }

    setUploading(false);
  };

  // Fetch Categories
  useEffect(() => {
    refreshCategories();
  }, []);

  const refreshCategories = () => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then(setCategories);
  };

  // Add + Update
  const handleSubmit = async () => {
    if (!name.trim()) {
      return toast.error("Enter category name");
    }

    const toastId = toast.loading(
      editingId ? "Updating category..." : "Adding category..."
    );

    try {
      const payload = {
        name,
        image,
        slug: name.toLowerCase().replace(/\s+/g, "-"),
      };

      if (editingId) {
        await fetch("/api/categories", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...payload,
            _id: editingId,
          }),
        });

        toast.success("Category updated", {
          id: toastId,
        });
      } else {
        await fetch("/api/categories", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        toast.success("Category added", {
          id: toastId,
        });
      }

      resetForm();
      refreshCategories();
    } catch (err) {
      console.log(err);

      toast.error("Something went wrong", {
        id: toastId,
      });
    }
  };

  // Reset
  const resetForm = () => {
    setName("");
    setImage("");
    setEditingId(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Edit
  const handleEdit = (c) => {
    setEditingId(c._id);
    setImage(c.image || "");
    setName(c.name);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Delete
  const handleDelete = async (id) => {
    const toastId = toast.loading("Deleting category...");

    try {
      await fetch(`/api/categories?id=${id}`, {
        method: "DELETE",
      });

      setCategories((prev) => prev.filter((c) => c._id !== id));

      toast.success("Deleted successfully", {
        id: toastId,
      });
    } catch (err) {
      console.log(err);

      toast.error("Delete failed", {
        id: toastId,
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F7FB] px-10 py-10">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8 ">
        <div className="">
          <h1 className="text-3xl font-bold text-gray-800">
            {editingId ? "Edit Category" : "Add Category"}
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage all your product categories from here
          </p>
        </div>

        {editingId && (
          <button
            onClick={resetForm}
            className="px-5 py-2 rounded-xl bg-black text-white border border-gray-200 text-md font-medium shadow-sm hover:shadow-md transition"
          >
            Cancel Edit
          </button>
        )}
      </div>

      {/* MAIN GRID */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* LEFT FORM */}
        <div className="lg:col-span-1 ">

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">

            <div className="mb-5">
              <label className="text-xl font-semibold text-gray-700 block mb-2">
                Category Name
              </label>

              <input
                className="w-full border border-black bg-gray-50 focus:bg-white p-3 rounded-xl outline-none focus:ring-2 focus:ring-black/10 transition"
                placeholder="Enter category name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* IMAGE UPLOAD */}
            <div className="mb-5">
              <label className="text-xl font-semibold text-gray-700 block mb-2">
                Category Image
              </label>

              <label className="border-2 border-dashed border-black hover:border-black/40 transition rounded-2xl p-5 flex flex-col items-center justify-center bg-gray-50 cursor-pointer">

                <span className="text-3xl mb-2">📁</span>

                <p className="text-sm text-gray-600 font-medium">
                  Click to upload image
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  PNG, JPG, WEBP
                </p>

                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => uploadImage(e.target.files[0])}
                />
              </label>

              {image && (
                <div className="relative mt-4">
                  <img
                    src={image}
                    className="w-full h-52 object-cover rounded-2xl border"
                  />

                  <button
                    onClick={() => setImage("")}
                    className="absolute top-3 right-3 bg-black text-white w-8 h-8 rounded-full text-sm"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>

            {/* ACTION BUTTON */}
            <button
              onClick={handleSubmit}
              disabled={uploading}
              className="w-full bg-gradient-to-r from-black to-gray-800 text-white py-3 rounded-2xl font-medium hover:opacity-95 transition disabled:opacity-50"
            >
              {uploading
                ? "Uploading..."
                : editingId
                ? "Update Category"
                : "Publish Category"}
            </button>

          </div>
        </div>

        {/* RIGHT LIST */}
        <div className="lg:col-span-2 mt-10">

          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                All Categories
              </h2>

              <p className="text-sm text-gray-500">
                {categories.length} categories available
              </p>
            </div>
          </div>

          {categories.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 text-center shadow-sm border border-gray-100">
              <div className="text-5xl mb-3">📂</div>

              <h3 className="font-semibold text-lg text-gray-700">
                No categories found
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Add your first category to get started
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">

              {categories.map((c) => (
                <div
                  key={c._id}
                  className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition duration-300"
                >

                  {/* IMAGE */}
                  <div className="relative overflow-hidden">

                    {c.image ? (
                      <img
                        src={c.image}
                        className="w-full h-44 object-cover group-hover:scale-105 transition duration-500"
                      />
                    ) : (
                      <div className="w-full h-44 bg-gray-100 flex items-center justify-center text-xl">
                        😔No Image! <br />
                        please upload one
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition" />
                  </div>

                  {/* CONTENT */}
                  <div className="p-5">

                    <div className="flex items-start justify-between gap-3">

                      <div>
                        <h3 className="font-semibold text-gray-800 text-lg line-clamp-1">
                          {c.name}
                        </h3>

                        <p className="text-xs text-gray-700 mt-1">
                          /{c.slug}
                        </p>
                      </div>

                    </div>

                    {/* ACTIONS */}
                    <div className="flex gap-2 mt-5">

                      <button
                        onClick={() => handleEdit(c)}
                        className="flex-1 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-sm font-medium transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(c._id)}
                        className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition"
                      >
                        Delete
                      </button>

                    </div>

                  </div>
                </div>
              ))}

            </div>
          )}
        </div>
      </div>
    </div>
  );
}