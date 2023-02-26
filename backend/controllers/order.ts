import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";
import errorGenerate from "../utils/errorGenerate";
import Order from "../models/Order";
import User from "../models/User";
import Product from "../models/Product";
import checkOrder from "../validators/order";

export const getOrders = async (
  req: Request<{}, {}, {}, { page?: string; limit?: string }>,
  res: Response,
  next: NextFunction
) => {
  const pageNumber = parseInt(req.query.page || "1");
  const nPerPage = parseInt(req.query.limit || "6");
  try {
    const orders = await Order.find()
      .populate("productId")
      .populate("userId", "_id email name")
      .sort({ _id: 1 })
      .skip((pageNumber - 1) * nPerPage)
      .limit(nPerPage);
    const totalOrders = await Order.countDocuments();

    if (!orders) {
      errorGenerate("Orders not found", 404);
    }
    res.status(200).json({
      message: "Orders found",
      data: orders,
      currentPage: pageNumber,
      nextPage: pageNumber + 1,
      previoousPage: pageNumber - 1,
      hasNextPage: nPerPage * pageNumber < totalOrders,
      hasPreviousPage: pageNumber > 1,
      lastPage: Math.ceil(totalOrders / nPerPage),
      total: totalOrders,
    });
  } catch (err) {
    next(err);
  }
};

export const getOrdersByUserId = async (
  req: Request<{ uid: string }, {}, {}, { page?: string; limit?: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.uid)) {
      errorGenerate("Invalid ID", 400);
    }

    const pageNumber = parseInt(req.query.page || "1");
    const nPerPage = parseInt(req.query.limit || "6");
    const userWithOrders = await User.findById(req.params.uid)
      .populate({ path: "orders", populate: { path: "productId" } })
      .select("-password -refreshToken")
      .sort({ _id: 1 })
      .skip((pageNumber - 1) * nPerPage)
      .limit(nPerPage);

    const totalOrders = await Order.countDocuments({ userId: req.params.uid });

    if (!userWithOrders) {
      errorGenerate("User has no orders", 404);
    }
    res
      .status(200)
      .json({
        message: "User orders found",
        data: userWithOrders!.orders,
        currentPage: pageNumber,
        nextPage: pageNumber + 1,
        previoousPage: pageNumber - 1,
        hasNextPage: nPerPage * pageNumber < totalOrders,
        hasPreviousPage: pageNumber > 1,
        lastPage: Math.ceil(totalOrders / nPerPage),
      });
  } catch (err) {
    next(err);
  }
};

export const addOrder = async (
  req: Request<
    {},
    {},
    { productId: string; status: "pending" | "delivered" | "cancelled" },
    {}
  >,
  res: Response,
  next: NextFunction
) => {
  try {
    const checkData = await checkOrder({ status: req.body.status });
    if (checkData !== true) {
      errorGenerate("Invalid Inputs", 400, checkData);
    }
    const user = await User.findOne({ email: req.user })
      .select("-password -refreshToken")
      .exec();

    if (!user) {
      errorGenerate("User not found", 404);
    }

    const product = await Product.findOne({ _id: req.body.productId }).exec();

    if (!product) {
      errorGenerate("Product not found", 404);
    }
    const newOrder = await Order.create({
      productId: product!.id,
      userId: user!.id,
      status: req.body.status,
    });
    user?.orders.push(newOrder as any);
    await user?.save();

    res.status(201).json({ message: "Order created", data: newOrder });
  } catch (err) {
    next(err);
  }
};

export const deleteOrder = async (
  req: Request<{ oid: string }, {}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.oid)) {
      errorGenerate("Invalid id", 400);
    }
    const order = await Order.findById(req.params.oid);
    const user = await User.findOne({ email: req.user })
      .select("-password -refreshToken")
      .exec();

    if (!order) {
      errorGenerate("Order not found", 404);
    }

    if (order?.userId.toString() !== user?._id.toString()) {
      errorGenerate("You are not authorized to delete this order", 403);
    }

    await order!.remove();
    await user?.updateOne({ $pull: { orders: req.params.oid } });
    await user?.save();
    res.status(200).json({
      message: "Order deleted",
      data: order,
    });
  } catch (err) {
    return next(next(err));
  }
};
