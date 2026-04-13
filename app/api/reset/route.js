// // app/api/reset/route.js

// import { connectDB } from "@/lib/db";
// import Product from "@/models/Product";
// import Category from "@/models/Category";

// export async function GET() {
//   await connectDB();

//   await Product.deleteMany({});
//   await Category.deleteMany({});

//   return Response.json({ message: "Database cleared" });
// }