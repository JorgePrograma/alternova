import { PokemonInfo } from "../../entities/PokemonInfo";
import { PokemonResponse } from "../../entities/PokemonResponse";

export interface PokemonRepository {
  getPokemonAll(offset: string): Promise<PokemonResponse>;
  getPokemon(id: number): Promise<PokemonInfo>;
  getPokemonFavorite(userId: string): Promise<PokemonInfo[]>;
}
