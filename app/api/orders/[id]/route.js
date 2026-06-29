import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import User from "@/models/User";
import jwt from "jsonwebtoken";

export async function PATCH(req, { params }) {
  await connectDB();

  const token =
    req.headers
      .get("authorization")
      ?.split(" ")[1];

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

  const admin = await User.findById(
    decoded.id
  );

  if (
    !admin ||
    admin.role !== "admin"
  ) {
    return Response.json(
      { msg: "Unauthorized" },
      { status: 403 }
    );
  }

  const { status } = await req.json();

console.log("ORDER ID:", params.id);
console.log("NEW STATUS:", status);



const order = await Order.findByIdAndUpdate(
  params.id,
  { status },
  { new: true }
);

console.log("UPDATED ORDER:", order);

return Response.json(order);
}