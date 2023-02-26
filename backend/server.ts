import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import path from "path";
import errorHandler from "./middlewares/errorHandler";
import credentials from "./middlewares/credentials";
import cookieParser from "cookie-parser";
import cors from "cors";
import corsOptions from "./config/corsOptions";
import connectDB from "./config/connectDB";
import mongoose from "mongoose";
import helmet from "helmet";

import authRoutes from "./routes/auth";
import productRoutes from "./routes/product";
import userRoutes from "./routes/user";
import orderRoutes from "./routes/order";
import adminRoutes from "./routes/admin";
import superAdminRoutes from "./routes/superAdmin";
import articleRoutes from "./routes/article";
import basketRoutes from "./routes/basket";
import uploadRoutes from "./routes/upload";

import verifyJWT from "./middlewares/verifyJWT";

const app = express();
const PORT = process.env.PORT || 8000;
connectDB();

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

app.use(cookieParser());

app.use(cors(corsOptions));

app.use(express.json());

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use("/", express.static(path.join(__dirname, "public")));

//* Routes
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/users", verifyJWT, userRoutes);
app.use("/orders", verifyJWT, orderRoutes);
app.use("/admins", verifyJWT, adminRoutes);
app.use("/superadmins", verifyJWT, superAdminRoutes);
app.use("/articles", articleRoutes);
app.use("/basket", verifyJWT, basketRoutes);
app.use("/upload", verifyJWT, uploadRoutes);

app.all("*", (req: Request, res: Response) => {
  res.status(404).json({ message: "404 Not Found" });
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on("error", (err: any) => {
  console.log(err);
});
