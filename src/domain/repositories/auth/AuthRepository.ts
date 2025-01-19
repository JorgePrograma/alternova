import { User } from "../../entities/User";

export interface AuthRepository {
  login(email: string, password: string): Promise<User | null>;
  logout(): Promise<boolean>;
}
