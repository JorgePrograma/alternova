import React, { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import 'react-native-reanimated';

import { App } from '@/src/app';
import { useAuthCheck } from '@/src/presentation/hooks/useAuthCheck';
import AnimatedSplashScreen from '@/src/presentation/screen/splash/SplashScreen';

SplashScreen.preventAutoHideAsync();

const RootLayout: React.FC = () => {
  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const { isAuthenticated, isLoading } = useAuthCheck();

  useEffect(() => {
    if (fontsLoaded) {
      App.getInstance();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded || isLoading) {
    return null;
  }

  return (
    <AnimatedSplashScreen image={require('../assets/images/icon.ico')}>
      <ThemeProvider value={DefaultTheme}>
        <Stack>
          <Stack.Screen 
            name="index" 
            options={{headerShown: false}}
            redirect={isAuthenticated}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </AnimatedSplashScreen>
  );
};

export default RootLayout;
