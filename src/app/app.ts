import { Component, OnInit } from '@angular/core';
import { PokemonService } from './services/pokemon.service';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  constructor(private pokemonService: PokemonService) {}

  async ngOnInit() {

    const pokemons = await this.pokemonService.getPokemons();

    console.log(pokemons);

  }

}