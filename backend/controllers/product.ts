import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";
import errorGenerate from "../utils/errorGenerate";
import Product from "../models/Product";
import IProduct from "../types/IProduct";
import checkProduct from "../validators/product";

export const createProduct = async (
  req: Request<{}, {}, IProduct, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const checkData = await checkProduct({ ...req.body });
    if (checkData !== true) {
      errorGenerate("Invalid Inputs", 400, checkData);
    }
    const newProduct = await Product.create({ ...req.body });

    if (!newProduct) {
      errorGenerate("Product creation failed.try again");
    }

    res
      .status(201)
      .json({ message: "Product created successfully", data: newProduct });
  } catch (err) {
    next(err);
  }
};

export const updateProduct = async (
  req: Request<{ id: string }, {}, IProduct, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      errorGenerate("Invalid ID", 400);
    }

    const checkData = await checkProduct({ ...req.body });
    if (checkData !== true) {
      errorGenerate("Invalid Inputs", 400, checkData);
    }
    const product = await Product.findById(req.params.id);
    if (!product) {
      errorGenerate("Product not found");
    }
    await product?.update({ $set: { ...req.body } }, { new: true });
    await product?.save();
    res
      .status(200)
      .json({ message: "Product updated successfully", data: product });
  } catch (err) {
    next(err);
  }
};
export const deleteProduct = async (
  req: Request<{ id: string }, {}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      errorGenerate("Invalid ID", 400);
    }
    const product = await Product.findById(req.params.id);
    if (!product) {
      errorGenerate("Product not found");
    }
    product?.delete();
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    return next(next(err));
  }
};
export const getProduct = async (
  req: Request<{ id: string }, {}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      errorGenerate("Invalid ID", 400);
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res
      .status(200)
      .json({ message: "Product found successfully", data: product });
  } catch (err) {
    next(err);
  }
};

export const getProducts = async (
  req: Request<
    {},
    {},
    {},
    {
      page?: string;
      limit?: string;
      category?: string;
      color?: string;
      price?: string;
      sort?: string;
      search?: string;
    }
  >,
  res: Response,
  next: NextFunction
) => {
  const query = req.query;
  const pageNumber = parseInt(query.page || "1");
  const nPerPage = parseInt(query.limit || "6");

  let filters: any = {};
  if (query?.category) {
    filters.category = { $in: query.category.split("/") };
  }
  if (query?.color) {
    filters.colors = { $in: query.color.split("/") };
  }
  if (query?.price) {
    let min = query.price.split("/")[0].replace(/^\D+/g, "");
    let max = query.price.split("/")[1].replace(/^\D+/g, "");
    filters.price = { $gte: min, $lte: max };
  }
  let sort: any = { _id: -1 };
  if (query?.sort) {
    if (query.sort === "rating") {
      sort = { rating: 1 };
    }
    if (query.sort === "latest") {
      sort = { createdAt: -1 };
    }
    if (query.sort === "price-low-to-high") {
      sort = { price: 1 };
    }
    if (query.sort === "price-high-to-low") {
      sort = { price: -1 };
    }
  }
  if (query.search) {
    filters.title = {
      $regex: new RegExp(".*" + query.search.trim() + ".*", "ig"),
    };
  }

  try {
    const products = await Product.find(filters)
      .populate("reviews.userId")
      .sort(sort)
      .skip((pageNumber - 1) * nPerPage)
      .limit(nPerPage);
    const totalProducts = await Product.countDocuments(filters);

    res.status(200).json({
      message: "Products found successfully",
      data: products,
      currentPage: pageNumber,
      nextPage: pageNumber + 1,
      previoousPage: pageNumber - 1,
      hasNextPage: nPerPage * pageNumber < totalProducts,
      hasPreviousPage: pageNumber > 1,
      lastPage: Math.ceil(totalProducts / nPerPage),
      total: totalProducts,
    });
  } catch (err) {
    next(err);
  }
};
