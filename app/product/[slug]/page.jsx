import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import "@/models/Category";
import ProductView from "./ProductView";

export default async function ProductPage({ params }) {
  await connectDB();

const resolvedParams = await params;
const slug = resolvedParams.slug;

  const product = await Product.findOne({ slug }).populate("category");

  if (!product) {
    return <div className="text-center text-red-500">Product not found</div>;
  }

  // ✅ convert mongoose object → plain JSON
  const cleanProduct = JSON.parse(JSON.stringify(product));

  return <ProductView product={cleanProduct} />;
}