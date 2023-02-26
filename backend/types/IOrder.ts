import { Types } from "mongoose";

export default interface IOrder {
  productId: Types.ObjectId;
  status: "pending" | "delivered" | "cancelled";
  userId: Types.ObjectId;
}
