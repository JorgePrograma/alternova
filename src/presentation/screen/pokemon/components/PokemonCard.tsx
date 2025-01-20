import { generatePokemonImageUrl } from '@/src/core/utils';
import { usePokemonFavorite } from '@/src/presentation/hooks/usePokemonFavorite';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useCallback } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface PokemonCardProps {
  id: string;
  name: string;
  imageUrl: string;
  onPress?: () => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ 
  id, 
  name, 
  imageUrl, 
  onPress
}) => {
  const { isFavorite, toggleFavorite } = usePokemonFavorite();
  const handleFavoritePress = useCallback(() => {
    toggleFavorite({ id, name, imageUrl });
  }, [id, name, imageUrl, toggleFavorite]);

  return (
    <TouchableOpacity 
      onPress={onPress}
      activeOpacity={0.7}
      className="bg-white rounded-2xl p-4 shadow-md"
    >
      <View className="flex flex-row justify-between items-center mb-2">
        <Text className="text-sm font-medium text-gray-500">
          #{id}
        </Text>
        <TouchableOpacity 
          onPress={handleFavoritePress}
        >
          <MaterialIcons 
            name={isFavorite(id) ? "favorite" : "favorite-border"} 
            size={24} 
            color={isFavorite(id) ? "#059669" : "#059669"}
          />
        </TouchableOpacity>
      </View>
      <View className="w-full h-32 bg-gray-100 rounded-xl overflow-hidden">
        <Image
          source={{ uri: generatePokemonImageUrl(id) }}
          className="w-full h-full"
          resizeMode="contain"
        />
      </View>
      <Text className="text-center mt-2 text-base font-medium text-gray-800">
        {name}
      </Text>
    </TouchableOpacity>
  );
};

export default PokemonCard;
