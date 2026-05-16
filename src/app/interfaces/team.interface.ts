import { Pokemon } from './pokemon.interface';

export interface Team {
    id: number;
    name: string;
    pokemons: Pokemon[];
    editing?: boolean;
}