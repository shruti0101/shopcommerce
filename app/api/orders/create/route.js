import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    await connectDB();

    const token =
      req.headers.get("authorization")?.split(" ")[1];

    if (!token) {
      return Response.json(
        { msg: "No token" },
        { status: 401 }
      );
    }

    let decoded;

    try {
      decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );
    } catch {
      return Response.json(
        { msg: "Invalid token" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const order = await Order.create({
      userId: decoded.id,

      customerName: body.name,
      email: body.email,
      phone: body.phone,

      address: body.address,
      pincode: body.pincode,

      company: body.company,
      gst: body.gst,

      items: body.items,

      totalAmount: body.totalAmount,

      paymentMethod: "ICICI",
      paymentStatus: "pending",
    });

    return Response.json(order);
  } catch (err) {
    console.error(err);

    return Response.json(
      { msg: "Server error" },
      { status: 500 }
    );
  }
}