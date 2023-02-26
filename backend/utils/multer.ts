import { Request } from "express";
// import { nanoid } from "nanoid";
import multer, { FileFilterCallback } from "multer";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

// export const storage = multer.diskStorage({
//   destination: (
//     request: Request,
//     file: Express.Multer.File,
//     callback: DestinationCallback
//   ): void => {
//     callback(null, "./public/uploads/images");
//   },

//   filename: (
//     req: Request,
//     file: Express.Multer.File,
//     callback: FileNameCallback
//   ): void => {
//     const ext = file.mimetype;
//     callback(null, `${nanoid()}_${file.originalname}`);
//   },
// });

export const fileFilter = (
  request: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
): void => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    callback(null, true);
  } else {
    callback(new Error("Only jpeg, jpg and png is supported."));
  }
};

export const upload = multer({
    limits: {fileSize: 4000000},
    // dest: 'uploads/images/',
    // storage,
    fileFilter
})
