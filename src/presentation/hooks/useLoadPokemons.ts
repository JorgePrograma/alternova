import { useState, useCallback } from 'react';
import { PokemonResponse } from "@/src/domain/entities/PokemonResponse";
import { GetAllPokemonsUseCase } from "@/src/domain/usecases/pokemon/GetAllPokemonsUseCase";

export const useLoadPokemons = (getAllPokemonUseCase: GetAllPokemonsUseCase, itemsPerPage: number) => {
  const [pokemons, setPokemons] = useState<PokemonResponse>({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadPokemons = useCallback(async (refresh: boolean = false) => {
    if (isLoading || isLoadingMore) return;

    try {
      const currentOffset = refresh ? 0 : offset;

      if (refresh) {
        setIsLoading(true);
      } else {
        setIsLoadingMore(true);
      }

      const pokemonList = await getAllPokemonUseCase.execute(currentOffset.toString());

      setPokemons((prevState) => ({
        ...pokemonList,
        results: refresh ? pokemonList.results : [...prevState.results, ...pokemonList.results],
      }));

      setOffset(currentOffset + itemsPerPage);
    } catch (error) {
      console.error("Error loading pokemons:", error);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
      setIsRefreshing(false);
    }
  }, [isLoading, isLoadingMore, offset, itemsPerPage, getAllPokemonUseCase]);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    setOffset(0);
    loadPokemons(true);
  }, [loadPokemons]);

  const handleLoadMore = useCallback(() => {
    if (pokemons.next && !isLoadingMore) {
      loadPokemons();
    }
  }, [pokemons.next, isLoadingMore, loadPokemons]);

  return {
    pokemons,
    isLoading,
    isLoadingMore,
    isRefreshing,
    loadPokemons,
    handleRefresh,
    handleLoadMore,
  };
};
