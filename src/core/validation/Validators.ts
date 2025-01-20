export const Validators = {
    name: (name: string): string | null => {
      if (name.trim().length < 3) {
        return "El nombre debe tener al menos 3 caracteres";
      }
      return null;
    },
  
    email: (email: string): string | null => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return "Ingrese un email válido";
      }
      return null;
    },
  
    password: (password: string): string | null => {
      if (password.length < 6) {
        return "La contraseña debe tener al menos 6 caracteres";
      }
      return null;
    }
  };
  