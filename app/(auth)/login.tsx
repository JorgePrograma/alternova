// app/(auth)/login.tsx
import AuthScreen from '@/src/presentation/screen/auth/AuthScreen';
import { View } from 'react-native';

export default function Login() {
  return (
    <View className="flex-1">
      <AuthScreen />
    </View>
  );
}
