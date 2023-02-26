import mongoose from "mongoose";
import IArticle from "../types/IArticle";

const articleSchema = new mongoose.Schema<IArticle>(
  {
    title: { type: String, trim: true },
    image: { type: String, trim: true },
    description: { type: String, trim: true },
    writer: { type: String, trim: true },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    category: { type: String, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model<IArticle>("Article", articleSchema);
