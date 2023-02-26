import mongoose from "mongoose";
import IReview from "../types/IReview";

const reviewSchema = new mongoose.Schema<IReview>(
  {
    rating: { type: Number, min: 0, max: 5, required: true },
    description: { type: String, trim: true, required: true },
    productId: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
    },
    articleId: {
      type: mongoose.Types.ObjectId,
      ref: "Article",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model<IReview>("Review", reviewSchema);
