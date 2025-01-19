import { User } from "./User";

export interface UserStorage {
  user: User;
  token: string;
}
