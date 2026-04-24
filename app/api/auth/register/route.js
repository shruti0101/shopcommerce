import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  await connectDB();

  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return Response.json({ msg: "All fields required" }, { status: 400 });
  }

  const existing = await User.findOne({ email });
  if (existing) {
    return Response.json({ msg: "User already exists" }, { status: 400 });
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashed,
    
  });

  return Response.json({ msg: "User created", user });
}