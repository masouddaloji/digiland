import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";
import errorGenerate from "../utils/errorGenerate";
import User from "../models/User";
import IUpadateUser from "../types/IUpdateUser";
import checkUserData from "../validators/userData";

export const createAdmin = async (
  req: Request<{}, {}, { email: string }, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const newAdmin = await User.findOne({ email: req.body.email })
      .select("-password -refreshToken")
      .exec();

    if (!newAdmin) {
      errorGenerate("No user found with this email");
    }

    if (newAdmin && newAdmin.role === "admin") {
      errorGenerate("Admin exists already", 422);
    }

    newAdmin!.role = "admin";

    await newAdmin!.save();

    res.status(201).json({
      message: "Admin created",
      data: newAdmin,
    });
  } catch (err) {
    next(err);
  }
};

export const updateAdmin = async (
  req: Request<{ id: string }, {}, IUpadateUser, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    /* Checking if the id is valid or not. */
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      errorGenerate("Invalid ID", 400);
    }

    const user = await User.findOne({ email: req.user })
      .select("-password -refreshToken")
      .exec();
    if (user!.role !== "superAdmin" && user?._id.toString() !== req.params.id) {
      errorGenerate("You are not authorized to update this user", 403);
    }
    const checkData = await checkUserData({ ...req.body });
    if (checkData !== true) {
      errorGenerate("Invalid Inputs", 400, checkData);
    }
    const updatedAdmin = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: { ...req.body },
      },
      { new: true }
    ).select("-password -refreshToken");

    res.status(200).json({
      message: "Admin updated successfully",
      data: updatedAdmin,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteAdmin = async (
  req: Request<{ id: string }, {}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      errorGenerate("Invalid ID", 400);
    }
    const admin = await User.findById(req.params.id)
      .select("-password -refreshToken")
      .exec();

    if (!admin || admin.role !== "admin") {
      errorGenerate("Admin not found!", 404);
    }
    admin!.role = "user";
    await admin?.save();
    res.status(200).json({
      message: "Admin deleted successfully",
      data: admin,
    });
  } catch (err) {
    return next(next(err));
  }
};

export const getAdmin = async (
  req: Request<{ id: string }, {}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      errorGenerate("Invalid ID", 400);
    }

    const admin = await User.findById(req.params.id).select(
      "-password -refreshToken"
    );

    if (!admin || admin.role !== "admin") {
      errorGenerate("Admin not found!", 404);
    }
    res.status(200).json({
      message: "Admin found successfully",
      data: admin,
    });
  } catch (err) {
    next(err);
  }
};

export const getAdmins = async (
  req: Request<{}, {}, {}, {page?: string, limit?: string;}>,
  res: Response,
  next: NextFunction
) => {
  const pageNumber = parseInt(req.query.page || "1");
  const nPerPage = parseInt(req.query.limit || "10");
  try {
    const admins = await User.find(
      { role: "admin" },
      "-password -refreshToken"
    ).skip((pageNumber - 1) * nPerPage)
    .limit(nPerPage);

    const totalAdmins = await User.countDocuments({ role: "admin" });

    res.status(200).json({
      message: "Admins found successfully",
      data: admins,
      currentPage: pageNumber,
      nextPage: pageNumber + 1,
      previoousPage: pageNumber - 1,
      hasNextPage: nPerPage * pageNumber < totalAdmins,
      hasPreviousPage: pageNumber > 1,
      lastPage: Math.ceil(totalAdmins / nPerPage),
      total: totalAdmins,
    });
  } catch (err) {
    next(err);
  }
};
