import { PokemonFavorite } from "../../entities/PokemonFavorite";

export interface PokemonFavoriteRepository {
  getPokemonsUserId(userId:string): Promise<PokemonFavorite[]>;
  addPokemon(pokemon:PokemonFavorite): Promise<boolean>;
  deletePokemonFavorite(id: string, userId:string): Promise<boolean>;
}
