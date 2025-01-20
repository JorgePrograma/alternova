import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import { AuthStorageDatasource } from '@/src/infraestructure/datasources/authstorage/AuthStorageDatasource';
import { AuthStorageDatasourceImpl } from '@/src/infraestructure/datasources/authstorage/AuthStorageDatasourceImpl';
import { AuthStorageRepositoryImpl } from '@/src/infraestructure/repositories/auth/AuthStorageRepositoryImpl';
import { GetUserAutenticatedUseCase } from '@/src/domain/usecases/storage/GetUserAutenticatedUseCase';
import { DeleteUserUseCase } from '@/src/domain/usecases/storage/DeleteUserUseCase';
import { SaveUserStorageUseCase } from '@/src/domain/usecases/storage/SaveUserStorageUseCase';
import { UserStorage } from '@/src/domain/entities/UserStorage';
import { RootState } from '@/src/presentation/store/store';
import { login, logout } from '../store/slices/authSlice';
import { User } from '@/src/domain/entities/User';

interface AuthCheckResult {
  isAuthenticated: boolean;
  isLoading: boolean;
  deleteUser: () => Promise<boolean>;
  saveUser: (userStorage: UserStorage) => Promise<boolean>;
}

// Creamos las instancias fuera del hook para que no se recreen en cada render
const authStorageDatasource: AuthStorageDatasource = new AuthStorageDatasourceImpl(SecureStore);
const authStorageRepository = new AuthStorageRepositoryImpl(authStorageDatasource);
const getUserAuthenticatedUseCase = new GetUserAutenticatedUseCase(authStorageRepository);
const deleteUserUseCase = new DeleteUserUseCase(authStorageRepository);
const saveUserStorageUseCase = new SaveUserStorageUseCase(authStorageRepository);

export const useAuthCheck = (): AuthCheckResult => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isAuthenticated = useSelector((state: RootState) => !!state.auth.user);

  const checkAuth = useCallback(async (): Promise<void> => {
    try {
      const user = await getUserAuthenticatedUseCase.execute();
      if (user) {
        const newUser:User = {
          email:user.user.email,
          id:user.user.id,
          name:user.user.name
        }
        dispatch(login({ user:newUser, token: user.token || '' }));
      } else {
        dispatch(logout());
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
      dispatch(logout());
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const deleteUser = useCallback(async (): Promise<boolean> => {
    try {
      const result = await deleteUserUseCase.execute();
      if (result) {
        dispatch(logout());
      }
      return result;
    } catch (error) {
      console.error('Error deleting user:', error);
      return false;
    }
  }, [dispatch]);

  const saveUser = useCallback(async (userStorage: UserStorage): Promise<boolean> => {
    try {
      const result = await saveUserStorageUseCase.execute(userStorage);
      if (result) {
        dispatch(login({ user: userStorage.user, token: userStorage.token }));
      }
      return result;
    } catch (error) {
      console.error('Error saving user:', error);
      return false;
    }
  }, [dispatch]);

  return { isAuthenticated, isLoading, deleteUser, saveUser };
};
