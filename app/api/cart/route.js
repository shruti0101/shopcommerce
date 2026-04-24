import { connectDB } from "@/lib/db";
import Cart from "@/models/Cart";
import { getUserFromToken } from "@/lib/getUser";

export async function GET(req) {
  await connectDB();

  const user = getUserFromToken(req);
  if (!user) return Response.json([], { status: 200 });

  const cart = await Cart.findOne({ user: user.id }).populate("items.product");

  return Response.json(cart?.items || []);
}

export async function POST(req) {
  await connectDB();

  const user = getUserFromToken(req);
  if (!user) return Response.json({ msg: "Unauthorized" }, { status: 401 });

  const { productId, quantity } = await req.json();

  let cart = await Cart.findOne({ user: user.id });

  if (!cart) {
    cart = await Cart.create({
      user: user.id,
      items: [{ product: productId, quantity }],
    });
  } else {
    const existing = cart.items.find(
      (i) => i.product.toString() === productId
    );

    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
  }

  return Response.json({ msg: "Cart updated" });
}

export async function DELETE(req) {
  await connectDB();

  const user = getUserFromToken(req);
  if (!user) return Response.json({ msg: "Unauthorized" }, { status: 401 });

  const { productId } = await req.json();

  await Cart.updateOne(
    { user: user.id },
    { $pull: { items: { product: productId } } }
  );

  return Response.json({ msg: "Removed from cart" });
}