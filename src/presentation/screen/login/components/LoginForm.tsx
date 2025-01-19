import React, { useState } from "react";
import { Button, TextInput, View, StyleSheet } from "react-native";
import SWAlert from "@/src/presentation/components/atoms/SwAlert";
import { User } from "@/src/domain/entities/User";
import { LoginUseCase } from "@/src/domain/usecases/auth/LoginUseCase";

interface LoginFormProps {
  loginUseCase: LoginUseCase;
}

interface LoginFormData {
  email: string;
  password: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ loginUseCase }) => {
  const [formDataState, setFormDataState] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [alertMessage, setAlertMessage] = useState("");

  const handleLogin = async (): Promise<void> => {
    if (formDataState.email.trim() === "" || formDataState.password.trim() === "") {
      setIsSuccess(false);
      setAlertMessage("Los campos son requeridos");
      return;
    }

    setIsLoading(true);
    try {
      const user = await loginUseCase.execute(formDataState.email, formDataState.password);
      setIsSuccess(true);
      setAlertMessage(`Logueado exitosamente. Bienvenido, ${user?.name}`);
    } catch (error) {
      setIsSuccess(false);
      setAlertMessage(`Ha ocurrido un error`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseAlert = () => {
    setIsSuccess(null);
    setAlertMessage("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={formDataState.email}
        onChangeText={(text:string) => setFormDataState({...formDataState, email:text})}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={formDataState.password}
        onChangeText={(text:string) => setFormDataState({...formDataState, password:text})}
        secureTextEntry
        autoCapitalize="none"
      />

      <Button 
        title="Aceptar"
        onPress={handleLogin}
      />
      
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

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default LoginForm;
