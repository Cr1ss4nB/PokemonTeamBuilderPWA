import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PokemonService } from './services/pokemon.service';
import { Pokemon } from './interfaces/pokemon.interface';
import { Team } from './interfaces/team.interface';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App implements OnInit {

  pokemons: Pokemon[] = [];

    filteredPokemons: Pokemon[] = [];

    teams: Team[] = [];

    newTeamName: string = '';

    selectedTeamId: number | null = null;

    searchText: string = '';

    selectedType: string = '';

    pokemonTypes: string[] = [
      'normal',
      'fire',
      'water',
      'electric',
      'grass',
      'ice',
      'fighting',
      'poison',
      'ground',
      'flying',
      'psychic',
      'bug',
      'rock',
      'ghost',
      'dragon',
      'dark',
      'steel',
      'fairy'
    ];

    selectedRegion: string = '';

    regions = [
      { name: 'Kanto', start: 1, end: 151 },
      { name: 'Johto', start: 152, end: 251 },
      { name: 'Hoenn', start: 252, end: 386 },
      { name: 'Sinnoh', start: 387, end: 493 },
      { name: 'Unova', start: 494, end: 649 },
      { name: 'Kalos', start: 650, end: 721 },
      { name: 'Alola', start: 722, end: 809 },
      { name: 'Galar', start: 810, end: 905 },
      { name: 'Paldea', start: 906, end: 1025 }
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
    
    const selectedRegionData = this.regions.find(
      region => region.name === this.selectedRegion
    );

    const matchesRegion =
      this.selectedRegion === '' ||
      (
        pokemon.id >= selectedRegionData!.start &&
        pokemon.id <= selectedRegionData!.end
      );

    return matchesName && matchesType && matchesRegion;

  });

  }

  createTeam() {

    const trimmedName = this.newTeamName.trim();

    if (!trimmedName) {
      alert('El nombre del equipo es obligatorio');
      return;
    }

    if (this.teams.length >= 9) {
      alert('Solo puedes crear máximo 9 equipos');
      return;
    }

    const newTeam: Team = {
      id: Date.now(),
      name: trimmedName,
      pokemons: []
    };

    this.teams.push(newTeam);

    this.newTeamName = '';

  }

  deleteTeam(teamId: number) {

    const confirmDelete = confirm(
      '¿Seguro que deseas eliminar este equipo?'
    );

    if (!confirmDelete) {
      return;
    }

    this.teams = this.teams.filter(
      team => team.id !== teamId
    );

  }

  selectTeam(teamId: number) {

    if (this.selectedTeamId === teamId) {
      this.selectedTeamId = null;
      return;
    }

    this.selectedTeamId = teamId;

  }

  addPokemonToTeam(pokemon: Pokemon) {

    if (this.selectedTeamId === null) {
      alert('Debes seleccionar un equipo');
      return;
    }

    const team = this.teams.find(
      team => team.id === this.selectedTeamId
    );

    if (!team) {
      return;
    }

    const pokemonExists = team.pokemons.some(
      teamPokemon => teamPokemon.id === pokemon.id
    );

    if (pokemonExists) {
      alert('Este Pokémon ya está en el equipo');
      return;
    }

    if (team.pokemons.length >= 6) {
      alert('Un equipo solo puede tener 6 Pokémon');
      return;
    }

    team.pokemons.push(pokemon);

  }

  removePokemonFromTeam(
    teamId: number,
    pokemonId: number
  ) {

    const team = this.teams.find(
      team => team.id === teamId
    );

    if (!team) {
      return;
    }

    team.pokemons = team.pokemons.filter(
      pokemon => pokemon.id !== pokemonId
    );

  }
}