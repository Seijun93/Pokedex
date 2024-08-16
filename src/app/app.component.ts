import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { PokemonService } from './pokemon-list/pokemon.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterOutlet, NavbarComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Pokedex';

  pokemonSubscription: any;

  constructor (private pokemonService: PokemonService) {

  }

  ngOnInit () {
    // this.pokemonSubscription = this.pokemonService.fetchPokemon().subscribe(resData => {
    //   this.pokemonService.pokemonListAll = resData;
    //   this.pokemonService.sortPokemon(resData);
    // });
  }

  ngOnDestroy () {
    // if (this.pokemonSubscription) {
    //   this.pokemonSubscription.unsubscribe();
    // }
  }
}
