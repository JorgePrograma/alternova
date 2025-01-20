import React from 'react';
import { View, Text } from 'react-native';

const EmptyListComponent: React.FC = () => (
  <View className="flex-1 justify-center items-center py-20">
    <Text className="text-gray-500 text-lg">No se encontraron Pokémon</Text>
  </View>
);

export default React.memo(EmptyListComponent);
