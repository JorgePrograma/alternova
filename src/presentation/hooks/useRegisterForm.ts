import { Validators } from "@/src/core/validation/Validators";
import { UserStorage } from '@/src/domain/entities/UserStorage';
import { RegisterUseCase } from "@/src/domain/usecases/auth/RegisterUseCase";
import { useAuthCheck } from "@/src/presentation/hooks/useAuthCheck";
import { Router } from "expo-router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/authSlice";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

const useRegisterForm = (
  registerUseCase: RegisterUseCase,
  router: Router
) => {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [alertMessage, setAlertMessage] = useState("");
  const { saveUser } = useAuthCheck();
  const dispatch = useDispatch();

  const handleInputChange = (field: keyof RegisterFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleRegister = async (): Promise<void> => {
    const nameError = Validators.name(formData.name);
    const emailError = Validators.email(formData.email);
    const passwordError = Validators.password(formData.password);
  
    if (nameError || emailError || passwordError) {
      setIsSuccess(false);
      setAlertMessage("Por favor, corrija los errores en el formulario");
      return;
    }
  
    setIsLoading(true);
    try {
      const user = await registerUseCase.execute(
        formData.name,
        formData.email,
        formData.password
      );
      if (user) {
        setIsSuccess(true);
        setAlertMessage("Registro exitoso. Iniciando sesión...");
        
        const userStorage: UserStorage = {
          user: user,
          token: ""
        };
        const result = await saveUser(userStorage);
        if(result){
          dispatch(login({ user:user, token: "" }));
        }
      } else {
        setIsSuccess(false);
        setAlertMessage("Lo sentimos, no se pudo registrar");
      }
    } catch (error) {
      setIsSuccess(false);
      setAlertMessage(`Ha ocurrido un error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseAlert = () => {
    setIsSuccess(null);
    setAlertMessage("");
  };

  return {
    formData,
    isLoading,
    isSuccess,
    alertMessage,
    handleInputChange,
    handleRegister,
    handleCloseAlert,
  };
};

export default useRegisterForm;
