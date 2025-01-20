import { Pokemon } from '@/src/domain/entities/Pokemon';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface PokemonFavoriteState {
  favorites: { [userId: string]: Pokemon[] };
}

const initialState: PokemonFavoriteState = {
  favorites: {}
};

const pokemonFavoriteSlice = createSlice({
  name: 'pokemonFavorite',
  initialState,
  reducers: {
    addFavorite: (
      state,
      action: PayloadAction<{ userId: string; pokemon: Pokemon }>
    ) => {
      const { userId, pokemon } = action.payload;
      if (!state.favorites[userId]) {
        state.favorites[userId] = [];
      }
      // Evitar duplicados
      if (!state.favorites[userId].some(p => p.id === pokemon.id)) {
        state.favorites[userId].push(pokemon);
      }
    },

    removeFavorite: (
      state,
      action: PayloadAction<{ userId: string; pokemonId: string }>
    ) => {
      const { userId, pokemonId } = action.payload;
      if (state.favorites[userId]) {
        state.favorites[userId] = state.favorites[userId].filter(
          pokemon => pokemon.id !== pokemonId
        );
      }
    },

    loadFavorites: (
      state,
      action: PayloadAction<{ userId: string; pokemons: Pokemon[] }>
    ) => {
      const { userId, pokemons } = action.payload;
      state.favorites[userId] = pokemons;
    },

    clearFavorites: (
      state,
      action: PayloadAction<string>
    ) => {
      const userId = action.payload;
      state.favorites[userId] = [];
    }
  }
});

export const {
  addFavorite,
  removeFavorite,
  loadFavorites,
  clearFavorites
} = pokemonFavoriteSlice.actions;

export default pokemonFavoriteSlice.reducer;
