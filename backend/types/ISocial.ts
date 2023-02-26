import { Types } from "mongoose";

export default interface ISocial {
  username: string;
  profileUrl: string;
  userId: Types.ObjectId;
}
