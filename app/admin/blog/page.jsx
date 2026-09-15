
"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// Dynamic import to avoid SSR issues
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const emptyForm = {
  title: "",
  excerpt: "",
  content: "",
  image: "",
  tags: "",
  author: "Admin",

  // Blog date
  date: new Date().toISOString().split("T")[0],

  published: true,
  metaTitle: "",
  metaDescription: "",
};

export default function AdminBlogPage() {
  const router = useRouter();

  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const editor = useRef(null);

  // Jodit config
  const config = {
    readonly: false,
    height: 400,
    toolbarButtonSize: "medium",
    buttons: [
      "source",
      "|",
      "bold",
      "italic",
      "underline",
      "strikethrough",
      "|",
      "font",
      "fontsize",
      "paragraph",
      "|",
      "align",
      "list",
      "indent",
      "outdent",
      "|",
      "link",
      "image",
      "table",
      "|",
      "undo",
      "redo",
      "|",
      "fullsize",
      "preview",
    ],
    uploader: {
      url: "/api/upload",
      format: "json",
    },
  };

  // Check admin
  useEffect(() => {
    const stored = localStorage.getItem("user");

    if (!stored) {
      router.push("/login");
      return;
    }

    const user = JSON.parse(stored);

    if (user.role !== "admin") {
      router.push("/login");
    }
  }, [router]);

  // Fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blog");
        const data = await res.json();

        setBlogs(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load blogs.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleChange = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetForm = () => {
    setForm({
      ...emptyForm,

      // Set today's date whenever creating a new post
      date: new Date().toISOString().split("T")[0],
    });

    setEditingId(null);
  };

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

      if (data.success && data.urls?.[0]) {
        setForm((prev) => ({
          ...prev,
          image: data.urls[0],
        }));

        toast.success("Image uploaded ✅", {
          id: toastId,
        });
      } else {
        toast.error("Upload failed", {
          id: toastId,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();

    if (!form.title || !form.content) {
      toast.error("Please add a title and content.");
      return;
    }

    if (!form.date) {
      toast.error("Please select a blog date.");
      return;
    }

    const payload = {
      ...form,

      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),

      // Send selected date to API
      date: form.date,
    };

    const method = editingId ? "PUT" : "POST";

    const body = editingId
      ? {
          ...payload,
          _id: editingId,
        }
      : payload;

    try {
      const res = await fetch("/api/blog", {
        method,
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const saved = await res.json();

      if (!saved || res.status >= 400) {
        toast.error("Failed to save blog post.");
        return;
      }

      toast.success(editingId ? "Blog updated" : "Blog created");

      // Keep current editing state before reset
      const wasEditing = Boolean(editingId);

      resetForm();

      setBlogs((prev) =>
        wasEditing
          ? prev.map((item) =>
              item._id === saved._id ? saved : item
            )
          : [saved, ...prev]
      );
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    }
  };

  const handleEdit = (post) => {
    setEditingId(post._id);

    setForm({
      title: post.title || "",
      excerpt: post.excerpt || "",
      content: post.content || "",
      image: post.image || "",
      tags: (post.tags || []).join(", "),
      author: post.author || "Admin",

      // Load existing blog date
      date: post.date
        ? new Date(post.date).toISOString().split("T")[0]
        : post.createdAt
        ? new Date(post.createdAt).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],

      published: post.published ?? true,
      metaTitle: post.metaTitle || "",
      metaDescription: post.metaDescription || "",
    });

    // Scroll to form
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this blog post?")) return;

    try {
      const res = await fetch(`/api/blog?id=${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        toast.error("Failed to delete blog.");
        return;
      }

      setBlogs((prev) =>
        prev.filter((post) => post._id !== id)
      );

      toast.success("Blog deleted");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete blog.");
    }
  };

  const formatDate = (date) => {
    if (!date) return "";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "";
    }

    return parsedDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-[#F6F7FB] p-6 md:p-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#071B31]">
              Blog Management
            </h1>

            <p className="text-gray-600 mt-2">
              Create, update, and delete blog posts for the public blog section.
            </p>
          </div>

          <button
            onClick={resetForm}
            className="rounded-full bg-black px-5 py-3 text-white transition hover:bg-gray-800"
          >
            New post
          </button>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">

          {/* FORM */}
          <div className="space-y-6">
            <div className="rounded-3xl bg-white p-6 shadow-sm">

              <h2 className="text-xl font-semibold mb-4">
                {editingId ? "Edit post" : "Post details"}
              </h2>

              <form onSubmit={handleSave} className="space-y-4">

                {/* TITLE + AUTHOR */}
                <div className="grid gap-4 md:grid-cols-2">

                  <label className="space-y-2">
                    <span className="font-medium text-gray-700">
                      Title
                    </span>

                    <input
                      value={form.title}
                      onChange={(e) =>
                        handleChange("title", e.target.value)
                      }
                      className="w-full rounded-2xl border border-gray-200 px-4 py-3"
                      placeholder="Enter blog title"
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="font-medium text-gray-700">
                      Author
                    </span>

                    <input
                      value={form.author}
                      onChange={(e) =>
                        handleChange("author", e.target.value)
                      }
                      className="w-full rounded-2xl border border-gray-200 px-4 py-3"
                      placeholder="Author name"
                    />
                  </label>

                </div>

                {/* DATE */}
                <label className="space-y-2 block">
                  <span className="font-medium text-gray-700">
                    Blog Date
                  </span>

                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) =>
                      handleChange("date", e.target.value)
                    }
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3 bg-white"
                  />

                  <p className="text-xs text-gray-500">
                    This date will be displayed on the blog instead of the
                    automatic created date.
                  </p>
                </label>

                {/* EXCERPT */}
                <label className="space-y-2 block">
                  <span className="font-medium text-gray-700">
                    Excerpt
                  </span>

                  <textarea
                    rows={3}
                    value={form.excerpt}
                    onChange={(e) =>
                      handleChange("excerpt", e.target.value)
                    }
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3"
                    placeholder="Short description of the blog..."
                  />
                </label>

                {/* CONTENT */}
                <div className="space-y-2">
                  <span className="font-medium text-gray-700">
                    Content
                  </span>

                  <JoditEditor
                    ref={editor}
                    value={form.content}
                    config={config}
                    onBlur={(newContent) =>
                      handleChange("content", newContent)
                    }
                    onChange={(newContent) => {}}
                  />
                </div>

                {/* IMAGE + TAGS */}
                <div className="grid gap-4 md:grid-cols-2">

                  <label className="space-y-2">
                    <span className="font-medium text-gray-700">
                      Image URL
                    </span>

                    <input
                      value={form.image}
                      onChange={(e) =>
                        handleChange("image", e.target.value)
                      }
                      className="w-full rounded-2xl border border-gray-200 px-4 py-3"
                      placeholder="Paste image URL or upload below"
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="font-medium text-gray-700">
                      Tags (comma separated)
                    </span>

                    <input
                      value={form.tags}
                      onChange={(e) =>
                        handleChange("tags", e.target.value)
                      }
                      className="w-full rounded-2xl border border-gray-200 px-4 py-3"
                      placeholder="SEO, React, Next.js"
                    />
                  </label>

                </div>

                {/* UPLOAD IMAGE */}
                <div className="grid gap-4 md:grid-cols-2 items-end">

                  <label className="space-y-2">
                    <span className="font-medium text-gray-700">
                      Upload image
                    </span>

                    <input
                      type="file"
                      accept="image/*"
                      disabled={uploading}
                      onChange={(e) =>
                        uploadImage(e.target.files?.[0])
                      }
                      className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3"
                    />
                  </label>

                  <div className="space-y-2">
                    <span className="font-medium text-gray-700">
                      Upload status
                    </span>

                    <div className="rounded-2xl border border-gray-200 bg-[#F8FAFC] px-4 py-3 text-sm text-gray-600">
                      {uploading
                        ? "Uploading..."
                        : "Select a file to upload"}
                    </div>
                  </div>

                </div>

                {/* IMAGE PREVIEW */}
                {form.image ? (
                  <div className="relative h-56 overflow-hidden rounded-3xl border border-gray-200 bg-gray-50">
                    <Image
                      src={form.image}
                      alt="Blog preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : null}

                {/* META TITLE */}
                <label className="space-y-2 block">
                  <span className="font-medium text-gray-700">
                    Meta title
                  </span>

                  <input
                    value={form.metaTitle}
                    onChange={(e) =>
                      handleChange("metaTitle", e.target.value)
                    }
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3"
                    placeholder="SEO meta title"
                  />
                </label>

                {/* META DESCRIPTION */}
                <label className="space-y-2 block">
                  <span className="font-medium text-gray-700">
                    Meta description
                  </span>

                  <textarea
                    rows={3}
                    value={form.metaDescription}
                    onChange={(e) =>
                      handleChange(
                        "metaDescription",
                        e.target.value
                      )
                    }
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3"
                    placeholder="SEO meta description"
                  />
                </label>

                {/* PUBLISHED + BUTTON */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                  <label className="flex items-center gap-3 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={form.published}
                      onChange={(e) =>
                        handleChange(
                          "published",
                          e.target.checked
                        )
                      }
                      className="h-4 w-4 rounded border-gray-300"
                    />

                    Published
                  </label>

                  <button
                    type="submit"
                    className="rounded-full bg-black px-6 py-3 text-white transition hover:bg-gray-800"
                  >
                    {editingId
                      ? "Save changes"
                      : "Create post"}
                  </button>

                </div>

              </form>
            </div>
          </div>

          {/* POSTS LIST */}
          <div className="space-y-6">

            <div className="rounded-3xl bg-white p-6 shadow-sm">

              <h2 className="text-xl font-semibold mb-4">
                Posts
              </h2>

              {loading ? (
                <div className="space-y-3">
                  {[...Array(4)].map((_, index) => (
                    <div
                      key={index}
                      className="h-20 rounded-2xl bg-gray-100 animate-pulse"
                    />
                  ))}
                </div>
              ) : blogs.length === 0 ? (
                <p className="text-gray-500">
                  No posts yet.
                </p>
              ) : (
                <div className="space-y-4">

                  {blogs.map((post) => (
                    <div
                      key={post._id}
                      className="rounded-3xl border border-gray-200 p-4"
                    >

                      <div className="flex items-start justify-between gap-4">

                        <div className="min-w-0">

                          <p className="font-semibold text-gray-900">
                            {post.title}
                          </p>

                          {/* BLOG DATE */}
                          <p className="text-sm text-gray-500 mt-1">
                            {formatDate(
                              post.date || post.createdAt
                            )}
                          </p>

                          {post.author ? (
                            <p className="text-xs text-gray-400 mt-1">
                              By {post.author}
                            </p>
                          ) : null}

                        </div>

                        <div className="flex gap-2 shrink-0">

                          <button
                            onClick={() => handleEdit(post)}
                            className="rounded-full border border-black px-4 py-2 text-sm"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(post._id)
                            }
                            className="rounded-full bg-red-500 px-4 py-2 text-sm text-white"
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
      </div>
    </div>
  );
}

