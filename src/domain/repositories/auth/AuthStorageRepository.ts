import { UserStorage } from '../../entities/UserStorage';

export interface AuthStorageRepository {
  save(user: UserStorage): Promise<boolean>;
  getUser(): Promise<UserStorage | null>
  delete(): Promise<boolean>;
}
