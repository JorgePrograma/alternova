import { PokemonResponse } from "./../../domain/entities/PokemonResponse";
import { PokemonResponseModel } from "./../models/PokemonResponseModel";
// src/infrastructure/mappers/PokemonInfoMapper.ts

export class PokemonResponseMapper {
  public static toDomain(model: PokemonResponseModel): PokemonResponse {
    return {
      count: model.count,
      next: model.next,
      previous: model.previous,
      results: model.results,
    };
  }

  public static toModel(entity: PokemonResponse): PokemonResponseModel {
    return {
      count: entity.count,
      next: entity.next,
      previous: entity.previous,
      results: entity.results,
    };
  }
}
