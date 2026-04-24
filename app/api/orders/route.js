import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import jwt from "jsonwebtoken";

export async function GET(req) {
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

  const orders = await Order.find({ userId: decoded.id }).sort({
    createdAt: -1,
  });

  return Response.json(orders);
}

