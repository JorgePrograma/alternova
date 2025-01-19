import { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { AuthStorageDatasource } from '@/src/infraestructure/datasources/authstorage/AuthStorageDatasource';
import { AuthStorageDatasourceImpl } from '@/src/infraestructure/datasources/authstorage/AuthStorageDatasourceImpl';
import { AuthStorageRepositoryImpl } from '@/src/infraestructure/repositories/auth/AuthStorageRepositoryImpl';
import { GetUserAutenticatedUseCase } from '@/src/domain/usecases/storage/GetUserAutenticatedUseCase';

interface AuthCheckResult {
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const useAuthCheck = (): AuthCheckResult => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = async (): Promise<void> => {
      const authStorageDatasource: AuthStorageDatasource = new AuthStorageDatasourceImpl(SecureStore);
      const authStorageRepository = new AuthStorageRepositoryImpl(authStorageDatasource);
      const getUserAuthenticatedUseCase = new GetUserAutenticatedUseCase(authStorageRepository);
      
      try {
        const user = await getUserAuthenticatedUseCase.execute();
        setIsAuthenticated(!!user);
      } catch (error) {
        console.error('Error checking authentication:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  return { isAuthenticated, isLoading };
};
