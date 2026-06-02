import { connectDB } from "@/lib/db";
import User from "@/models/User";
import Order from "@/models/Order";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  const users = await User.find({})
    .select("-password")
    .lean();

  const usersWithOrders = await Promise.all(
    users.map(async (user) => {
      const orders = await Order.find({
        userId: user._id,
      }).lean();

      return {
        ...user,
        orderCount: orders.length,
        totalSpent: orders.reduce(
          (sum, order) =>
            sum + (order.totalAmount || 0),
          0
        ),
        orders,
      };
    })
  );

  return NextResponse.json(usersWithOrders);
}