import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    customerName: String,
    email: String,
    phone: String,

    address: String,
    pincode: String,

    company: String,
    gst: String,

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

    paymentMethod: {
      type: String,
      default: "ICICI",
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    transactionId: String,

    merchantTxnNo: String,

    status: {
      type: String,
      enum: ["Pending", "Fulfilled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order ||
  mongoose.model("Order", OrderSchema);