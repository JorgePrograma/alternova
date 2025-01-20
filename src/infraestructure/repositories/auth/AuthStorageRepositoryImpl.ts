import { UserStorage } from '@/src/domain/entities/UserStorage';
import { AuthStorageDatasource } from '../../datasources/authstorage/AuthStorageDatasource';
import { AuthStorageRepository } from '@/src/domain/repositories/auth/AuthStorageRepository';

export class AuthStorageRepositoryImpl implements AuthStorageRepository {

  constructor(private datasource: AuthStorageDatasource) {}

 async save(user: UserStorage): Promise<boolean> {
    const result =  await this.datasource.save(user)
    return result;   
  }

  async getUser(): Promise<UserStorage | null> {
    return this.datasource.getUser()
  }

  async delete(): Promise<boolean> {
  return this.datasource.delete()
  }
  
}
