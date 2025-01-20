import { View, Text } from 'react-native';
import React, { memo } from 'react';
import { MaterialIcons } from '@expo/vector-icons';

interface AboutPokemonProps {
  height: number;
  weight: number;
  abilities: Array<{
    ability: {
      name: string;
    };
  }>;
}

const StatItem = memo(({ iconName, value, label }: { iconName: string; value: string; label: string }) => (
  <View className="items-center">
    <MaterialIcons name={`${iconName}`} size={24} color="white" />
    <Text className="text-white text-lg mt-2">{value}</Text>
    <Text className="text-white/60">{label}</Text>
  </View>
));

const AbilityItem = memo(({ name }: { name: string }) => (
  <View className="bg-white/10 rounded-full px-6 py-2">
    <Text className="text-white text-base capitalize">
      {name.replace("-", " ")}
    </Text>
  </View>
));

const AboutPokemon: React.FC<AboutPokemonProps> = ({ height, weight, abilities }) => {
  return (
    <View className="space-y-6 flex gap-8">
      <View className="bg-white/10 rounded-2xl p-6">
        <View className="flex-row justify-around">
          <StatItem 
            iconName="straighten" 
            value={`${(height / 10).toFixed(1)}m`} 
            label="Height" 
          />
          <StatItem 
            iconName="fitness-center" 
            value={`${(weight / 10).toFixed(1)}kg`} 
            label="Weight" 
          />
        </View>
      </View>

      <View className="bg-white/10 rounded-2xl p-6">
        <Text className="text-white text-xl font-bold mb-4">Abilities</Text>
        <View className="flex-row flex-wrap gap-3">
          {abilities?.map((ability) => (
            <AbilityItem 
              key={ability.ability.name} 
              name={ability.ability.name} 
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export default memo(AboutPokemon);
