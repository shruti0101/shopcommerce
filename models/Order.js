import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    items: [
      {
        productId: String,
        name: String,
        price: Number,
        quantity: Number,
        image: String,
      },
    ],
    totalAmount: Number,
   


status: {
  type: String,
  enum: ["Pending", "Fulfilled"],
  default: "Pending",
},



  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);