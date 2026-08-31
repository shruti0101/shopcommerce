import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    await connectDB();

    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { msg: "No token provided" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];

    let decoded;

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return NextResponse.json(
        { msg: "Invalid or expired token" },
        { status: 401 }
      );
    }

    const body = await req.json();

    if (
      !body.name ||
      !body.email ||
      !body.phone ||
      !body.address ||
      !body.pincode ||
      !body.items ||
      body.items.length === 0
    ) {
      return NextResponse.json(
        { msg: "Required order details are missing" },
        { status: 400 }
      );
    }

    const order = await Order.create({
      userId: decoded.id,

      customerName: body.name,
      email: body.email,
      phone: body.phone,

      address: body.address,
      pincode: body.pincode,

      company: body.company || "",
      gst: body.gst || "",

      items: body.items,

      totalAmount: body.totalAmount,

      paymentMethod: "ICICI",
      paymentStatus: "pending",
    });

    return NextResponse.json(
      {
        msg: "Order created successfully",
        order,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create Order Error:", error);

    return NextResponse.json(
      {
        msg: "Server error",
      },
      {
        status: 500,
      }
    );
  }
}