import { PokemonFavorite } from '@/src/domain/entities/PokemonFavorite';
import { CreateFavoriteUseCase } from '@/src/domain/usecases/pokemon/CreateFavoriteUseCase';
import { DeleteFavoriteUseCase } from '@/src/domain/usecases/pokemon/DeleteFavoriteUseCase';
import { GetFavoritesByIdUseCase } from '@/src/domain/usecases/pokemon/GetFavoritesByIdUserUseCase';
import PokemonFavoriteDatasourceImpl from "@/src/infraestructure/datasources/pokemon/favorite/PokemonFavoriteDatasourceImpl";
import { PokemonFavoriteRepositoryImpl } from '@/src/infraestructure/repositories/pokemon/PokemonFavoriteRepositoryImpl';
import { useCallback, useMemo } from 'react';
import { createSelector } from 'reselect';
import { addFavorite, clearFavorites, loadFavorites, removeFavorite } from '../store/slices/pokemonFavoriteSlice';
import { RootState } from '../store/state/rootReducer';
import { useAppDispatch, useAppSelector } from './store/useAppDispatch';

// Inicialización de Firestore y repositorios
const pokemonFavoriteDatasource = new PokemonFavoriteDatasourceImpl();
const pokemonFavoriteRepository = new PokemonFavoriteRepositoryImpl(pokemonFavoriteDatasource);

export const usePokemonFavorite = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state: RootState) => state.auth.user?.id || '');
  const favorites = useAppSelector((state: RootState) => state.pokemonFavorite.favorites[userId] || []);

  // Inicialización de casos de uso
  const createFavoriteUseCase = new CreateFavoriteUseCase(pokemonFavoriteRepository);
  const deleteFavoriteUseCase = new DeleteFavoriteUseCase(pokemonFavoriteRepository);
  const getFavoritesByIdUseCase = new GetFavoritesByIdUseCase(pokemonFavoriteRepository);

  // Verifica si un Pokémon es favorito
  const isFavorite = (pokemonId: string) => favorites.some(pokemon => pokemon.id === pokemonId);

  // Alterna el estado de favorito de un Pokémon
  const toggleFavorite = async (pokemon: { id: string; name: string; imageUrl: string }) => {
    if (isFavorite(pokemon.id)) {
      const success = await deleteFavoriteUseCase.execute(pokemon.id, userId);
      if (success) {
        dispatch(removeFavorite({ userId, pokemonId: pokemon.id }));
      }
    } else {
      const newPokemon: PokemonFavorite = {
        id: pokemon.id,
        name: pokemon.name,
        url: pokemon.imageUrl,
        userId: userId
      };
      const success = await createFavoriteUseCase.execute(newPokemon);
      if (success) {
        dispatch(addFavorite({  userId:userId, pokemon:pokemon }));
      }
    }
  };

  // Carga los favoritos del usuario
  const loadUserFavorites = async () => {
    try {
      const pokemons = await getFavoritesByIdUseCase.execute(userId);
      if (pokemons.length > 0) {
        const newPokemons = pokemons.map((pokemon) => ({
          id: pokemon.id,
          name: pokemon.name,
          url: pokemon.url,
          userId: userId
        }));
        dispatch(loadFavorites({ userId, pokemons: newPokemons }));
      }
    } catch (error) {
      console.error("Error al cargar los favoritos del usuario:", error);
    }
  };

  // Limpia los favoritos del usuario
  const clearUserFavorites = () => {
    dispatch(clearFavorites(userId));
  };

  return { isFavorite, toggleFavorite, userId, favorites, loadUserFavorites, clearUserFavorites };
};
