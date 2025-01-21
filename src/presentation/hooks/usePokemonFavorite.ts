import React, { useMemo, useCallback } from 'react';
import { createSelector } from 'reselect';
import { PokemonFavorite } from '@/src/domain/entities/PokemonFavorite';
import { CreateFavoriteUseCase } from '@/src/domain/usecases/pokemon/CreateFavoriteUseCase';
import { DeleteFavoriteUseCase } from '@/src/domain/usecases/pokemon/DeleteFavoriteUseCase';
import { GetFavoritesByIdUseCase } from '@/src/domain/usecases/pokemon/GetFavoritesByIdUserUseCase';
import PokemonFavoriteDatasourceImpl from "@/src/infraestructure/datasources/pokemon/favorite/PokemonFavoriteDatasourceImpl";
import { PokemonFavoriteRepositoryImpl } from '@/src/infraestructure/repositories/pokemon/PokemonFavoriteRepositoryImpl';
import { addFavorite, clearFavorites, loadFavorites, removeFavorite } from '../store/slices/pokemonFavoriteSlice';
import { RootState } from '../store/state/rootReducer';
import { useAppDispatch, useAppSelector } from './store/useAppDispatch';

const pokemonFavoriteDatasource = new PokemonFavoriteDatasourceImpl();
const pokemonFavoriteRepository = new PokemonFavoriteRepositoryImpl(pokemonFavoriteDatasource);

const selectUserId = (state: RootState) => state.auth.user?.id || '';
const selectFavorites = (state: RootState) => state.pokemonFavorite.favorites;

const selectUserFavorites = createSelector(
  [selectUserId, selectFavorites],
  (userId, favorites) => favorites[userId] || []
);

export const usePokemonFavorite = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectUserId);
  const favorites = useAppSelector(selectUserFavorites);

  const createFavoriteUseCase = useMemo(() => new CreateFavoriteUseCase(pokemonFavoriteRepository), []);
  const deleteFavoriteUseCase = useMemo(() => new DeleteFavoriteUseCase(pokemonFavoriteRepository), []);
  const getFavoritesByIdUseCase = useMemo(() => new GetFavoritesByIdUseCase(pokemonFavoriteRepository), []);

  const isFavorite = useCallback((pokemonId: string) => 
    favorites.some(pokemon => pokemon.id === pokemonId), [favorites]);

  const toggleFavorite = useCallback(async (pokemon: { id: string; name: string; imageUrl: string }) => {
    if (isFavorite(pokemon.id)) {
      // Primero, actualiza el estado local
      dispatch(removeFavorite({ userId, pokemonId: pokemon.id }));
      // Luego, ejecuta el caso de uso
      try {
        await deleteFavoriteUseCase.execute(pokemon.id, userId);
      } catch (error) {
        console.error("Error al eliminar favorito:", error);
        // Si falla, revertimos el cambio local
        dispatch(addFavorite({ userId, pokemon }));
      }
    } else {
      const newPokemon: PokemonFavorite = {
        id: pokemon.id,
        name: pokemon.name,
        url: pokemon.imageUrl,
        userId: userId
      };
      // Primero, actualiza el estado local
      dispatch(addFavorite({ userId, pokemon: newPokemon }));
      // Luego, ejecuta el caso de uso
      try {
        await createFavoriteUseCase.execute(newPokemon);
      } catch (error) {
        console.error("Error al agregar favorito:", error);
        // Si falla, revertimos el cambio local
        dispatch(removeFavorite({ userId, pokemonId: pokemon.id }));
      }
    }
  }, [userId, isFavorite, createFavoriteUseCase, deleteFavoriteUseCase, dispatch]);

  const loadUserFavorites = useCallback(async () => {
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
  }, [userId, getFavoritesByIdUseCase, dispatch]);

  const clearUserFavorites = useCallback(() => {
    dispatch(clearFavorites(userId));
  }, [userId, dispatch]);

  return { isFavorite, toggleFavorite, userId, favorites, loadUserFavorites, clearUserFavorites };
};
