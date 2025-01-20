import { PokemonInfo } from '../../entities/PokemonInfo';
import { PokemonRepository } from '../../repositories/pokemon/PokemonRepository';

export class GetAllPokemonsUseCase{
    constructor(private pokemonRepository: PokemonRepository){}

    async execute(id:number): Promise<PokemonInfo>{
        return this.pokemonRepository.getPokemon(id);
    }
}