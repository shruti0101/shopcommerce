// import { connectDB } from "@/lib/db";
// import User from "@/models/User";
// import bcrypt from "bcryptjs";

// export async function GET() {
//   await connectDB();

//   const existing = await User.findOne({ email: "admin@gmail.com" });

//   if (existing) {
//     return Response.json({ msg: "Admin already exists" });
//   }

//   const hashedPassword = await bcrypt.hash("admin123", 10);

//   const admin = await User.create({
//     name: "Admin",
//     email: "admin@gmail.com",
//     password: hashedPassword,
//     role: "admin",
//   });

//   return Response.json({ msg: "Admin created", admin });
// }