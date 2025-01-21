import { AuthRepository } from "@/src/domain/repositories/auth/AuthRepository";
import { LoginUseCase } from "@/src/domain/usecases/auth/LoginUseCase";
import { RegisterUseCase } from "@/src/domain/usecases/auth/RegisterUseCase";
import { AuthDatasource } from "@/src/infraestructure/datasources/auth/Authdatasource";
import { AuthDatasourceImpl } from "@/src/infraestructure/datasources/auth/AuthDatasourceImpl";
import { AuthRepositoryImpl } from "@/src/infraestructure/repositories/auth/AuthRepositoryImpl";
import React, { useState } from "react";
import { View } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomHeader from "../../components/molecules/CustomHeader";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

const AuthScreen: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  const authDatasource: AuthDatasource = new AuthDatasourceImpl();
  const authRepository: AuthRepository = new AuthRepositoryImpl(authDatasource);
  const loginUseCase = new LoginUseCase(authRepository);
  const registerUseCase = new RegisterUseCase(authRepository);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      className="bg-emerald-600"
    >
      <View className="mx-10">
        <CustomHeader />
      </View>
      <View className="p-10 flex-1 rounded-t-3xl mt-10 bg-slate-100">
        {isLogin ? (
          <LoginForm 
            loginUseCase={loginUseCase} 
            onRegisterClick={toggleForm} 
          />
        ) : (
          <RegisterForm registerUseCase={registerUseCase} onBackClick={toggleForm} />
        )}
      </View>
    </KeyboardAwareScrollView>
  );
};

export default AuthScreen;
