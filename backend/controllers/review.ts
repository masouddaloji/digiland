import checkReview from "../validators/review";
import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";
import errorGenerate from "../utils/errorGenerate";
import Review from "../models/Review";
import Article from "../models/Article";
import Product from "../models/Product";
import User from "../models/User";

export const getProductsReviews = async (
  req: Request<{}, {}, {}, { page?: string; limit?: string }>,
  res: Response,
  next: NextFunction
) => {
  const pageNumber = parseInt(req.query.page || "1");
  const nPerPage = parseInt(req.query.limit || "6");
  try {
    const reviews = await Review.find({ articleId: { $exists: false } })
      .populate("userId", "_id email name")
      .populate("productId")
      .sort({ _id: 1 })
      .skip((pageNumber - 1) * nPerPage)
      .limit(nPerPage);
    const totalReviews = await Review.countDocuments({
      articleId: { $exists: false },
    });

    if (!reviews) {
      errorGenerate("Reviews not found", 404);
    }
    res.status(200).send({
      data: reviews,
      currentPage: pageNumber,
      nextPage: pageNumber + 1,
      previoousPage: pageNumber - 1,
      hasNextPage: nPerPage * pageNumber < totalReviews,
      hasPreviousPage: pageNumber > 1,
      lastPage: Math.ceil(totalReviews / nPerPage),
      total: totalReviews,
    });
  } catch (err) {
    next(err);
  }
};

export const getArticlesReviews = async (
  req: Request<{}, {}, {}, { page?: string; limit?: string }>,
  res: Response,
  next: NextFunction
) => {
  const pageNumber = parseInt(req.query.page || "1");
  const nPerPage = parseInt(req.query.limit || "6");
  try {
    const reviews = await Review.find({ productId: { $exists: false } })
      .populate("userId", "_id email name")
      .populate("articleId")
      .sort({ _id: 1 })
      .skip((pageNumber - 1) * nPerPage)
      .limit(nPerPage);
    const totalReviews = await Review.countDocuments({
      productId: { $exists: false },
    });

    if (!reviews) {
      errorGenerate("Reviews not found", 404);
    }
    res.status(200).send({
      data: reviews,
      currentPage: pageNumber,
      nextPage: pageNumber + 1,
      previoousPage: pageNumber - 1,
      hasNextPage: nPerPage * pageNumber < totalReviews,
      hasPreviousPage: pageNumber > 1,
      lastPage: Math.ceil(totalReviews / nPerPage),
      total: totalReviews,
    });
  } catch (err) {
    next(err);
  }
};

export const getReviewsByProductId = async (
  req: Request<{ pid: string }, {}, {}, { page?: string; limit?: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.pid)) {
      errorGenerate("Invalid ID", 400);
    }

    const pageNumber = parseInt(req.query.page || "1");
    const nPerPage = parseInt(req.query.limit || "6");
    const productWithReviews = await Product.findById(req.params.pid)
      .populate({
        path: "reviews",
        model: "Review",
        populate: {
          path: "userId",
          model: "User",
          select: "_id email name",
        },
      })
      .sort({ _id: 1 })
      .skip((pageNumber - 1) * nPerPage)
      .limit(nPerPage);

    const totalReviews = await Review.countDocuments({
      productId: { $exists: false },
    });

    if (!productWithReviews) {
      errorGenerate("Product not found", 404);
    }
    res.status(200).send({
      data: productWithReviews,
      currentPage: pageNumber,
      nextPage: pageNumber + 1,
      previoousPage: pageNumber - 1,
      hasNextPage: nPerPage * pageNumber < totalReviews,
      hasPreviousPage: pageNumber > 1,
      lastPage: Math.ceil(totalReviews / nPerPage),
      total: totalReviews,
    });
  } catch (err) {
    next(err);
  }
};

export const getReviewsByArticleId = async (
  req: Request<{ aid: string }, {}, {}, { page?: string; limit?: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.aid)) {
      errorGenerate("Invalid ID", 400);
    }

    const pageNumber = parseInt(req.query.page || "1");
    const nPerPage = parseInt(req.query.limit || "6");
    const articleWithReviews = await Article.findById(req.params.aid)
      .populate({
        path: "reviews",
        model: "Review",
        populate: {
          path: "userId",
          model: "User",
          select: "_id email name",
        },
      })
      .sort({ _id: 1 })
      .skip((pageNumber - 1) * nPerPage)
      .limit(nPerPage);

    const totalReviews = await Review.countDocuments({
      productId: { $exists: false },
    });

    if (!articleWithReviews) {
      errorGenerate("Article has no reviews", 404);
    }
    res.status(200).send({
      data: articleWithReviews,
      currentPage: pageNumber,
      nextPage: pageNumber + 1,
      previoousPage: pageNumber - 1,
      hasNextPage: nPerPage * pageNumber < totalReviews,
      hasPreviousPage: pageNumber > 1,
      lastPage: Math.ceil(totalReviews / nPerPage),
      total: totalReviews,
    });
  } catch (err) {
    next(err);
  }
};

export const addProductReview = async (
  req: Request<{ id: string }, {}, { rating: number; description: string }, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      errorGenerate("Invalid ID", 400);
    }
    const { rating, description } = req.body;

    if (!rating || !description) {
      errorGenerate("Rating and description are required.", 400);
    }
    const checkData = await checkReview({ rating, description });
    if (checkData !== true) {
      errorGenerate("Invalid Inputs", 400, checkData);
    }
    const user = await User.findOne({ email: req.user })
      .select("-password -refreshToken")
      .lean()
      .exec();
    if (!user) {
      errorGenerate("User not found", 404);
    }
    const newReview = await Review.create({
      rating,
      description,
      userId: user?._id,
      productId: req.params.id,
    });
    const product = await Product.findOne({ _id: req.params.id })
      .populate("reviews")
      .exec();
    if (!product) {
      errorGenerate("Product not found");
    }
    //@ts-ignore
    product?.reviews.push(newReview);
    await product?.save();
    res.status(201).json({ message: "Review created", data: newReview });
  } catch (err) {
    next(err);
  }
};

export const deleteProductReview = async (
  req: Request<{ id: string; pid: string }, {}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    if (
      !mongoose.Types.ObjectId.isValid(req.params.pid) ||
      !mongoose.Types.ObjectId.isValid(req.params.id)
    ) {
      errorGenerate("Invalid id", 400);
    }
    const review = await Review.findById(req.params.id)
      .populate("userId", "_id email name")
      .populate("productId");

    const user = await User.findOne({ email: req.user })
      .select("-password -refreshToken")
      .lean()
      .exec();
    if (!review || !review.productId) {
      errorGenerate("Review not found", 404);
    }
    if (!user) {
      errorGenerate("Unauthorized", 401);
    }
    /* This is checking if the user is the owner of the review. */
    if (
      user?.role === "user" &&
      review!.userId._id.toString() !== user._id.toString()
    ) {
      errorGenerate("You are not allowed to delete this review", 401);
    }

    if (review!.productId?._id?.toString() !== req.params.pid.toString()) {
      errorGenerate("Invalid product id", 400);
    }

    await review!.remove();
    //@ts-ignore
    review.productId.reviews.pull(review);
    //@ts-ignore
    await review.productId.save();
    res.status(200).json({ message: "Review deleted", data: review });
  } catch (err) {
    next(err);
  }
};

export const addArticleReview = async (
  req: Request<{ id: string }, {}, { rating: number; description: string }, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      errorGenerate("Invalid ID", 400);
    }
    const { rating, description } = req.body;

    if (!rating || !description) {
      errorGenerate("Rating and description are required.", 400);
    }
    const checkData = await checkReview({ rating, description });
    if (checkData !== true) {
      errorGenerate("Invalid Inputs", 400, checkData);
    }
    const user = await User.findOne({ email: req.user })
      .select("-password -refreshToken")
      .lean()
      .exec();
    if (!user) {
      errorGenerate("User not found", 404);
    }
    const newReview = await Review.create({
      rating,
      description,
      userId: user?._id,
      articleId: req.params.id,
    });
    const article = await Article.findById(req.params.id).populate("reviews");

    if (!article) {
      errorGenerate("Product not found", 404);
    }
    //@ts-ignore
    article?.reviews.push(newReview);
    await article?.save();

    res.status(201).json({ message: "Review created", data: newReview });
  } catch (err) {
    next(err);
  }
};

export const deleteArticleReview = async (
  req: Request<{ id: string; aid: string }, {}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    if (
      !mongoose.Types.ObjectId.isValid(req.params.aid) ||
      !mongoose.Types.ObjectId.isValid(req.params.id)
    ) {
      errorGenerate("Invalid id", 400);
    }
    const review = await Review.findById(req.params.id)
      .populate("userId")
      .populate("articleId");

    const user = await User.findOne({ email: req.user })
      .select("-password -refreshToken")
      .lean()
      .exec();
    if (!review || !review.articleId) {
      errorGenerate("Review not found", 404);
    }
    if (!user) {
      errorGenerate("Unauthorized", 401);
    }
    /* This is checking if the user is the owner of the review. */
    if (
      user?.role === "user" &&
      review!.userId._id.toString() !== user._id.toString()
    ) {
      errorGenerate("You are not allowed to delete this review", 401);
    }

    if (review!.articleId!._id?.toString() !== req.params.aid.toString()) {
      errorGenerate("Invalid article id", 400);
    }

    await review!.remove();
    //@ts-ignore
    review?.articleId.reviews.pull(review);
    //@ts-ignore
    await review?.articleId.save();
    res.status(200).json({ message: "Review deleted", data: review });
  } catch (err) {
    next(err);
  }
};
