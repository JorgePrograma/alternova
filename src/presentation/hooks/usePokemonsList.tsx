import { useState, useCallback, useEffect } from "react";
import { PokemonResponse } from "@/src/domain/entities/PokemonResponse";
import { GetAllPokemonsUseCase } from "@/src/domain/usecases/pokemon/GetAllPokemonsUseCase";
import { PokemonRepositoryImpl } from "@/src/infraestructure/repositories/pokemon/PokemonRepositoryImpl";
import { PokemonDatasourceImpl } from "@/src/infraestructure/datasources/pokemon/PokemonDatasourceImpl";
import { sortElements } from "@/src/core/utils";

const ITEMS_PER_PAGE = 20;

const pokemonDatasource = new PokemonDatasourceImpl();
const pokemonRepository = new PokemonRepositoryImpl(pokemonDatasource);
const getAllPokemonUseCase = new GetAllPokemonsUseCase(pokemonRepository);

export const usePokemonList = () => {
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

      setPokemons((prevState) => {
        const newResults = refresh 
          ? pokemonList.results 
          : [...prevState.results, ...pokemonList.results];
        
        const sortedResults = sortElements(newResults, 'name');
      
        return {
          ...pokemonList,
          results: sortedResults,
        };
      });
      
      setOffset(currentOffset + ITEMS_PER_PAGE);
    } catch (error) {
      console.error("Error loading pokemons:", error);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
      setIsRefreshing(false);
    }
  }, [isLoading, isLoadingMore, offset]);

  

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

  useEffect(() => {
    loadPokemons(true);
  }, []);

  return {
    pokemons,
    isLoading,
    isLoadingMore,
    isRefreshing,
    handleLoadMore,
    handleRefresh,
  };
};
