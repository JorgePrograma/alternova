import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import CustomButton from "./CustomButton";

interface SWAlertProps {
  isLoading: boolean;
  isSuccess: boolean | null;
  message: string;
  onClose: () => void;
  autoClose?: boolean;
}

const SWAlert: React.FC<SWAlertProps> = ({
  isLoading,
  isSuccess,
  message,
  onClose,
  autoClose = true,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (autoClose && !isLoading && isSuccess !== null) {
      const timer = setTimeout(() => {
        setVisible(false);
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isLoading, isSuccess, autoClose, onClose]);

  if (!visible) return null;

  return (
    <View className="absolute rounded-3xl shadow-slate-400 inset-0 justify-center items-center bg-white">
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Text
            className={`text-lg mb-5 text-center w-72 ${
              isSuccess ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </Text>
          <CustomButton title="Ok" onPress={onClose} />
        </>
      )}
    </View>
  );
};

export default SWAlert;
