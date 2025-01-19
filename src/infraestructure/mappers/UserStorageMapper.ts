import { UserStorage } from "@/src/domain/entities/UserStorage";
import { UserStorageModel } from "./../models/UserStorageModel";

export class UserStorageMapper {
  public static toDomain(model: UserStorageModel): UserStorage {
    return {
      user: model.user,
      token: model.token,
    };
  }

  public static toModel(entity: UserStorage): UserStorageModel {
    return {
      user: entity.user,
      token: entity.token,
    };
  }
}
