import { connectDB } from "@/lib/db";
import Wishlist from "@/models/Wishlist";
import Product from "@/models/Product";
import { getUserFromToken } from "@/lib/getUser";

export async function GET(req) {
  await connectDB();

  const user = getUserFromToken(req);
  if (!user) return Response.json({ msg: "Unauthorized" }, { status: 401 });

  const wishlist = await Wishlist.findOne({ user: user.id })
    .populate("products");

  return Response.json(wishlist?.products || []);
}

export async function POST(req) {
  await connectDB();

  const user = getUserFromToken(req);
  if (!user) return Response.json({ msg: "Unauthorized" }, { status: 401 });

  const { productId } = await req.json();

  let wishlist = await Wishlist.findOne({ user: user.id });

  if (!wishlist) {
    wishlist = await Wishlist.create({
      user: user.id,
      products: [productId],
    });
  } else {
    if (!wishlist.products.includes(productId)) {
      wishlist.products.push(productId);
      await wishlist.save();
    }
  }

  return Response.json({ msg: "Added to wishlist" });
}

export async function DELETE(req) {
  await connectDB();

  const user = getUserFromToken(req);
  if (!user) return Response.json({ msg: "Unauthorized" }, { status: 401 });

  const { productId } = await req.json();

  await Wishlist.updateOne(
    { user: user.id },
    { $pull: { products: productId } }
  );

  return Response.json({ msg: "Removed" });
}