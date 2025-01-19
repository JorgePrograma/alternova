import { UserStorageModel } from '../../models/UserStorageModel';

export interface AuthStorageDatasource {
  save(user: UserStorageModel): Promise<boolean>;
  getUser(): Promise<UserStorageModel | null>
  delete(): Promise<boolean>;
}
