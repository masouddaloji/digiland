import { Types } from "mongoose";

export default interface IArticle {
  title: string;
  image: string;
  description: string;
  writer: string;
  reviews: Types.ObjectId;
  category: string;
}
