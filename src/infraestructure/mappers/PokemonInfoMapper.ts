// src/infrastructure/mappers/PokemonInfoMapper.ts

import { PokemonInfo } from "@/src/domain/entities/PokemonInfo";
import { PokemonInfoModel } from "../models/PokemonInfoModel";

export class PokemonInfoMapper {
  public static toDomain(pokemonInfoModel: PokemonInfoModel): PokemonInfo {
    return {
      abilities: pokemonInfoModel.abilities.map(ability => ({
        ability: {
          name: ability.ability.name,
          url: ability.ability.url
        },
        is_hidden: ability.is_hidden,
        slot: ability.slot
      })),
      base_experience: pokemonInfoModel.base_experience,
      cries: {
        latest: pokemonInfoModel.cries.latest,
        legacy: pokemonInfoModel.cries.legacy
      },
      forms: pokemonInfoModel.forms.map(form => ({
        name: form.name,
        url: form.url
      })),
      height: pokemonInfoModel.height,
      id: pokemonInfoModel.id,
      name: pokemonInfoModel.name,
      order: pokemonInfoModel.order,
      species: {
        name: pokemonInfoModel.species.name,
        url: pokemonInfoModel.species.url
      },
      sprites: {
        back_default: pokemonInfoModel.sprites.back_default,
        back_female: pokemonInfoModel.sprites.back_female,
        back_shiny: pokemonInfoModel.sprites.back_shiny,
        back_shiny_female: pokemonInfoModel.sprites.back_shiny_female,
        front_default: pokemonInfoModel.sprites.front_default,
        front_female: pokemonInfoModel.sprites.front_female,
        front_shiny: pokemonInfoModel.sprites.front_shiny,
        front_shiny_female: pokemonInfoModel.sprites.front_shiny_female,
        animated: pokemonInfoModel.sprites.animated ? {
          back_default: pokemonInfoModel.sprites.animated.back_default,
          back_female: pokemonInfoModel.sprites.animated.back_female,
          back_shiny: pokemonInfoModel.sprites.animated.back_shiny,
          back_shiny_female: pokemonInfoModel.sprites.animated.back_shiny_female,
          front_default: pokemonInfoModel.sprites.animated.front_default,
          front_female: pokemonInfoModel.sprites.animated.front_female,
          front_shiny: pokemonInfoModel.sprites.animated.front_shiny,
          front_shiny_female: pokemonInfoModel.sprites.animated.front_shiny_female
        } : undefined
      },
      weight: pokemonInfoModel.weight
    };
  }

  public static toModel(pokemonInfo: PokemonInfo): PokemonInfoModel {
    return {
      abilities: pokemonInfo.abilities.map(ability => ({
        ability: {
          name: ability.ability.name,
          url: ability.ability.url
        },
        is_hidden: ability.is_hidden,
        slot: ability.slot
      })),
      base_experience: pokemonInfo.base_experience,
      cries: {
        latest: pokemonInfo.cries.latest,
        legacy: pokemonInfo.cries.legacy
      },
      forms: pokemonInfo.forms.map(form => ({
        name: form.name,
        url: form.url
      })),
      height: pokemonInfo.height,
      id: pokemonInfo.id,
      name: pokemonInfo.name,
      order: pokemonInfo.order,
      species: {
        name: pokemonInfo.species.name,
        url: pokemonInfo.species.url
      },
      sprites: {
        back_default: pokemonInfo.sprites.back_default,
        back_female: pokemonInfo.sprites.back_female,
        back_shiny: pokemonInfo.sprites.back_shiny,
        back_shiny_female: pokemonInfo.sprites.back_shiny_female,
        front_default: pokemonInfo.sprites.front_default,
        front_female: pokemonInfo.sprites.front_female,
        front_shiny: pokemonInfo.sprites.front_shiny,
        front_shiny_female: pokemonInfo.sprites.front_shiny_female,
        animated: pokemonInfo.sprites.animated ? {
          back_default: pokemonInfo.sprites.animated.back_default,
          back_female: pokemonInfo.sprites.animated.back_female,
          back_shiny: pokemonInfo.sprites.animated.back_shiny,
          back_shiny_female: pokemonInfo.sprites.animated.back_shiny_female,
          front_default: pokemonInfo.sprites.animated.front_default,
          front_female: pokemonInfo.sprites.animated.front_female,
          front_shiny: pokemonInfo.sprites.animated.front_shiny,
          front_shiny_female: pokemonInfo.sprites.animated.front_shiny_female
        } : undefined
      },
      weight: pokemonInfo.weight
    };
  }
}
