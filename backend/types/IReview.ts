import { Types } from "mongoose";

export default interface IReview {
  rating: number;
  description: string;
  productId?: Types.ObjectId;
  articleId?: Types.ObjectId;
  userId: Types.ObjectId;
}
