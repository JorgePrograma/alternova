import Constants from 'expo-constants';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

interface AnimatedSplashScreenProps {
  children: React.ReactNode;
  image: any; // Tipo 'any' para la imagen, puedes usar un tipo más específico si lo prefieres
}

const AnimatedSplashScreen: React.FC<AnimatedSplashScreenProps> = ({ children, image }) => {
  const animation = React.useMemo(() => new Animated.Value(1), []);
  const [isAppReady, setIsAppReady] = React.useState<boolean>(false);
  const [isSplashAnimationComplete, setAnimationComplete] = React.useState<boolean>(false);

  useEffect(() => {
    if (isAppReady) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => setAnimationComplete(true));
    }
  }, [isAppReady]);

  const onImageLoaded = React.useMemo(
    () => async (): Promise<void> => {
      try {
        await SplashScreen.hideAsync();
        // You can add any additional async operations here
        await Promise.all([]);
      } catch (e) {
        // handle errors
      } finally {
        setIsAppReady(true);
      }
    },
    []
  );

  return (
    <View style={{ flex: 1 }}>
      {isAppReady && children}
      {!isSplashAnimationComplete && (
        <Animated.View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: Constants.manifest?.splash?.backgroundColor || '#FFFFFF',
              opacity: animation,
            },
          ]}
        >
          <Animated.Image
            style={{
              width: '100%',
              height: '100%',
              resizeMode: Constants.manifest?.splash?.resizeMode || 'contain',
              transform: [
                {
                  scale: animation,
                },
              ],
            }}
            source={image}
            onLoadEnd={onImageLoaded}
            fadeDuration={0}
          />
        </Animated.View>
      )}
    </View>
  );
};

export default AnimatedSplashScreen;
