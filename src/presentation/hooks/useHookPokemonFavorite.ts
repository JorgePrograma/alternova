import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { PokemonFavorite } from '@/src/domain/entities/PokemonFavorite';
import { addFavorite, clearFavorites, loadFavorites, removeFavorite } from '../store/slices/pokemonFavoriteSlice';
import { PokemonFavoriteRepositoryImpl } from '@/src/infraestructure/repositories/pokemon/PokemonFavoriteRepositoryImpl';
import PokemonFavoriteDatasourceImpl from "@/src/infraestructure/datasources/pokemon/favorite/PokemonFavoriteDatasourceImpl";
import { CreateFavoriteUseCase } from '@/src/domain/usecases/pokemon/CreateFavoriteUseCase';
import { DeleteFavoriteUseCase } from '@/src/domain/usecases/pokemon/DeleteFavoriteUseCase';
import { GetFavoritesByIdUseCase } from '@/src/domain/usecases/pokemon/GetFavoritesByIdUserUseCase';
import { useCallback, useEffect, useState } from 'react';

const pokemonFavoriteDatasource = new PokemonFavoriteDatasourceImpl();
const pokemonFavoriteRepository = new PokemonFavoriteRepositoryImpl(pokemonFavoriteDatasource);

export const usePokemonFavorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.pokemonFavorite.favorites);
  const userId = useSelector((state: RootState) => state.auth.user?.id);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createFavoriteUseCase = new CreateFavoriteUseCase(pokemonFavoriteRepository);
  const deleteFavoriteUseCase = new DeleteFavoriteUseCase(pokemonFavoriteRepository);
  const getFavoritesByIdUseCase = new GetFavoritesByIdUseCase(pokemonFavoriteRepository);

  const addFavoritePokemon = useCallback(async (pokemon: PokemonFavorite) => {
    if (!userId) return false;
    
    const newPokemon = {
      id: pokemon.id,
      name: pokemon.name,
      url: pokemon.url,
      imageUrl: ''
    };

    // Actualizar el estado inmediatamente
    dispatch(addFavorite({ userId, pokemon: newPokemon }));

    try {
      // Ejecutar la operación en el backend
      const success = await createFavoriteUseCase.execute(pokemon);
      if (!success) {
        // Si falla, revertir el cambio en el estado
        dispatch(removeFavorite({ userId, pokemonId: pokemon.id }));
        setError('Failed to add favorite pokemon');
      }
      return success;
    } catch (error) {
      console.error('Error adding favorite pokemon:', error);
      dispatch(removeFavorite({ userId, pokemonId: pokemon.id }));
      setError('Error adding favorite pokemon');
      return false;
    }
  }, [userId, dispatch, createFavoriteUseCase]);

  const removeFavoritePokemon = useCallback(async (pokemonId: string) => {
    if (!userId) return false;
    
    // Actualizar el estado inmediatamente
    dispatch(removeFavorite({ userId, pokemonId }));

    try {
      // Ejecutar la operación en el backend
      const success = await deleteFavoriteUseCase.execute(pokemonId, userId);
      if (!success) {
        // Si falla, revertir el cambio en el estado
        const pokemonToRestore = favorites[userId]?.find(p => p.id === pokemonId);
        if (pokemonToRestore) {
          dispatch(addFavorite({ userId, pokemon: pokemonToRestore }));
        }
        setError('Failed to remove favorite pokemon');
      }
      return success;
    } catch (error) {
      console.error('Error removing favorite pokemon:', error);
      const pokemonToRestore = favorites[userId]?.find(p => p.id === pokemonId);
      if (pokemonToRestore) {
        dispatch(addFavorite({ userId, pokemon: pokemonToRestore }));
      }
      setError('Error removing favorite pokemon');
      return false;
    }
  }, [userId, dispatch, deleteFavoriteUseCase, favorites]);

  const getFavoritePokemons = useCallback(async () => {
    if (!userId) return [];
    
    setIsLoading(true);
    setError(null);

    try {
      const pokemons = await getFavoritesByIdUseCase.execute(userId);
      const list = pokemons.map((item) => ({
        id: item.id,
        name: item.name,
        url: item.url,
        imageUrl: ""
      }));
      dispatch(loadFavorites({ userId, pokemons: list }));
      return list;
    } catch (error) {
      console.error('Error fetching favorite pokemons:', error);
      setError('Error fetching favorite pokemons');
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [userId, dispatch, getFavoritesByIdUseCase]);

  const clearFavoritePokemons = useCallback(() => {
    if (!userId) return;
    dispatch(clearFavorites(userId));
  }, [userId, dispatch]);

  useEffect(() => {
    if (userId) {
      getFavoritePokemons();
    }
  }, [userId, getFavoritePokemons]);

  return {
    favorites: userId ? favorites[userId] || [] : [],
    isLoading,
    error,
    addFavoritePokemon,
    removeFavoritePokemon,
    getFavoritePokemons,
    clearFavoritePokemons
  };
};
