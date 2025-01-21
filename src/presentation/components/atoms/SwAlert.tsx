import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View, Animated } from "react-native";
import CustomButton from "./CustomButton";

interface SWAlertProps {
  isLoading: boolean;
  isSuccess: boolean | null;
  message: string;
  onClose: () => void;
  autoClose?: boolean;
  duration?: number;
}

const SWAlert: React.FC<SWAlertProps> = ({
  isLoading,
  isSuccess,
  message,
  onClose,
  autoClose = true,
  duration = 5000,
}) => {
  const [visible, setVisible] = useState(true);
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    if (autoClose && !isLoading && isSuccess !== null) {
      const timer = setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          setVisible(false);
          onClose();
        });
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isLoading, isSuccess, autoClose, onClose, duration, fadeAnim]);

  if (!visible) return null;

  return (
    <Animated.View 
      style={{ opacity: fadeAnim }}
      className="absolute inset-x-4 top-10 rounded-3xl shadow-lg bg-white p-6"
    >
      {isLoading ? (
        <ActivityIndicator size="large" color="#4B5563" />
      ) : (
        <>
          <Text
            className={`text-lg mb-5 text-center ${
              isSuccess ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </Text>
          <CustomButton 
            title="Ok" 
            onPress={onClose}
            className="bg-emerald-600 py-2 px-4 rounded-full w-12"
          />
        </>
      )}
    </Animated.View>
  );
};

export default React.memo(SWAlert);
