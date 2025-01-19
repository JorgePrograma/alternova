import { UserModel } from "./UserModel";

export interface UserStorageModel{
         user: UserModel;
         token: string;
}