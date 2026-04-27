import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    await connectDB();

    const token = req.headers.get("authorization")?.split(" ")[1];

    if (!token) {
      return Response.json({ msg: "No token" }, { status: 401 });
    }

    let decoded;

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return Response.json({ msg: "Invalid token" }, { status: 401 });
    }

    const body = await req.json();

  const order = await Order.create({
  userId: decoded.id,
  customerName: body.customerName,
  email: body.email,
  phone: body.phone,
  items: body.items,
  totalAmount: body.totalAmount,
  address: body.address,
  paymentMethod: body.paymentMethod,
});

    return Response.json(order);

  } catch (err) {
    console.error("ORDER CREATE ERROR:", err);
    return Response.json({ msg: "Server error" }, { status: 500 });
  }
}