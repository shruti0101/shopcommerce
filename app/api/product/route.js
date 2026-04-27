import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import Category from "@/models/Category";

// ✅ CREATE
export async function POST(req) {
  await connectDB();
  const data = await req.json();

   console.log("DATA RECEIVED:", data); 

  const product = await Product.create({
    ...data,
    price: Number(data.price),
    oldPrice: data.oldPrice ? Number(data.oldPrice) : 0, // 🔥 FIX
  });

  return Response.json(product);
}

// ✅ READ
// ✅ READ (OPTIMIZED WITH PAGINATION)
export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);

  const slug = searchParams.get("category");
  const sort = searchParams.get("sort");
  const page = Number(searchParams.get("page")) || 1;
  const limit = 8; // 🔥 products per page

  let filter = {};
  let sortOption = {};

  // ✅ CATEGORY FILTER
  if (slug) {
    const category = await Category.findOne({ slug }).select("_id");
    if (!category) {
      return Response.json({ products: [], hasMore: false });
    }
    filter.category = category._id;
  }

  // ✅ SORTING
  if (sort === "price_low_to_high") sortOption.price = 1;
  if (sort === "price_high_to_low") sortOption.price = -1;

  // ✅ TOTAL COUNT (for pagination)
  const total = await Product.countDocuments(filter);

  // ✅ MAIN QUERY (OPTIMIZED)
  const products = await Product.find(filter)
    .select("name price oldPrice images slug") // 🔥 VERY IMPORTANT
    .sort(sortOption)
    .skip((page - 1) * limit)
    .limit(limit)
    .lean(); // 🔥 faster response

  return Response.json({
    products,
    hasMore: page * limit < total,
  });
}

// ✅ UPDATE
export async function PUT(req) {
  await connectDB();

  const data = await req.json();

  const updated = await Product.findByIdAndUpdate(
    data._id,
    {
      ...data,
      price: Number(data.price),
      oldPrice: data.oldPrice ? Number(data.oldPrice) : 0, // 🔥 FIX
    },
    { new: true }
  );

  return Response.json(updated);
}

// ✅ DELETE
export async function DELETE(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  await Product.findByIdAndDelete(id);

  return Response.json({ success: true });
}