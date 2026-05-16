import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { Pokemon } from '../interfaces/pokemon.interface';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=1025';

  constructor(private http: HttpClient) {}

  async getPokemons(): Promise<Pokemon[]> {

    const response: any = await firstValueFrom(
      this.http.get(this.apiUrl)
    );

    const pokemonPromises = response.results.map(async (pokemon: any) => {

      const pokemonData: any = await firstValueFrom(
        this.http.get(pokemon.url)
      );

      return {
        id: pokemonData.id,
        name: pokemonData.name,
        image: pokemonData.sprites.front_default,
        types: pokemonData.types.map((type: any) => type.type.name)
      };

    });

    return Promise.all(pokemonPromises);

  }

}