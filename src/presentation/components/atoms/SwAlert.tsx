// SWAlert.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';

interface SWAlertProps {
  isLoading: boolean;
  isSuccess: boolean | null;
  message: string;
  onClose: () => void;
  autoClose?: boolean;
}

const SWAlert: React.FC<SWAlertProps> = ({ isLoading, isSuccess, message, onClose, autoClose = true }) => {
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
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Text style={[styles.message, isSuccess ? styles.success : styles.error]}>
            {message}
          </Text>
          <TouchableOpacity onPress={onClose} style={styles.button}>
            <Text style={styles.buttonText}>Aceptar</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  message: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  success: {
    color: 'green',
  },
  error: {
    color: 'red',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default SWAlert;
