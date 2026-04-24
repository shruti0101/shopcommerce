import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");

  if (!q) return NextResponse.json([]);

  const products = await Product.find({
    name: { $regex: q, $options: "i" },
  }).limit(10);

  return NextResponse.json(products);
}