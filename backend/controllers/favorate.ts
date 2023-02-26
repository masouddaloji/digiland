import mongoose from "mongoose";
import errorGenerate from "../utils/errorGenerate";
import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import Product from "../models/Product";

export const favorate = async (
  req: Request<{ productId: string }, {}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.productId)) {
      errorGenerate("Invalid ID", 400);
    }
    const productId = req.params.productId;
    const user = await User.findOne({ email: req.user })
      .select("-password -refreshToken")
      .exec();
    if (!user) {
      errorGenerate("Unauthorized", 401);
    }
    const product = await Product.findOne({ _id: productId }).lean().exec();
    if (!product) {
      errorGenerate("Invalid product Id");
    }
    user?.favorates?.push(product?._id!);
    await user?.save();
    res.status(200).json({ message: "Product added to favorate." });
  } catch (err) {
    next(err);
  }
};

export const unfavorate = async (
  req: Request<{ productId: string }, {}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.productId)) {
      errorGenerate("Invalid ID", 400);
    }
    const productId = req.params.productId;
    const user = await User.findOne({ email: req.user })
      .select("-password -refreshToken")
      .exec();
    if (!user) {
      errorGenerate("Unauthorized", 401);
    }
    const product = await Product.findOne({ _id: productId }).lean().exec();
    if (!product) {
      errorGenerate("Invalid product Id");
    }
    await user?.updateOne({ $pull: { favorates: productId } });
    await user?.save();
    res.status(200).json({ message: "Product removed from favorate list." });
  } catch (err) {
    next(err);
  }
};

export const getFavorates = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userWithWishlist = await User.findOne({ email: req.user })
      .populate("favorates")
      .select("-password -refreshToken")
      .sort({ _id: 1 });
    const totalWishlist = userWithWishlist?.favorates!.length;

    if (!userWithWishlist) {
      errorGenerate("Favorate list not found", 404);
    }
    res
      .status(200)
      .json({ data: userWithWishlist!.favorates, total: totalWishlist });
  } catch (err) {
    next(err);
  }
};
