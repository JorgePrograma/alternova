import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

interface CustomInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: 'default' | 'number-pad' | 'email-address' | 'phone-pad';
  validator?: (text: string) => string | null;
  icon?: React.ReactNode; // Nuevo prop para el icono
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  validator,
  icon
}) => {
  const [error, setError] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleChangeText = (text: string) => {
    onChangeText(text);
    if (validator) {
      const validationError = validator(text);
      setError(validationError);
    }
  };

  return (
    <View className="w-full">
      <Text className="text-base font-medium text-neutral-600 mb-2">{label}</Text>
      <View className="relative  flex flex-row gap-5">
        {icon && (
          <View className="absolute left-4 top-0 bottom-0 justify-center z-10">
            {icon}
          </View>
        )}
        <TextInput
          className={`w-full px-4 py-3 bg-white rounded-3xl border ${
            error ? 'border-red-500' : isFocused ? 'border-blue-500' : 'border-gray-300'
          } ${icon ? 'pl-12' : 'pl-4'}`}
          value={value}
          onChangeText={handleChangeText}
          placeholder={placeholder}
          keyboardType={keyboardType}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholderTextColor="#9CA3AF"
        />
      </View>
      {error && (
        <Text className="text-red-500 text-sm mt-1">{error}</Text>
      )}
    </View>
  );
};

export default CustomInput;
