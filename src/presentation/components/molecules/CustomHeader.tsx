import React from "react";
import { Image, Text, View } from "react-native";

const CustomHeader = () => {
  const imagePath = require("../../../../assets/images/logo.png");

  return (
    <View className="mt-7">
      <Image source={imagePath} className="w-32 h-32" resizeMode="contain" />
      <Text className="text-white font-bold text-6xl">Hola !</Text>
      <Text className="text-white/65 text-2xl">Bienvenido a Alternova</Text>
    </View>
  );
};

export default CustomHeader;
