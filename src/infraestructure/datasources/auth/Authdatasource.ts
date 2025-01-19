import { UserModel } from "./../../models/UserModel";

export interface AuthDatasource {
  login(email: string, password: string): Promise<UserModel | null>;
  logout(): Promise<boolean>;
}
