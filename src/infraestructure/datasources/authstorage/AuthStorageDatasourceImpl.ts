import * as SecureStorage from 'expo-secure-store';
import { UserStorageModel } from '../../models/UserStorageModel';
import { AuthStorageDatasource } from './AuthStorageDatasource';

export class AuthStorageDatasourceImpl implements AuthStorageDatasource {

  private readonly USER_KEY = 'user_storage';

constructor(private secureStorage : typeof SecureStorage){}

  async save(user: UserStorageModel): Promise<boolean> {
    try {
      const userString = JSON.stringify(user);
      await this.secureStorage.setItemAsync(this.USER_KEY, userString)
      return true
    } catch (error) {
      return false;
    }
  }

  async getUser(): Promise<UserStorageModel | null> {
    try {
      const userString = await this.secureStorage.getItemAsync(this.USER_KEY)
      if(userString){
        return JSON.parse(userString) as UserStorageModel;
      }
      return null
    } catch (error) {
      return null;
    }
  }

  async delete(): Promise<boolean> {
    try {
      await this.secureStorage.deleteItemAsync(this.USER_KEY)
      return true
    } catch (error) {
      console.error('Error deleting user:', error);
      return false;
    }  
  }
}
