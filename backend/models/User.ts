import mongoose from "mongoose";
import IUser, { IAddresses } from "../types/IUser";

const addressSchema = new mongoose.Schema<IAddresses>(
  {
    state: { type: String, trim: true },
    city: { type: String, trim: true },
    street: { type: String, trim: true },
    postalCode: { type: String, minlength: 10 },
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      minlength: 8,
      maxlength: 255,
    },
    name: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 255,
    },
    image: {
      type: String,
    },
    phone: { type: String, minlength: 10 },
    addresses: [addressSchema],
    orders: [{ type: mongoose.Types.ObjectId, ref: "Order" }],
    role: {
      type: String,
      enum: ["user", "admin", "superAdmin"],
      default: "user",
    },
    favorates: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    basket: {
      totalAmount: {
        type: Number,
        default: 0,
      },
      totalQTY: {
        type: Number,
        default: 0,
      },
      cartItems: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
          },
          cartQuantity: {
            type: Number,
          },
        },
      ],
    },
    refreshToken: String,
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", userSchema);
