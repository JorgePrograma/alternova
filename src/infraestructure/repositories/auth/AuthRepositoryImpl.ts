import { AuthRepository } from '@/src/domain/repositories/auth/AuthRepository';
import { User } from '../../../domain/entities/User';
import { AuthDatasource } from '../../datasources/auth/Authdatasource';
import { UserMapper } from '../../mappers/UserMapper';

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private datasource: AuthDatasource) {}

  async login(email: string, password: string): Promise<User | null> {
    const userModel = await this.datasource.login(email, password);
    if (userModel === null) {
      return null;
    }
    return UserMapper.toDomain(userModel);
  }

  async logout(): Promise<boolean> {
    return this.datasource.logout();
  }
}
