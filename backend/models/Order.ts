import mongoose from "mongoose";
import IOrder from "../types/IOrder";

const orderSchema = new mongoose.Schema<IOrder>(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "delivered", "cancelled"],
      default: "pending",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model<IOrder>("Order", orderSchema);
