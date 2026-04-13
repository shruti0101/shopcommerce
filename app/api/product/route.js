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
export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("category");
  const sort = searchParams.get("sort");

  let filter = {};
  let sortOption = {};

  if (slug) {
    const category = await Category.findOne({ slug });
    if (!category) return Response.json([]);
    filter.category = category._id;
  }

  if (sort === "price_low_to_high") sortOption.price = 1;
  if (sort === "price_high_to_low") sortOption.price = -1;

  const products = await Product.find(filter)
    .sort(sortOption)
    .populate("category");

  return Response.json(products);
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