import { IAddresses } from "./IUser";

export default interface IUpadateUser {
  name?: string;
  image?: string;
  phone?: string;
  addresses?: IAddresses[];
}
