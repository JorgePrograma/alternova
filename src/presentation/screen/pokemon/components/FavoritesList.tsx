import { Pokemon } from "@/src/domain/entities/Pokemon";
import React, { useCallback, useMemo } from "react";
import { FlatList, View, ListRenderItem } from "react-native";
import EmptyListComponent from "./EmptyListComponent";
import PokemonCard from "./PokemonCard";

interface FavoritesListProps {
  pokemons: Pokemon[];
  onPokemonPress: (id: string, name: string) => void;
}

const FavoritesList: React.FC<FavoritesListProps> = ({ pokemons, onPokemonPress }) => {
  
  const renderFavoriteCard: ListRenderItem<Pokemon> = useCallback(
    ({ item }) => (
      <View className="w-40 mr-4">
        <PokemonCard
          id={item.imageUrl}
          name={item.imageUrl}
          imageUrl={item.imageUrl}
          onPress={() => onPokemonPress(item.id, item.name)}
        />
      </View>
    ),
    [onPokemonPress]
  );

  const keyExtractor = useCallback((item: Pokemon) => item.id, []);

  const memoizedPokemons = useMemo(() => pokemons, [pokemons]);

  if (pokemons.length === 0) {
    return <EmptyListComponent />;
  }

  return (
    <FlatList<Pokemon>
      data={memoizedPokemons}
      renderItem={renderFavoriteCard}
      keyExtractor={keyExtractor}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 8 }}
    />
  );
};

export default React.memo(FavoritesList);
