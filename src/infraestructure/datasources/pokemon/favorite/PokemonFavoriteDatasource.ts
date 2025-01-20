import { PokemonFavorite } from "@/src/domain/entities/PokemonFavorite";
import { PokemonFavoriteModel } from "@/src/infraestructure/models/PokemonFavoriteModel";

export interface PokemonFavoriteDatasource {
  getPokemonsUserId(userId:string): Promise<PokemonFavoriteModel[]>;
  addPokemon(pokemon: PokemonFavorite): Promise<boolean>;
  deletePokemonFavorite(id: string, userId:string): Promise<boolean>;
}
