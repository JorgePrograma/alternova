import React from 'react';
import { View } from 'react-native';
import LoginForm from './components/LoginForm';
import { AuthRepositoryImpl } from '@/src/infraestructure/repositories/auth/AuthRepositoryImpl';
import { LoginUseCase } from '@/src/domain/usecases/auth/LoginUseCase';
import { AuthDatasource } from '@/src/infraestructure/datasources/auth/Authdatasource';
import { AuthDatasourceImpl } from '@/src/infraestructure/datasources/auth/AuthDatasourceImpl';
import { AuthRepository } from '@/src/domain/repositories/auth/AuthRepository';

const LoginScreen: React.FC = () => {

  const authDatasource : AuthDatasource = new AuthDatasourceImpl()
  const authRepository: AuthRepository = new AuthRepositoryImpl(authDatasource);
  const loginUseCase = new LoginUseCase(authRepository);

  return (
    <View>
      <LoginForm loginUseCase={loginUseCase} />
    </View>
  );
};

export default LoginScreen;
