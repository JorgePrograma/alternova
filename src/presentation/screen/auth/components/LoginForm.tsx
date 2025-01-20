import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";

import { Validators } from "@/src/core/validation/Validators";
import { LoginUseCase } from "@/src/domain/usecases/auth/LoginUseCase";
import CustomButton from "@/src/presentation/components/atoms/CustomButton";
import CustomIconButton from "@/src/presentation/components/atoms/CustomIconButton";
import CustomInput from "@/src/presentation/components/atoms/CustomInput";
import CustomLabelTitle from "@/src/presentation/components/atoms/CustomLabelTitle";
import SWAlert from "@/src/presentation/components/atoms/SwAlert";
import useLoginForm from "@/src/presentation/hooks/useLoginForm";


interface LoginFormProps {
  loginUseCase: LoginUseCase;
  onRegisterClick: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  loginUseCase,
  onRegisterClick,
}) => {
  const {
    formData,
    isLoading,
    isSuccess,
    alertMessage,
    handleInputChange,
    handleLogin,
    handleCloseAlert,
  } = useLoginForm(loginUseCase);

  return (
    <View className="flex flex-col gap-20">
      <View className="flex gap-5">
        <CustomLabelTitle title="Login" />

        <CustomInput
          label="Email"
          value={formData.email}
          onChangeText={(text: string) => handleInputChange("email", text)}
          placeholder="Ingrese su email"
          keyboardType="email-address"
          validator={Validators.email}
          icon={<MaterialIcons name="email" size={24} color="#9CA3AF" />}
        />

        <CustomInput
          label="Contraseña"
          value={formData.password}
          onChangeText={(text: string) => handleInputChange("password", text)}
          placeholder="Ingrese su contraseña"
          validator={Validators.password}
          icon={<MaterialIcons name="lock" size={24} color="#9CA3AF" />}
        />
      </View>
      <View className="flex gap-7">
        <CustomButton title="Iniciar Sesión" onPress={handleLogin} />
        <View className="flex items-end">
          <CustomIconButton
            text="Aqui"
            label="No tienes cuenta registrate"
            onPress={onRegisterClick}
            type="primary"
          />
        </View>
      </View>

      {(isLoading || isSuccess !== null) && (
        <SWAlert
          isLoading={isLoading}
          isSuccess={isSuccess}
          message={alertMessage}
          onClose={handleCloseAlert}
        />
      )}
    </View>
  );
};

export default LoginForm;
