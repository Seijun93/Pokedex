import { Component, OnInit, Input, input, OnChanges, SimpleChanges } from '@angular/core';

import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { PokemonService } from './pokemon.service';
import { PokemonDetailComponent } from "./pokemon-detail/pokemon-detail.component";

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [PokemonCardComponent, PokemonDetailComponent],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css'
})
export class PokemonListComponent implements OnInit, OnChanges{

  pokemons: any[] = [];
  selectedPokemon: any;
  isLoading: boolean = true;
  errorMessage: string = '';
  @Input() start!: string;
  @Input() end!: string;

  constructor (private pokemonService: PokemonService) {
    
  }

  ngOnInit() {
    this.loadPokemonData();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['start'] || changes['end']) {
      this.pokemons = [];
      this.loadPokemonData();
    }
  }

  loadPokemonData() {
    this.isLoading = true;
    this.pokemonService.fetchPokemon(this.start, this.end).subscribe({
      next: (pokemonArray) => {
        this.pokemonService.combinePokemonInformations(pokemonArray.results).subscribe({
          next: (combinedPokemonArray) => {
            this.pokemons = combinedPokemonArray;
            this.selectedPokemon = this.pokemons[2];
            this.isLoading = false;
            console.log(this.pokemons);
          },
          error: (error) => {
            this.errorMessage = "Fehler beim Laden der Pokémon-Details.";
            console.error(error);
            this.isLoading = false;
          }
        });
      },
      error: (error) => {
        this.errorMessage = "Fehler beim Laden der Pokémon-Details.";
        console.error(error);
        this.isLoading = false;
      }
    })
  }

  onSelectPokemon (id: any) {
    const index = +id - 1;
    this.selectedPokemon = this.pokemons[index];
  }

}
