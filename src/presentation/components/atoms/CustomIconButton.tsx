import React from 'react';
import { TouchableOpacity, Text, View, TouchableOpacityProps } from 'react-native';

interface CustomIconButtonProps extends TouchableOpacityProps {
  icon?: React.ReactNode;
  label?: string;
  text?: string;
  onPress: () => void;
  disabled?: boolean;
  type?: 'primary' | 'secondary' | 'danger';
}

const CustomIconButton: React.FC<CustomIconButtonProps> = ({
  icon,
  label,
  text,
  onPress,
  disabled = false,
  type = 'primary',
  ...props
}) => {
  const getButtonStyles = () => {
    const baseStyles = "py-3 px-4 rounded-3xl items-center justify-center flex-row gap-2";
    
    const typeStyles = {
      primary: "bg-emerald-600",
      secondary: "bg-gray-200",
      danger: "bg-red-500"
    };

    const textStyles = {
      primary: "text-emerald-600",
      secondary: "text-black",
      danger: "text-white"
    };

    return {
      button: `${baseStyles} ${typeStyles[type]} ${disabled ? "opacity-50" : ""}`,
      text: `text-base font-bold capitalize ${textStyles[type]}`,
      label: `text-sm  ${textStyles[type]}`
    };
  };

  const styles = getButtonStyles();

  return (
    <View className="flex flex-row gap-2 items-center">
      {label && <Text className="text-gray-400">{label}</Text>}
      <TouchableOpacity
        className="flex flex-row gap-3"
        onPress={onPress}
        disabled={disabled}
        {...props}
      >
        {icon && icon}
        {text && <Text className={styles.text}>{text}</Text>}
      </TouchableOpacity>
    </View>
  );
};

export default CustomIconButton;
