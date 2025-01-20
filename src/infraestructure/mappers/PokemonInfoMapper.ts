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
      game_indices: pokemonInfoModel.game_indices.map(index => ({
        game_index: index.game_index,
        version: {
          name: index.version.name,
          url: index.version.url
        }
      })),
      height: pokemonInfoModel.height,
      held_items: pokemonInfoModel.held_items,
      id: pokemonInfoModel.id,
      is_default: pokemonInfoModel.is_default,
      location_area_encounters: pokemonInfoModel.location_area_encounters,
      moves: pokemonInfoModel.moves.map(move => ({
        move: {
          name: move.move.name,
          url: move.move.url
        },
        version_group_details: move.version_group_details.map(detail => ({
          level_learned_at: detail.level_learned_at,
          move_learn_method: {
            name: detail.move_learn_method.name,
            url: detail.move_learn_method.url
          },
          version_group: {
            name: detail.version_group.name,
            url: detail.version_group.url
          }
        }))
      })),
      name: pokemonInfoModel.name,
      order: pokemonInfoModel.order,
      past_abilities: pokemonInfoModel.past_abilities,
      past_types: pokemonInfoModel.past_types,
      species: {
        name: pokemonInfoModel.species.name,
        url: pokemonInfoModel.species.url
      },
      sprites: {
        ...pokemonInfoModel.sprites,
        other: pokemonInfoModel.sprites.other ? {
          dream_world: pokemonInfoModel.sprites.other.dream_world,
          home: pokemonInfoModel.sprites.other.home,
          "official-artwork": pokemonInfoModel.sprites.other["official-artwork"],
          showdown: pokemonInfoModel.sprites.other.showdown
        } : undefined,
        versions: pokemonInfoModel.sprites.versions
      },
      stats: pokemonInfoModel.stats.map(stat => ({
        base_stat: stat.base_stat,
        effort: stat.effort,
        stat: {
          name: stat.stat.name,
          url: stat.stat.url
        }
      })),
      types: pokemonInfoModel.types.map(type => ({
        slot: type.slot,
        type: {
          name: type.type.name,
          url: type.type.url
        }
      })),
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
      game_indices: pokemonInfo.game_indices.map(index => ({
        game_index: index.game_index,
        version: {
          name: index.version.name,
          url: index.version.url
        }
      })),
      height: pokemonInfo.height,
      held_items: pokemonInfo.held_items,
      id: pokemonInfo.id,
      is_default: pokemonInfo.is_default,
      location_area_encounters: pokemonInfo.location_area_encounters,
      moves: pokemonInfo.moves.map(move => ({
        move: {
          name: move.move.name,
          url: move.move.url
        },
        version_group_details: move.version_group_details.map(detail => ({
          level_learned_at: detail.level_learned_at,
          move_learn_method: {
            name: detail.move_learn_method.name,
            url: detail.move_learn_method.url
          },
          version_group: {
            name: detail.version_group.name,
            url: detail.version_group.url
          }
        }))
      })),
      name: pokemonInfo.name,
      order: pokemonInfo.order,
      past_abilities: pokemonInfo.past_abilities,
      past_types: pokemonInfo.past_types,
      species: {
        name: pokemonInfo.species.name,
        url: pokemonInfo.species.url
      },
      sprites: {
        ...pokemonInfo.sprites,
        other: pokemonInfo.sprites.other ? {
          dream_world: pokemonInfo.sprites.other.dream_world,
          home: pokemonInfo.sprites.other.home,
          "official-artwork": pokemonInfo.sprites.other["official-artwork"],
          showdown: pokemonInfo.sprites.other.showdown
        } : undefined,
        versions: pokemonInfo.sprites.versions
      },
      stats: pokemonInfo.stats.map(stat => ({
        base_stat: stat.base_stat,
        effort: stat.effort,
        stat: {
          name: stat.stat.name,
          url: stat.stat.url
        }
      })),
      types: pokemonInfo.types.map(type => ({
        slot: type.slot,
        type: {
          name: type.type.name,
          url: type.type.url
        }
      })),
      weight: pokemonInfo.weight
    };
  }
}
