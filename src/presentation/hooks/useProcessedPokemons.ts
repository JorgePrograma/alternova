import { useMemo } from 'react';
import { PokemonResponse } from "@/src/domain/entities/PokemonResponse";
import { Pokemon } from '@/src/domain/entities/Pokemon';

export const useProcessedPokemons = (pokemons: PokemonResponse): Pokemon[] => {
  return useMemo(() =>
    pokemons.results.map((pokemon) => {
      const newId = pokemon.url.split("/").slice(-2)[0];
      console.log("useProcess"+newId)
      return {
        ...pokemon,
        id: newId,
        imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${newId}.png`,
      };
    }),
    [pokemons.results]
  );
};
