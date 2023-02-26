import { Request, Response, NextFunction } from "express";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.statusCode || 500; // server error
  const message = err.message || "Something went wrong.Try again...";
  const data = err.data;
  if (data) {
    return res.status(status).json({ message, data, isError: true });
  }
  res.status(status).json({ message, isError: true });
};

export default errorHandler;
