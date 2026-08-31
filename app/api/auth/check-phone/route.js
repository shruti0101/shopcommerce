import { NextResponse } from "next/server";
import User from "@/models/User";
import { connectDB } from "@/lib/db";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    await connectDB();

    const { phone } = await req.json();

    if (!phone) {
      return NextResponse.json(
        { msg: "Phone number is required" },
        { status: 400 }
      );
    }

    // Normalize phone number
    const normalizedPhone = phone.toString().trim();

    if (!/^\d{10}$/.test(normalizedPhone)) {
      return NextResponse.json(
        { msg: "Invalid phone number" },
        { status: 400 }
      );
    }

    // Find user
    const user = await User.findOne({
      phone: normalizedPhone,
    }).select("-password");

    if (!user) {
      return NextResponse.json(
        { msg: "User not found" },
        { status: 404 }
      );
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is missing");

      return NextResponse.json(
        { msg: "Server configuration error" },
        { status: 500 }
      );
    }

    // Create JWT
    const token = jwt.sign(
      {
        id: user._id.toString(),
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return NextResponse.json(
      {
        msg: "Login successful",
        token,
        user,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Check Phone Error:", error);

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