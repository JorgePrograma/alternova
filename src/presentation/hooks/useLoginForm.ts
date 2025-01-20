import { Validators } from "@/src/core/validation/Validators";
import { UserStorage } from '@/src/domain/entities/UserStorage';
import { LoginUseCase } from "@/src/domain/usecases/auth/LoginUseCase";
import { useAuthCheck } from "@/src/presentation/hooks/useAuthCheck";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/authSlice";

interface LoginFormData {
  email: string;
  password: string;
}

const useLoginForm = (
  loginUseCase: LoginUseCase, 
) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [alertMessage, setAlertMessage] = useState("");
  const { saveUser } = useAuthCheck();
  const dispatch = useDispatch();

  const handleInputChange = (field: keyof LoginFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogin = async (): Promise<void> => {
    const emailError = Validators.email(formData.email);
    const passwordError = Validators.password(formData.password);
  
    if (emailError || passwordError) {
      setIsSuccess(false);
      setAlertMessage("Por favor, corrija los errores en el formulario");
      return;
    }
  
    setIsLoading(true);
    try {
      const user = await loginUseCase.execute(
        formData.email,
        formData.password
      );
      if (!user) {
        setIsSuccess(false);
        setAlertMessage("Credenciales incorrectas.");
      } else {
        setIsSuccess(true);
        setAlertMessage(`Logueado exitosamente. Bienvenido, ${user.name}`);
        
        const userStorage: UserStorage = {
          user: user,
          token: ""
        };
        const result = await saveUser(userStorage);
        if(result){
          dispatch(login({ user, token: "" }));     
      }
      }
    } catch (error) {
      setIsSuccess(false);
      setAlertMessage("Ha ocurrido un error");
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
    handleLogin,
    handleCloseAlert,
  };
};

export default useLoginForm;
