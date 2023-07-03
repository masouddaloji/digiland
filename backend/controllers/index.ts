import { Request, Response, NextFunction } from "express";
import Article from "../models/Article";
import Product from "../models/Product";

export const getIndex = async (
  req: Request<{}, {}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const latestApple = await Product.find({ brand: "apple" })
      .sort({ createdAt: -1 })
      .limit(6);
    const suddenlySeggestedProducts = await Product.find()
      .sort({ price: 1 })
      .limit(10);
    const wonderfulSeggestedProducts = await Product.find()
      .sort({ rating: -1 })
      .limit(10);
    const latestProducts = await Product.find()
      .sort({ createdAt: -1 })
      .limit(10);
    const articles = await Article.find().limit(10);

    res.status(200).json({
      message: "data received successfully",
      latestApple,
      suddenlySeggestedProducts,
      wonderfulSeggestedProducts,
      latestProducts,
      articles,
    });
  } catch (err) {
    next(err);
  }
};
