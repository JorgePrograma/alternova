import { PokemonResponse } from "@/src/domain/entities/PokemonResponse";
import CustomLoadingFooter from "@/src/presentation/components/atoms/CustomLoadingFooter";
import React, { useCallback, useMemo } from "react";
import { FlatList, View } from "react-native";
import EmptyListComponent from "./EmptyListComponent";
import CardPokemon from "./PokemonCard";
import { extractPokemonId, generatePokemonImageUrl } from "@/src/core/utils";

interface Pokemon {
  id: string;
  name: string;
  url: string;
  imageUrl: string;
}

interface PokemonListProps {
  pokemons: PokemonResponse;
  isLoading: boolean;
  isLoadingMore: boolean;
  isRefreshing: boolean;
  onLoadMore: () => void;
  onRefresh: () => void;
  onPokemonPress: (id: string, name: string) => void;
}

const PokemonList: React.FC<PokemonListProps> = ({
  pokemons,
  isLoading,
  isLoadingMore,
  isRefreshing,
  onLoadMore,
  onRefresh,
  onPokemonPress,
}) => {
  const processedPokemons = useMemo(
    () =>
      pokemons.results.map((pokemon) => {
        const newId = extractPokemonId(pokemon.url);
        return {
          ...pokemon,
          id: newId,
          imageUrl: generatePokemonImageUrl(newId),
        };
      }),
    [pokemons.results]
  );

  const renderPokemonCard = useCallback(
    ({ item }: { item: Pokemon }) => (
      <View className="flex-1 m-2">
        <CardPokemon
          id={item.id}
          imageUrl={item.imageUrl}
          name={item.name}
          onPress={() => onPokemonPress(item.id, item.name)}
        />
      </View>
    ),
    [onPokemonPress]
  );

  const handleLoadMore = () => {
    if (!isLoadingMore) {
      onLoadMore();
    }
  };

  return (
    <FlatList
      data={processedPokemons}
      renderItem={renderPokemonCard}
      keyExtractor={useCallback((item: Pokemon) => item.id, [])}
      numColumns={2}
      contentContainerStyle={{ padding: 8 }}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={isLoadingMore ? CustomLoadingFooter : null}
      ListEmptyComponent={!isLoading ? EmptyListComponent : null}
      refreshing={isRefreshing}
      onRefresh={onRefresh}
    />
  );
};

export default React.memo(PokemonList);
