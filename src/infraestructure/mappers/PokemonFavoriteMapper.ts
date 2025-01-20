import { PokemonFavorite } from '@/src/domain/entities/PokemonFavorite';
import { PokemonFavoriteModel } from '../models/PokemonFavoriteModel';
// src/infrastructure/mappers/PokemonInfoMapper.ts


export class PokemonFavoriteMapper {
  public static toDomain(model: PokemonFavoriteModel): PokemonFavorite {
    return{
      name : model.name,
      url : model.url,
      id:model.id,
      userId:model.userId,
    }
  }

  public static toModel(entity: PokemonFavorite): PokemonFavoriteModel {
    return{
      name : entity.name,
      url : entity.url,
      id:entity.id,
      userId:entity.userId
    }
  }
}
