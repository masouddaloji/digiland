import { CustomError } from "../types/error";

const errorGenerate = (message: string, status: number = 500, data?: any[]) => {
  const err = new Error(message) as CustomError;
  err.statusCode = status;
  data && (err.data = data);
  throw err;
};

export default errorGenerate;
