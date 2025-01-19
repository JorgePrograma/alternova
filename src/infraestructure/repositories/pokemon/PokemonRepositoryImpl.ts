import { PokemonInfo } from '@/src/domain/entities/PokemonInfo';
import { PokemonResponse } from '@/src/domain/entities/PokemonResponse';
import { PokemonRepository } from '@/src/domain/repositories/pokemon/PokemonRepository';
import { PokemonDatasource } from '../../datasources/pokemon/PokemonDatasource';
import { PokemonInfoMapper } from '../../mappers/PokemonInfoMapper';
import { PokemonResponseMapper } from '../../mappers/PokemonResponseMapper';

export class PokemonRepositoryImpl implements PokemonRepository {
  constructor(private datasource: PokemonDatasource) {}
  
  async getPokemonAll(offset: string): Promise<PokemonResponse> {
    const result = await this.datasource.getPokemonAll(offset);
    return PokemonResponseMapper.toDomain(result);
  }

  async getPokemon(id: number): Promise<PokemonInfo> {
    const result = await this.datasource.getPokemon(id);
    return PokemonInfoMapper.toDomain(result);
  }

  async getPokemonFavorite(userId: string): Promise<PokemonInfo[]> {
    const results = await this.datasource.getPokemonFavorite(userId);
    return results.map(result => PokemonInfoMapper.toDomain(result));
  }
}
