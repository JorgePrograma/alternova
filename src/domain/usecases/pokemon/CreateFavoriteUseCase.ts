import { PokemonFavorite } from '../../entities/PokemonFavorite';
import { PokemonFavoriteRepository } from '../../repositories/pokemon/PokemonFavoriteRepository';

export class CreateFavoriteUseCase{
    constructor(private pokemonFavoriteRepository: PokemonFavoriteRepository){}

    async execute(pokemon:PokemonFavorite): Promise<boolean>{
        return this.pokemonFavoriteRepository.addPokemon(pokemon);
    }
}