import { PokemonFavoriteRepository } from '../../repositories/pokemon/PokemonFavoriteRepository';

export class DeleteFavoriteUseCase{
    constructor(private pokemonFavoriteRepository: PokemonFavoriteRepository){}

    async execute(id:string, userId:string): Promise<boolean>{
        return this.pokemonFavoriteRepository.deletePokemonFavorite(id, userId);
    }
}