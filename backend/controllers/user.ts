import mongoose from "mongoose";
import errorGenerate from "../utils/errorGenerate";
import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import checkUserData from "../validators/userData";
import IUpadateUser from "../types/IUpdateUser";

export const updateUser = async (
  req: Request<{ id: string }, {}, IUpadateUser, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      errorGenerate("Invalid ID", 400);
    }

    const user = await User.findById(req.params.id).select("-password -refreshToken");

    if (!user) {
      errorGenerate("User not found!", 404);
    }
    if (user!.role === "user" && user?._id.toString() !== req.params.id) {
      errorGenerate("You are not authorized to update this user", 403);
    }
    const checkData = await checkUserData({ ...req.body });
    if (checkData !== true) {
      errorGenerate("Invalid Inputs", 400, checkData);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: { ...req.body },
      },
      { new: true }
    ).select("-password -refreshToken");

    res.status(200).json({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (
  req: Request<{ id: string }, {}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      errorGenerate("Invalid ID", 400);
    }

    const user = await User.findByIdAndDelete(req.params.id).select(
      "-password -refreshToken"
    );

    if (!user) {
      errorGenerate("User not found!", 404);
    }

    res.status(200).json({
      message: "User deleted successfully",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

export const getUser = async (
  req: Request<{ id: string }, {}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      errorGenerate("Invalid ID", 400);
    }

    const user = await User.findById(req.params.id).select(
      "-password -refreshToken"
    );

    if (!user) {
      errorGenerate("User not found!", 404);
    }
    res.status(200).json({
      message: "User found successfully",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (
  req: Request<{}, {}, {}, { page?: string; limit?: string }>,
  res: Response,
  next: NextFunction
) => {
  const pageNumber = parseInt(req.query.page || "1");
  const nPerPage = parseInt(req.query.limit || "10");
  try {
    const users = await User.find({ role: "user" }, "-password -refreshToken")
      .sort({ _id: 1 })
      .skip((pageNumber - 1) * nPerPage)
      .limit(nPerPage);
    const totalUsers = await User.countDocuments({ role: "user" });

    res.status(200).json({
      message: "Users found successfully",
      data: users,
      currentPage: pageNumber,
      nextPage: pageNumber + 1,
      previoousPage: pageNumber - 1,
      hasNextPage: nPerPage * pageNumber < totalUsers,
      hasPreviousPage: pageNumber > 1,
      lastPage: Math.ceil(totalUsers / nPerPage),
      total: totalUsers,
    });
  } catch (err) {
    next(err);
  }
};
