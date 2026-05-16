import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PokemonService } from './services/pokemon.service';
import { Pokemon } from './interfaces/pokemon.interface';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  pokemons: Pokemon[] = [];

    filteredPokemons: Pokemon[] = [];

    searchText: string = '';

    selectedType: string = '';

    pokemonTypes: string[] = [
      'grass',
      'poison',
      'fire',
      'water',
      'bug',
      'normal',
      'electric',
      'ground',
      'fairy',
      'fighting',
      'psychic',
      'rock',
      'ghost',
      'ice',
      'dragon'
    ];

  constructor(private pokemonService: PokemonService) { }

  async ngOnInit() {

    console.log('INICIA APP');

    this.pokemons = await this.pokemonService.getPokemons();
    this.filteredPokemons = this.pokemons;

    console.log(this.pokemons);

  }

  filterPokemons() {

  this.filteredPokemons = this.pokemons.filter(pokemon => {

    const matchesName =
      pokemon.name
        .toLowerCase()
        .includes(this.searchText.toLowerCase());

    const matchesType =
      this.selectedType === '' ||
      pokemon.types.includes(this.selectedType);

    return matchesName && matchesType;

  });

  }
}