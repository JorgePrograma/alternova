
import { User } from "@/src/domain/entities/User";
import { UserModel } from "../models/UserModel";

export class UserMapper {
  public static toDomain(userModel: UserModel): User {
    return {
      id: userModel.id,
      name: userModel.name,
      email: userModel.email,
    };
  }

  public static toModel(user: User): UserModel {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
