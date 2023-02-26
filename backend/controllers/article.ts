import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";
import errorGenerate from "../utils/errorGenerate";
import Article from "../models/Article";
import checkArticle from "../validators/article";
import IAddArticle from "../types/IAddArticle";

export const createArticle = async (
  req: Request<{}, {}, IAddArticle, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const checkData = await checkArticle({ ...req.body });
    if (checkData !== true) {
      errorGenerate("Invalid Inputs", 400, checkData);
    }
    const newArticle = new Article(req.body);
    const savedArticle = await newArticle.save();

    res
      .status(201)
      .json({ message: "Article created successfully", data: savedArticle });
  } catch (err) {
    next(err);
  }
};

export const updateArticle = async (
  req: Request<{ id: string }, {}, IAddArticle, {}>,
  res: Response,
  next: NextFunction
) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    errorGenerate("Invalid Id", 400);
  }
  try {
    const checkData = await checkArticle({ ...req.body });
    if (checkData !== true) {
      errorGenerate("Invalid Inputs", 400, checkData);
    }
    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      { $set: { ...req.body } },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Article updated successfully", data: updatedArticle });
  } catch (err) {
    next(err);
  }
};

export const deleteArticle = async (
  req: Request<{ id: string }, {}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    errorGenerate("Invalid Id", 400);
  }
  try {
    await Article.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Article deleted successfully" });
  } catch (err) {
    next(err);
  }
};

export const getArticle = async (
  req: Request<{ id: string }, {}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    errorGenerate("Invalid Id", 400);
  }
  try {
    const article = await Article.findById(req.params.id);

    res
      .status(200)
      .json({ message: "Article found successfully", data: article });
  } catch (err) {
    next(err);
  }
};

export const getArticles = async (
  req: Request<
    {},
    {},
    {},
    { page?: string; limit?: string; category?: string; search?: string }
  >,
  res: Response,
  next: NextFunction
) => {
  const { query } = req;
  const pageNumber = parseInt(req.query.page || "1");
  const nPerPage = parseInt(req.query.limit || "6");

  let filters: any = {};
  if (query?.category) {
    filters.category = { $in: query.category.split("/") };
  }
  if (query.search) {
    filters.title = {
      $regex: new RegExp(".*" + query.search.trim() + ".*", "ig"),
    };
  }
  try {
    const articles = await Article.find(filters)
      .populate({
        path: "reviews",
        populate: { path: "userId", select: "userName email" },
      })
      .sort({ _id: 1 })
      .skip((pageNumber - 1) * nPerPage)
      .limit(nPerPage);
    const totalArticles = await Article.countDocuments(filters);

    res.status(200).json({
      message: "Articles found successfully",
      data: articles,
      currentPage: pageNumber,
      nextPage: pageNumber + 1,
      previoousPage: pageNumber - 1,
      hasNextPage: nPerPage * pageNumber < totalArticles,
      hasPreviousPage: pageNumber > 1,
      lastPage: Math.ceil(totalArticles / nPerPage),
      total: totalArticles,
    });
  } catch (err) {
    next(err);
  }
};
