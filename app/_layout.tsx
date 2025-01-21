import React, { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import "react-native-reanimated";
import "../global.css";

import { App } from "@/src/app";
import { useAuthCheck } from "@/src/presentation/hooks/useAuthCheck";
import AnimatedSplashScreen from "@/src/presentation/screen/splash/SplashScreen";
import { Provider } from "react-redux";
import store from "@/src/presentation/store/store";
import { usePokemonFavorite } from "@/src/presentation/hooks/usePokemonFavorite";

SplashScreen.preventAutoHideAsync();

const InnerLayout: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuthCheck();
  const { loadUserFavorites } = usePokemonFavorite();

  useEffect(() => {
    if (isAuthenticated) {
      loadUserFavorites();
    }
  }, [isAuthenticated, loadUserFavorites]);

  if (isLoading) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" redirect={isAuthenticated} />
      <Stack.Screen name="(app)" redirect={!isAuthenticated} />
    </Stack>
  );
};

const RootLayout: React.FC = () => {
  const [fontsLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const [appInitialized, setAppInitialized] = useState(false);

  useEffect(() => {
    async function initializeApp() {
      if (fontsLoaded) {
        const app = App.getInstance();
        await app.initialize();
        setAppInitialized(true);
      }
    }
    initializeApp();
  }, [fontsLoaded]);

  if (!fontsLoaded || !appInitialized) {
    return null;
  }

  return (
    <AnimatedSplashScreen image={require("../assets/images/logo.png")}>
      <Provider store={store}>
        <ThemeProvider value={DefaultTheme}>
          <InnerLayout />
          <StatusBar style="auto" />
        </ThemeProvider>
      </Provider>
    </AnimatedSplashScreen>
  );
};

export default RootLayout;
