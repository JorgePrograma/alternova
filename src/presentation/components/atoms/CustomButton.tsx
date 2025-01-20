import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';

interface CustomButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  type?: 'primary' | 'secondary' | 'danger';
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  disabled = false,
  type = 'primary',
  ...props
}) => {
  const getButtonStyles = () => {
    const baseStyles = "py-3 px-4 rounded-lg items-center justify-center";
    
    const typeStyles = {
      primary: "bg-emerald-600",
      secondary: "bg-gray-200",
      danger: "bg-red-500"
    };

    const textStyles = {
      primary: "text-white",
      secondary: "text-black",
      danger: "text-white"
    };

    return {
      button: `rounded-3xl ${baseStyles} ${typeStyles[type]} ${disabled ? "opacity-50" : ""}`,
      text: `text-base font-bold ${textStyles[type]}`
    };
  };

  const styles = getButtonStyles();

  return (
    <TouchableOpacity
      className={styles.button}
      onPress={onPress}
      disabled={disabled}
      {...props}
    >
      <Text className={styles.text}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
