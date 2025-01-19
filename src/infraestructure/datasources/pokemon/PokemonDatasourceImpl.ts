import { get } from '@/src/core/http/apiClient';
import { PokemonInfoModel } from '../../models/PokemonInfoModel';
import { PokemonResponseModel } from '../../models/PokemonResponseModel';
import { PokemonDatasource } from './PokemonDatasource';

export class PokemonDatasourceImpl implements PokemonDatasource {
  async getPokemonAll(offset: string): Promise<PokemonResponseModel> {
    try {
      return await get<PokemonResponseModel>(`/pokemon?offset=${offset}&limit=20`);
    } catch (error) {
      console.error('Error fetching all Pokemon:', error);
      throw new Error('Failed to fetch Pokemon list');
    }
  }

  async getPokemon(id: number): Promise<PokemonInfoModel> {
    try {
      return await get<PokemonInfoModel>(`/pokemon/${id}`);
    } catch (error) {
      console.error(`Error fetching Pokemon with id ${id}:`, error);
      throw new Error(`Failed to fetch Pokemon with id ${id}`);
    }
  }

  async getPokemonFavorite(userId: string): Promise<PokemonInfoModel[]> {
    try {
      return await get<PokemonInfoModel[]>(`/users/${userId}/favorite-pokemon`);
    } catch (error) {
      console.error(`Error fetching favorite Pokemon for user ${userId}:`, error);
      throw new Error(`Failed to fetch favorite Pokemon for user ${userId}`);
    }
  }
}
