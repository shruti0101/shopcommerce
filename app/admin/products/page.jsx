"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import JoditEditor from "jodit-react";
import { useRef } from "react";
import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";


function SortableImage({ img, i, images, setImages }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: img });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative group"
    >
      {/* IMAGE */}
      <img
        src={img}
        className="w-full h-28 object-cover rounded-2xl border border-gray-200 shadow-sm group-hover:shadow-md transition"
      />

      {/* DELETE BUTTON */}
      <button
        type="button"
        onClick={async (e) => {
          e.stopPropagation();

          try {
            const imageToDelete = images[i];

            await fetch("/api/delete-image", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                imageUrl: imageToDelete,
              }),
            });

            setImages(images.filter((_, idx) => idx !== i));

            toast.success("Image removed");
          } catch (err) {
            console.log(err);
            toast.error("Failed to delete");
          }
        }}
        className="absolute top-2 right-2 z-20 bg-black/80 backdrop-blur text-white w-7 h-7 rounded-full text-xs flex items-center justify-center hover:scale-110 transition"
      >
        ✕
      </button>

      {/* DRAG HANDLE */}
      <div
        {...attributes}
        {...listeners}
        className="absolute bottom-2 right-2 z-10 bg-white/90 backdrop-blur border shadow-sm rounded-lg px-2 py-1 text-xs cursor-grab active:cursor-grabbing"
      >
        ↕reorder
      </div>
    </div>
  );
}

export default function Products() {




const handleDragEnd = (event) => {
  const { active, over } = event;

  if (!over || active.id === over.id) return;

  setImages((items) => {
    const oldIndex = items.indexOf(active.id);
    const newIndex = items.indexOf(over.id);

    return arrayMove(items, oldIndex, newIndex);
  });
};




const [loadingProducts, setLoadingProducts] = useState(true);
const [search, setSearch] = useState("");
const [filterCategory, setFilterCategory] = useState("");
  const editor = useRef(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

const [oldPrice, setOldPrice] = useState("");
const [description, setDescription] = useState("");
// for seo

const [metaTitle, setMetaTitle] = useState("");
const [metaDescription, setMetaDescription] = useState("");

const [longdescription, setLongdescription] = useState("");

const [features, setFeatures] = useState("");
const [stock, setStock] = useState(true);
const [colors, setColors] = useState([]);
const [youtubeLink, setYoutubeLink] = useState("");
const [specs, setSpecs] = useState([{ key: "", value: "" }]);
  const [categories, setCategories] = useState([]);
const [selectedCategories, setSelectedCategories] = useState([]);

  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);

const [editorKey, setEditorKey] = useState(0);

// state for sizes and stock
const [sizes, setSizes] = useState([]);


// for seo

useEffect(() => {

  // AUTO TITLE
  if (name) {

    setMetaTitle(
      `${name} | Buy Online at Best Price`
    );

  }

  // AUTO DESCRIPTION
  if (description) {

    const cleanDesc = description
      .replace(/<[^>]*>/g, "")
      .trim();

    setMetaDescription(
      cleanDesc.slice(0, 160)
    );

  }

}, [name, description]);



// for colors

const addColor = () => {
  setColors([
    ...colors,
    {
      color: "",
      code: "",
    },
  ]);
};

const updateColor = (index, field, value) => {
  const updated = [...colors];

  updated[index][field] = value;

  setColors(updated);
};

const removeColor = (index) => {
  setColors(colors.filter((_, i) => i !== index));
};


const [categorySearch, setCategorySearch] = useState("");


const filteredCategories = categories.filter((c) =>
  c.name
    .toLowerCase()
    .includes(categorySearch.toLowerCase())
);


// for sizes

const addSize = () => {
  setSizes([
    ...sizes,
    {
      size: "",
      price: "",
      oldPrice: "",
      stock: "",
    },
  ]);
};

const updateSize = (index, field, value) => {
  const updated = [...sizes];
  updated[index][field] = value;
  setSizes(updated);
};

const removeSize = (index) => {
  setSizes(sizes.filter((_, i) => i !== index));
};


  //  Fetch data
 useEffect(() => {
  fetch("/api/categories")
    .then((res) => res.json())
    .then(setCategories);

  fetch("/api/product")
    .then((res) => res.json())
    .then((data) => {

      setProducts(data);
        console.log("PRODUCTS API:", data);
    })
    .finally(() => {
      setLoadingProducts(false);
    });
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
  const MAX_IMAGES = 5;

  // check current + new images
  if (images.length + files.length > MAX_IMAGES) {
    return toast.error(
      `You can upload a maximum of ${MAX_IMAGES} images only`
    );
  }

  setUploading(true);

  const toastId = toast.loading("Uploading images...");

  try {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("files", file);
    });

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      setImages((prev) => [...prev, ...data.urls]);

      toast.success("Images uploaded", {
        id: toastId,
      });
    } else {
      toast.error("Upload failed", {
        id: toastId,
      });
    }
  } catch (err) {
    console.log(err);

    toast.error("Upload failed", {
      id: toastId,
    });
  }

  setUploading(false);
};

  //  Create / Update
  const handleSubmit = async () => {
    if (!images.length) return toast.error("Upload image first");

    const toastId = toast.loading(editingId ? "Updating..." : "Adding...");

   const payload = {
  name,
  slug: name.toLowerCase().replace(/\s+/g, "-"),
price: Number(price),
oldPrice: oldPrice ? Number(oldPrice) : 0,
  description,
  features: features.split(","),
  stock,
  categories: selectedCategories,
  images,
  metaTitle,
  metaDescription,
sizes: sizes.filter(
  (s) => s.size?.trim()
),



colors: colors.filter(
  (c) => c.color?.trim()
),
    youtubeLink,
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
 setSelectedCategories([]);
  setImages([]);
  setYoutubeLink("");
  setEditingId(null);
  setMetaTitle("");
setMetaDescription("");
  setOldPrice("");
  setDescription("");
  setFeatures("");
  setStock(true);
  setLongdescription("");
setColors([]);
 
setSizes([]);

  setSpecs([{ key: "", value: "" }]);

  // force Jodit reset
  setEditorKey((prev) => prev + 1);
};

  const refreshProducts = () => {
    fetch("/api/product").then(res => res.json()).then(setProducts);
  };

  //  Edit
const handleEdit = (p) => {
  setEditingId(p._id);
  setName(p.name);
  setPrice(p.price);
  setOldPrice(p.oldPrice || "");
  setDescription(p.description || "");
  setFeatures(p.features?.join(",") || "");
  setStock(p.stock);
 setSelectedCategories(
  p.categories?.map((c) =>
    typeof c === "object" ? c._id : c
  ) || []
);
  setImages(p.images);
  setMetaTitle(p.metaTitle || "");
setMetaDescription(
  p.metaDescription || ""
);

setColors(
  p.colors?.length
    ? p.colors.map((c) => ({
        color: c.color || "",
        code: c.code || "",
      }))
    : []
);
  

setSizes(
  p.sizes?.length
    ? p.sizes.map((s) => ({
        size: s.size || "",
        price: s.price || "",
        oldPrice: s.oldPrice || "",
        stock: s.stock || "",
      }))
    : []
);


setYoutubeLink(p.youtubeLink?.trim() || "");
  setLongdescription(p.longdescription || "");
  setSpecs(p.specifications || [{ key: "", value: "" }]);

  window.scrollTo({
  top: 0,
  behavior: "smooth",
});

};

  //  Delete
  const handleDelete = async (id) => {
    const toastId = toast.loading("Deleting...");

    await fetch(`/api/product?id=${id}`, { method: "DELETE" });

    setProducts(prev => prev.filter(p => p._id !== id));

    toast.success("Deleted", { id: toastId });
  };


const filteredProducts = products.filter((p) => {
  const matchSearch =
    p.name.toLowerCase().includes(search.toLowerCase());

 const matchCategory =
  !filterCategory ||
  p.categories?.some((cat) =>
    (typeof cat === "object" ? cat._id : cat) === filterCategory
  );

  return matchSearch && matchCategory;
});

  return (
  <div className="w-full px-10 py-10 bg-[#eeeff1] min-h-screen">

    {/* HEADER */}
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-semibold text-gray-800">
        {editingId ? "Edit Product" : "Add Product"}
      </h1>

      {editingId && (
        <button
          onClick={resetForm}
          className="text-md text-white bg-black px-4 py-2 rounded-lg"
        >
          Cancel Edit
        </button>
      )}
    </div>

    {/* MAIN GRID */}
    <div className="grid md:grid-cols-2 gap-6">

      {/* LEFT FORM */}
      <div className="md:col-span-2 space-y-6">

        {/* BASIC INFO */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="font-semibold mb-4 text-black">Basic Info</h2>

          <input
            className="w-full border p-3  border-black rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-black/20"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-3 ">
            <input
              className="border p-3 rounded-lg border-black"
              placeholder="Sale Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <input
              className="border p-3 rounded-lg border-black"
              placeholder="Regular Price"
              value={oldPrice}
              onChange={(e) => setOldPrice(e.target.value)}
            />
          </div>

   <div className="mt-4">
  <label className="block mb-2 font-medium text-gray-700">
    Categories
  </label>

  <input
    type="text"
    placeholder="Search categories..."
    value={categorySearch}
    onChange={(e) =>
      setCategorySearch(e.target.value)
    }
    className="w-full border border-gray-300 rounded-lg p-3 mb-3"
  />

  <div className="max-h-[250px] overflow-y-auto border border-gray-200 rounded-xl p-3 bg-gray-50">
    {filteredCategories.map((cat) => (
      <label
        key={cat._id}
        className="flex items-center gap-3 py-2 cursor-pointer"
      >
        <input
          type="checkbox"
          checked={selectedCategories.includes(cat._id)}
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedCategories([
                ...selectedCategories,
                cat._id,
              ]);
            } else {
              setSelectedCategories(
                selectedCategories.filter(
                  (id) => id !== cat._id
                )
              );
            }
          }}
        />

        <span>{cat.name}</span>
      </label>
    ))}
  </div>
</div>


        </div>


        {/* SEO SECTION */}
<div className="bg-white p-6 rounded-2xl shadow-sm">

  <h2 className="font-semibold mb-4 text-black">
    SEO Settings
  </h2>

  {/* META TITLE */}
  <div className="mb-4">

    <label className="text-sm font-medium block mb-2">
      Meta Title
    </label>

    <input
      value={metaTitle}
      onChange={(e) =>
        setMetaTitle(e.target.value)
      }
      placeholder="Meta title"
      className="w-full border border-black p-3 rounded-lg"
    />

    <p className="text-xs text-gray-500 mt-1">
      {metaTitle.length}/60 characters
    </p>

  </div>

  {/* META DESCRIPTION */}
  <div>

    <label className="text-sm font-medium block mb-2">
      Meta Description
    </label>

    <textarea
      value={metaDescription}
      onChange={(e) =>
        setMetaDescription(e.target.value)
      }
      rows={4}
      placeholder="Meta description"
      className="w-full border border-black p-3 rounded-lg"
    />

    <p className="text-xs text-gray-500 mt-1">
      {metaDescription.length}/160 characters
    </p>

  </div>

</div>



        {/* DESCRIPTION */}
        <div className="bg-white p-6 rounded-2xl shadow-sm ">
          <h2 className="font-semibold mb-4 text-black">Product Content</h2>

          <textarea
            className="w-full border p-3 rounded-lg mb-3 border-black"
            placeholder="Short Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <textarea
            className="w-full border p-3 rounded-lg mb-3 border-black"
            placeholder="Features (comma separated)"
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
          />

          <div>
            <p className="mb-2 text-sm font-medium text-gray-600 ">
              Full Description
            </p>

            <div className="border rounded-lg overflow-hidden">
             <JoditEditor
  key={editorKey}
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
            <h2 className="font-semibold text-black">Specifications</h2>

            <button
              onClick={addSpec}
              className="text-sm bg-black text-white px-4 py-2 rounded-lg"
            >
              + Add More
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
                  className="col-span-2 border p-2 border-black rounded-lg"
                />

                <input
                  placeholder="Value"
                  value={spec.value}
                  onChange={(e) => updateSpec(i, "value", e.target.value)}
                  className="col-span-2 border border-black p-2 rounded-lg"
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


<div className="mb-4">
  {sizes.length === 0 ? (
    <button
      type="button"
      onClick={() =>
        setSizes([
          {
            size: "",
            price: "",
            oldPrice: "",
            stock: "",
          },
        ])
      }
      className="bg-black text-white px-5 py-3 rounded-xl"
    >
      Add Sizes
    </button>
  ) : (
    <button
      type="button"
      onClick={() => setSizes([])}
      className="bg-red-500 text-white px-5 py-3 rounded-xl"
    >
      Remove Sizes
    </button>
  )}
</div>

{/* SIZES */}
{sizes.length > 0 && (
  <div className="bg-white p-6 rounded-2xl shadow-sm">
    
    <div className="flex justify-between items-center mb-4">
      <h2 className="font-semibold text-black">
        Sizes
      </h2>

      <button
        type="button"
        onClick={addSize}
        className="text-sm bg-black text-white px-4 py-2 rounded-lg"
      >
        + Add Size
      </button>
    </div>

    <div className="space-y-4">
      {sizes.map((item, i) => (
        <div
          key={i}
          className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end border p-4 rounded-xl"
        >
          
          {/* SIZE */}
          <div className="md:col-span-3 flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Size
            </label>

            <input
              placeholder="Enter Size"
              value={item.size || ""}
              onChange={(e) =>
                updateSize(i, "size", e.target.value)
              }
              className="border p-2 rounded-lg border-black"
            />
          </div>

          {/* PRICE */}
          <div className="md:col-span-2 flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Price
            </label>

            <input
              type="number"
              placeholder="Enter Price"
              value={item.price || ""}
              onChange={(e) =>
                updateSize(i, "price", e.target.value)
              }
              className="border p-2 rounded-lg border-black"
            />
          </div>

          {/* OLD PRICE */}
          <div className="md:col-span-2 flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Old Price
            </label>

            <input
              type="number"
              placeholder="Enter Old Price"
              value={item.oldPrice || ""}
              onChange={(e) =>
                updateSize(i, "oldPrice", e.target.value)
              }
              className="border p-2 rounded-lg border-black"
            />
          </div>

          {/* STOCK */}
          <div className="md:col-span-2 flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Stock
            </label>

            <input
              type="number"
              placeholder="Enter Stock"
              value={item.stock || ""}
              onChange={(e) =>
                updateSize(i, "stock", e.target.value)
              }
              className="border p-2 rounded-lg border-black"
            />
          </div>

          {/* DELETE */}
          <div className="md:col-span-2 flex flex-col">
            <label className="text-sm font-medium text-transparent mb-1">
              Delete
            </label>

            <button
              type="button"
              onClick={() => removeSize(i)}
              className="bg-red-100 text-red-600 rounded-lg h-10 hover:bg-red-200 transition"
            >
              ✕ Remove
            </button>
          </div>

        </div>
      ))}
    </div>

  </div>
)}





{/* COLORS */}
<div className="mb-4">

  {colors.length === 0 ? (

    <button
      type="button"
      onClick={() =>
        setColors([
          {
            color: "",
            code: "",
          },
        ])
      }
      className="bg-black text-white px-5 py-3 rounded-xl"
    >
      Add Colors
    </button>

  ) : (

    <button
      type="button"
      onClick={() => setColors([])}
      className="bg-red-500 text-white px-5 py-3 rounded-xl"
    >
      Remove Colors
    </button>

  )}

</div>


{/* COLOR SECTION */}
{colors.length > 0 && (

  <div className="bg-white p-6 rounded-2xl shadow-sm">

    <div className="flex justify-between items-center mb-4">

      <h2 className="font-semibold text-black">
        Colors
      </h2>

      <button
        type="button"
        onClick={addColor}
        className="text-sm bg-black text-white px-4 py-2 rounded-lg"
      >
        + Add Color
      </button>

    </div>

    <div className="space-y-4">

      {colors.map((item, i) => (

        <div
          key={i}
          className="
            grid
            grid-cols-1
            md:grid-cols-12
            gap-4
            border
            p-4
            rounded-xl
          "
        >

          {/* COLOR NAME */}
          <div className="md:col-span-4">

            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Color Name
            </label>

            <input
              placeholder="Black"
              value={item.color}
              onChange={(e) =>
                updateColor(i, "color", e.target.value)
              }
              className="
                border
                p-3
                rounded-lg
                border-black
                w-full
              "
            />

          </div>

          {/* COLOR PICKER */}
          <div className="md:col-span-6">

            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Select Color
            </label>

            <div className="flex items-center gap-3">

              {/* PICKER */}
              <input
                type="color"
                value={item.code || "#000000"}
                onChange={(e) =>
                  updateColor(i, "code", e.target.value)
                }
                className="
                  w-16
                  h-12
                  border
                  rounded-lg
                  cursor-pointer
                  bg-white
                  p-1
                "
              />

              {/* PREVIEW */}
              <div
                className="
                  flex-1
                  h-12
                  rounded-lg
                  border
                "
                style={{
                  background:
                    item.code || "#000000",
                }}
              />

            </div>

          </div>

          {/* REMOVE */}
          <div className="md:col-span-2">

            <label className="text-sm text-transparent block mb-1">
              Delete
            </label>

            <button
              type="button"
              onClick={() => removeColor(i)}
              className="
                bg-red-100
                text-red-600
                rounded-lg
                h-12
                w-full
              "
            >
              ✕ Remove
            </button>

          </div>

        </div>

      ))}

    </div>

  </div>

)}

      </div>










      {/* RIGHT PANEL */}
      <div className="space-y-6">




        {/* STATUS */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="font-semibold mb-4 text-gray-700">Status</h2>

          <select
            value={stock}
            onChange={(e) => setStock(e.target.value === "true")}
            className="w-full border p-3 rounded-lg border-black"
          >
            <option value="true">In Stock</option>
            <option value="false">Out of Stock</option>
          </select>
        </div>

        <div className="bg-white p-5 rounded-md border shadow-sm " >


         <label className="font-bold text-lg border-black">Add Youtube Link here</label>
 
     <div className="relative mt-3">

     
  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500">
    ▶
  </span>

  <input
    className="w-full border p-3 pl-10 rounded-lg border-black"
    placeholder="https://youtube.com/..."
    value={youtubeLink}
    onChange={(e) => setYoutubeLink(e.target.value)}
  />
</div>
        </div>

   



     {/* IMAGE UPLOAD */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="font-semibold mb-4 text-black">Images</h2>

     <label className="border-2 border-dashed border-black hover:border-black/40 transition rounded-2xl p-6 flex flex-col items-center justify-center bg-gray-50 cursor-pointer">

  <span className="text-4xl mb-3">
    🖼️
  </span>

  <p className="text-sm font-semibold text-gray-700">
    Click to upload product images
  </p>

<p className="text-md text-gray-800 mt-1 text-center">
  PNG, JPG, WEBP • <span className="text-red-600 text-md">( Maximum 5 images )</span> 
</p>

<input
  type="file"
  multiple
  disabled={images.length >= 5}
  className="hidden"
  onChange={(e) => uploadImages([...e.target.files])}
/>

<p className="text-sm text-gray-600 mt-4">
  {images.length}/5 images uploaded
</p>
</label>


      <DndContext
  collisionDetection={closestCenter}
  onDragEnd={handleDragEnd}
>
  <SortableContext
    items={images}
    strategy={rectSortingStrategy}
  >
   <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-5">
      {images.map((img, i) => (
        <SortableImage
          key={img}
          img={img}
          i={i}
          images={images}
          setImages={setImages}
        />
      ))}
    </div>
  </SortableContext>
</DndContext>


        </div>

        {/* SUBMIT */}
        <button
          onClick={handleSubmit}
          disabled={uploading}
          className="w-full bg-black cursor-pointer text-white text-xl py-4 rounded-xl font-medium hover:opacity-90 transition"
        >
          {uploading
            ? "Uploading..."
            : editingId
            ? "Update Product"
            : "Publish Product"}
        </button>

      </div>

    </div>


 <h2 className="text-xl md:text-4xl  mt-15   font-semibold mb-4 text-gray-800">
        All Products Listed Below
      </h2>

{/* SEARCH + CATEGORY FILTER */}
{/* SEARCH + CATEGORY FILTER (PREMIUM UI) */}
<div className="mt-6 flex flex-col md:flex-row gap-3 items-stretch">

  {/* SEARCH */}
  <div className="flex-1 relative">
    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
      🔍
    </span>

    <input
      type="text"
      placeholder="Search products here..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full pl-9 pr-4 py-3 rounded-xl border border-black  bg-white shadow-sm 
      focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition"
    />
  </div>

  {/* CATEGORY FILTER */}
  <div className="relative md:w-64">
    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
      📂
    </span>

    <select
      value={filterCategory}
      onChange={(e) => setFilterCategory(e.target.value)}
      className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm 
      focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition appearance-none"
    >
      <option value="">All Categories</option>
      {categories.map((c) => (
        <option key={c._id} value={c._id}>
          {c.name}
        </option>
      ))}
    </select>

    {/* dropdown arrow */}
    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
      ▼
    </span>
  </div>

  {/* RESET BUTTON */}
  <button
    onClick={() => {
      setSearch("");
      setFilterCategory("");
    }}
    className="px-6 py-3 rounded-xl bg-gradient-to-r from-gray-900 to-gray-700 text-white 
    shadow-md hover:shadow-lg hover:scale-[1.02] transition font-medium"
  >
    Reset
  </button>

</div>
    {/* PRODUCT GRID */}
    <div className="mt-12">
     

   {loadingProducts ? (

  <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

    {[...Array(8)].map((_, i) => (
      <div
        key={i}
        className="bg-white p-3 rounded-xl shadow-sm animate-pulse"
      >
        <div className="w-full h-32 bg-gray-200 rounded-lg"></div>

        <div className="h-4 bg-gray-200 rounded mt-3 w-3/4"></div>

        <div className="h-4 bg-gray-200 rounded mt-2 w-1/2"></div>

        <div className="flex gap-2 mt-4">
          <div className="flex-1 h-8 bg-gray-200 rounded"></div>
          <div className="flex-1 h-8 bg-gray-200 rounded"></div>
        </div>
      </div>
    ))}

  </div>

) : filteredProducts.length === 0 ? (

  <div className="bg-white rounded-2xl p-10 text-center shadow-sm">
    <div className="text-5xl mb-3">📦</div>

    <h3 className="text-xl font-semibold text-gray-700">
      No Products Found
    </h3>

    <p className="text-gray-500 mt-2">
      Try changing search or category filter
    </p>
  </div>

) : (

  <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

    {filteredProducts.map((p) => (
      <div
        key={p._id}
        className="bg-white p-3 rounded-xl shadow-sm hover:shadow-md transition"
      >
        <img
          src={p.images?.[0]}
          className="w-full h-32 object-cover rounded-lg"
        />

        <h3 className="mt-2 text-sm font-medium">
          {p.name}
        </h3>

        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold">
            ₹{p.price}
          </p>

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

)}
    </div>

  </div>
);

}