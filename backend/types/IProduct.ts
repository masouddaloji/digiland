import { Types } from "mongoose";

export interface IGallery {
  image: string;
}

export default interface IProduct {
  title: string;
  segment: string;
  image: string;
  gallery?: IGallery[];
  offPrice?: number;
  price: number;
  rating?: number;
  quantity: number;
  colors?: [string];
  category?: string;
  subCategory?: string;
  shortDescription?: string;
  fullDescription?: string;
  reviews?: Types.ObjectId;
  brand?: string;
}
