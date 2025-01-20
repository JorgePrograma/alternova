import { Pokemon } from "@/src/domain/entities/Pokemon";
import React from "react";
import { View, Text, ScrollView } from "react-native";
import PokemonCard from "./PokemonCard";

interface FavoritePokemonListProps {
  pokemons: Pokemon[];
  onPokemonPress: (id: string, name: string) => void;
}

const FavoritePokemonList: React.FC<FavoritePokemonListProps> = ({ pokemons, onPokemonPress }) => {
  if (pokemons.length === 0) {
    return (
      <View className="h-40 justify-center items-center">
        <Text className="text-gray-500 text-lg">No hay favoritos</Text>
      </View>
    );
  }

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-2">
      {pokemons.map((pokemon) => (
        <View key={pokemon.id} className="w-40 mr-4">
          <PokemonCard
            id={pokemon.id}
            name={pokemon.name}
            imageUrl={pokemon.imageUrl}
            onPress={() => onPokemonPress(pokemon.id, pokemon.name)}
          />
        </View>
      ))}
    </ScrollView>
  );
};

export default React.memo(FavoritePokemonList);
