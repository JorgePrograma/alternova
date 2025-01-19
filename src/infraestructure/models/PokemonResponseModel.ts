import { PokemonModel } from "./PokemonModel";

export interface PokemonResponseModel {
    count:    number;
    next:     string;
    previous: null;
    results:  PokemonModel[];
}