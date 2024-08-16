import { Component, OnInit } from '@angular/core';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';

import { PokemonService } from './pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [PokemonCardComponent],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css'
})
export class PokemonListComponent implements OnInit{

  pokemons: any[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor (private pokemonService: PokemonService) {
    
  }

  ngOnInit() {
    this.pokemonService.fetchPokemon().subscribe({
      next: (pokemonArray) => {
        this.pokemonService.combinePokemonInformations(pokemonArray.results).subscribe({
          next: (combinedPokemonArray) => {
            this.pokemons = combinedPokemonArray;
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

}
