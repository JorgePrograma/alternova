import { Pokemon } from "./Pokemon";

export interface PokemonResponse {
    count:    number;
    next:     null;
    previous: null;
    results:  Pokemon[];
}