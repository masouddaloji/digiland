import mongoose, { ConnectOptions } from "mongoose";

type ConnectionOptionsExtend = {
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
};

const options: ConnectOptions & ConnectionOptionsExtend = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  authSource: "admin",
};

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.DATABASE_URI?.toString()!, options);
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
