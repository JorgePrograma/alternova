import { PokemonFavorite } from '../../entities/PokemonFavorite';
import { PokemonFavoriteRepository } from '../../repositories/pokemon/PokemonFavoriteRepository';

export class GetFavoritesByIdUseCase{
    constructor(private pokemonFavoriteRepository: PokemonFavoriteRepository){}

    async execute(userId:string): Promise<PokemonFavorite[]>{
        return this.pokemonFavoriteRepository.getPokemonsUserId(userId);
    }
}