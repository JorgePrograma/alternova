import React from "react";
import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { RegisterUseCase } from "@/src/domain/usecases/auth/RegisterUseCase";
import { Validators } from "@/src/core/validation/Validators";
import CustomButton from "@/src/presentation/components/atoms/CustomButton";
import CustomIconButton from "@/src/presentation/components/atoms/CustomIconButton";
import CustomInput from "@/src/presentation/components/atoms/CustomInput";
import CustomLabelTitle from "@/src/presentation/components/atoms/CustomLabelTitle";
import SWAlert from "@/src/presentation/components/atoms/SwAlert";
import useRegisterForm from "@/src/presentation/hooks/useRegisterForm";

interface RegisterFormProps {
  registerUseCase: RegisterUseCase;
  onBackClick: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ registerUseCase, onBackClick }) => {
  const router = useRouter();
  const {
    formData,
    isLoading,
    isSuccess,
    alertMessage,
    handleInputChange,
    handleRegister,
    handleCloseAlert,
  } = useRegisterForm(registerUseCase, router);

  return (
    <View className="flex flex-col gap-20">
      <View className="flex gap-5 items-start">
        <CustomIconButton
          text="regresar"
          icon={<MaterialIcons name="arrow-back" size={24} color="#059669" />}
          onPress={onBackClick}
          type="primary"
        />
        <CustomLabelTitle title="Registrarse" />
        <CustomInput
          label="Nombre"
          value={formData.name}
          onChangeText={(text: string) => handleInputChange("name", text)}
          placeholder="Ingrese su nombre"
          validator={Validators.name}
          icon={<MaterialIcons name="person" size={24} color="#9CA3AF" />}
        />
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

      <CustomButton title="Registrarse" onPress={handleRegister} />

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

export default RegisterForm;
