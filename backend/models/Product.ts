import mongoose from "mongoose";
import IProduct, { IGallery } from "../types/IProduct";

const gallerySchema = new mongoose.Schema<IGallery>(
  {
    image: { type: String, required: true },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema<IProduct>(
  {
    title: { type: String, required: true, unique: true, trim: true },
    segment: { type: String, required: true, unique: true, trim: true },
    image: {
      type: String,
    },
    gallery: {
      type: [String],
      default: undefined,
      validate: {
        validator: function (v: any) {
          return v && v.length <= 6;
        },
        message: "Gallery can be a maximum of 6 images.",
      },
    },
    offPrice: { type: Number, min: 0, max: 100 },
    price: { type: Number, required: true },
    rating: { type: Number, min: 0, max: 5 },
    quantity: { type: Number },
    colors: {
      type: [String],
      validate: {
        validator: function (v: any) {
          return v && v.length <= 3;
        },
        message: "Colors can be a maximum of 3 items.",
      },
    },
    category: { type: String, trim: true },
    tags: {
      type: [String],
      validate: {
        validator: function (v: any) {
          return v && v.length <= 3;
        },
        message: "tags can be a maximum of 3 items.",
      },
    },
    shortDescription: { type: String, trim: true },
    fullDescription: { type: String, trim: true },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    brand: { type: String, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>("Product", productSchema);
