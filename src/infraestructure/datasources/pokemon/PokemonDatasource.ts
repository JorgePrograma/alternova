import { PokemonResponseModel } from "../../models/PokemonResponseModel";
import { PokemonInfoModel } from './../../models/PokemonInfoModel';

export interface PokemonDatasource {
  getPokemonAll(offset: string): Promise<PokemonResponseModel>;
  getPokemon(id: number): Promise<PokemonInfoModel>;
  getPokemonFavorite(userId: string): Promise<PokemonInfoModel[]>;
}
