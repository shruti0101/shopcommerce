import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import "@/models/Category";
import ProductView from "./ProductView";


// ✅ SEO METADATA
export async function generateMetadata({
  params,
}) {

  await connectDB();

  const resolvedParams = await params;

  const slug = resolvedParams.slug;

  const product = await Product.findOne({
    slug,
  });

  // fallback
  if (!product) {

    return {

      title: "Product Not Found",

      description:
        "The requested product could not be found.",

    };

  }

  return {

    title:
      product.metaTitle ||
      product.name,

    description:
      product.metaDescription ||
      product.description,

  };

}



export default async function ProductPage({ params }) {

  await connectDB();

  const resolvedParams = await params;

  const slug = resolvedParams.slug;

  const product = await Product.findOne({
    slug,
  }).populate("categories");

  if (!product) {
    return (
      <div className="text-center text-red-500">
        Product not found
      </div>
    );
  }

  // 🔥 FETCH RELATED PRODUCTS
let relatedProducts = [];

if (product?.category?._id) {
  relatedProducts = await Product.find({
    category: product.category._id,
    _id: { $ne: product._id },
  })
    .limit(6)
    .populate("category");
}

  const cleanProduct = JSON.parse(
    JSON.stringify(product)
  );

  const cleanRelated = JSON.parse(
    JSON.stringify(relatedProducts)
  );

  return (
    <ProductView
      product={cleanProduct}
      relatedProducts={cleanRelated}
    />
  );
}