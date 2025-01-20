import { PokemonFavorite } from '@/src/domain/entities/PokemonFavorite';
import { PokemonFavoriteRepository } from '@/src/domain/repositories/pokemon/PokemonFavoriteRepository';
import { PokemonFavoriteDatasource } from '../../datasources/pokemon/favorite/PokemonFavoriteDatasource';
import { PokemonFavoriteMapper } from '../../mappers/PokemonFavoriteMapper';

export class PokemonFavoriteRepositoryImpl implements PokemonFavoriteRepository {
  constructor(private datasource: PokemonFavoriteDatasource) {}
  
  async getPokemonsUserId(userId:string): Promise<PokemonFavorite[]> {
    const result = await this.datasource.getPokemonsUserId(userId)
    return result.map(item => PokemonFavoriteMapper.toDomain(item) )
  }
  
  async addPokemon(pokemon: PokemonFavorite): Promise<boolean> {
    const model = PokemonFavoriteMapper.toModel(pokemon)
    const result = await this.datasource.addPokemon(model)
    return result
  }
  
  async deletePokemonFavorite(id: string, userId:string): Promise<boolean> {
    const result = await this.datasource.deletePokemonFavorite(id, userId)
    return result
  }

  
}
