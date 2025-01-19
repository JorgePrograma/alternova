import { Pokemon } from "./Pokemon";

export interface PokemonResponse {
    count:    number;
    next:     string;
    previous: null;
    results:  Pokemon[];
}