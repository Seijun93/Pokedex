import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [],
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.css'
})
export class PokemonDetailComponent{

  @Input() pokemon: any;

  id: string = "";
  name: string = "";
  img: string = "";
  height: string = "";
  weight: string = "";
  moves: any;
  types: any;

  ngOnChanges() {
    if (this.pokemon) {
      console.log(this.pokemon);
      this.id = this.pokemon.details.id;
      this.name = this.pokemon.name.charAt(0).toUpperCase() + this.pokemon.name.slice(1);
      this.img = this.pokemon.details.sprites.front_default;
      this.height = this.pokemon.details.height;
      this.weight = this.pokemon.details.weight;
      this.moves = this.pokemon.details.moves;
      this.types = this.pokemon.details.types;
      console.log(this.moves);
    }
  };
}
