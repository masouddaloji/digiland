import { Request, Response, NextFunction } from "express";
import sharp from "sharp";
const nanoid = require("nanoid").nanoid;
import { upload } from "../utils/multer";
import User from "../models/User";
import errorGenerate from "../utils/errorGenerate";

export const profileImage = async (
  req: Request<{}, {}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    upload.single("image")(req, res, async (err: any) => {
      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json({ message: "Maximum size is 4MB" });
        }
        return res.status(400).json({ err });
      } else {
        if (req.file) {
          const user = await User.findOne({ email: req.user })
            .select("-password -refreshToken")
            .exec();
          if (!user) {
            errorGenerate("User not found", 404);
          }
          const fileName = `${nanoid()}_${req.file.originalname}`;
          await sharp(req.file.buffer)
            .jpeg({ quality: 60 })
            .toFile(`./public/uploads/images/${fileName}`)
            .catch((err) => {
              return res
                .status(500)
                .json({ message: "Something went wrong.Try again..." });
            });
          user!.image = `/uploads/images/${fileName}`;
          await user!.save();
          return res.status(200).json({
            message: "File uploaded successfully",
            path: `/uploads/images/${fileName}`,
          });
        } else {
          res.status(400).json({ message: "No content" });
        }
      }
    });
  } catch (err) {
    next(err);
  }
};

export const articleImage = async (
  req: Request<{}, {}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    upload.single("image")(req, res, async (err: any) => {
      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json({ message: "Maximum size is 4MB" });
        }
        return res.status(400).json({ err });
      } else {
        if (req.file) {
          const fileName = `${nanoid()}_${req.file.originalname}`;
          await sharp(req.file.buffer)
            .jpeg({ quality: 60 })
            .toFile(`./public/uploads/images/${fileName}`)
            .catch((err) => {
              return res
                .status(500)
                .json({ message: "Something went wrong.Try again..." });
            });
          return res.status(200).json({
            message: "File uploaded successfully",
            path: `/uploads/images/${fileName}`,
          });
        } else {
          res.status(400).json({ message: "No content" });
        }
      }
    });
  } catch (err) {
    next(err);
  }
};

export const productImage = async (
  req: Request<{}, {}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    upload.single("image")(req, res, async (err: any) => {
      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json({ message: "Maximum size is 4MB" });
        }
        return res.status(400).json({ err });
      } else {
        if (req.file) {
          const fileName = `${nanoid()}_${req.file.originalname}`;
          await sharp(req.file.buffer)
            .jpeg({ quality: 60 })
            .toFile(`./public/uploads/images/${fileName}`)
            .catch((err) => {
              return res
                .status(500)
                .json({ message: "Something went wrong.Try again..." });
            });
          return res.status(200).json({
            message: "File uploaded successfully",
            path: `/uploads/images/${fileName}`,
          });
        } else {
          res.status(400).json({ message: "No content" });
        }
      }
    });
  } catch (err) {
    next(err);
  }
};

export const productGallery = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    upload.array("images", 6)(req, res, async (err: any) => {
      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json({ message: "Maximum size is 4MB" });
        }
        return res.status(400).json({ err });
      } else {
        if (req.files && req.files.length) {
          const galleryArray: string[] = [];
          //@ts-ignore
          await req.files.forEach(async (file: Express.Multer.File) => {
            const fileName = `${nanoid()}_${file.originalname}`;
            galleryArray.push(`/uploads/images/${fileName}`);
            await sharp(file.buffer)
              .jpeg({ quality: 60 })
              .toFile(`./public/uploads/images/${fileName}`)
              .catch((err) => {
                return res
                  .status(500)
                  .json({ message: "Something went wrong.Try again..." });
              });
          });
          return res.status(200).json({
            message: "Files uploaded successfully",
            galleryArray,
          });
        } else {
          res.status(400).json({ message: "No content" });
        }
      }
    });
  } catch (err) {
    next(err);
  }
};
