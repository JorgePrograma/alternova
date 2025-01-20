import { View, Text, Image } from 'react-native';
import React, { memo } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Species } from '@/src/domain/entities/PokemonInfo';

interface EvolutionPokemonProps {
  evolutions: Species[];
  path: string;
}


const ArrowIcon = memo(() => (
  <MaterialIcons 
    name="arrow-forward" 
    size={24} 
    color="white" 
    style={{ marginHorizontal: 16 }}
  />
));

const PokemonCard = memo(({ pokemon, path }: { pokemon: Species, path: string }) => (
  <View className="items-center">
    <Image
      source={{ uri: path }}
      className="w-32 h-32"
      resizeMode="contain"
      accessibilityLabel={`Imagen de ${pokemon.name}`}
    />
    <Text className="text-white text-lg font-semibold capitalize mt-2">
      {pokemon.name}
    </Text>
  </View>
));

const EvolutionPokemon: React.FC<EvolutionPokemonProps> = ({ evolutions, path }) => {
  return (
    <View className="bg-black/20 rounded-3xl p-6">
      <View className="flex-row justify-around items-center">
        {evolutions.map((pokemon, index) => (
          <React.Fragment key={index}>
            <PokemonCard key={index} pokemon={pokemon} path={path} />
            {index < evolutions.length - 1 && <ArrowIcon />}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
};

export default memo(EvolutionPokemon);
