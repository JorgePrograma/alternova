import { useMemo } from "react";
import { usePokemonFavorite } from "@/src/presentation/hooks/usePokemonFavorite";
import { Pokemon } from "@/src/domain/entities/Pokemon";

export const usePokemonFavorites = () => {
  const { isFavorite } = usePokemonFavorite();

  const favorites = useMemo(() => {
    return Object.values(isFavorite).filter(Boolean) as Pokemon[];
  }, [isFavorite]);

  return { favorites };
};
