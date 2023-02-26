import { Types } from "mongoose";

export interface IAddresses {
  state: string;
  city: string;
  street: string;
  postalCode: string;
}

interface CartItems {
  productId: Types.ObjectId | string;
  cartQuantity: number;
}

export default interface IUser {
  email: string;
  password?: string;
  name?: string;
  image?: string;
  phone?: string;
  addresses?: IAddresses[];
  orders: [Types.ObjectId];
  role: "user" | "admin" | "superAdmin";
  favorates?: [Types.ObjectId];
  basket?: {
    totalAmount: number;
    totalQTY: number;
    cartItems: CartItems[] | [];
  };
  refreshToken?: string;
}
