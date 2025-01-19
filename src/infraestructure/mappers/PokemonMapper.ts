import { PokemonModel } from '../models/PokemonModel';
import { Pokemon } from './../../domain/entities/Pokemon';
// src/infrastructure/mappers/PokemonInfoMapper.ts


export class PokemonMapper {
  public static toDomain(model: PokemonModel): Pokemon {
    return{
      name : model.name,
      url : model.url,
    }
  }

  public static toModel(entity: Pokemon): PokemonModel {
    return{
      name : entity.name,
      url : entity.url,
    }
  }
}
