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
        { status: 400 },
      );
    }

    // Find user by phone
    const user = await User.findOne({ phone });

    // User not found
    if (!user) {
      return NextResponse.json({ msg: "User not found" }, { status: 404 });
    }

    // User found → create your existing JWT
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    return NextResponse.json({
      msg: "Login successful",
      token,
      user,
    });
  } catch (error) {
    console.error("Check Phone Error:", error);

    return NextResponse.json(
      {
        msg: "Server error",
      },
      {
        status: 500,
      },
    );
  }
}
