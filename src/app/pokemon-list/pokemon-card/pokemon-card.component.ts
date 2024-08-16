import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.css'
})
export class PokemonCardComponent {

  @Input() pokemon: any;

  id: string = "";
  name: string = "";
  img: string = "";

  ngOnInit () {
    this.id = this.pokemon.details.id;
    this.name = this.pokemon.name.charAt(0).toUpperCase() + this.pokemon.name.slice(1);
    this.img = this.pokemon.details.sprites.front_default;
  }

  test(){
    console.log(this.pokemon.details)
  }

}
