import { PokemonResponse } from '../../entities/PokemonResponse';
import { PokemonRepository } from '../../repositories/pokemon/PokemonRepository';

export class GetAllPokemonsUseCase{
    constructor(private pokemonRepository: PokemonRepository){}

    async execute(offset:string): Promise<PokemonResponse>{
        return this.pokemonRepository.getPokemonAll(offset);
    }
}