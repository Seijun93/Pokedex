import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.css'
})
export class PokemonCardComponent {

  @Input() pokemon: any;
  @Output() select = new EventEmitter();

  id: string = "";
  name: string = "";
  img: string = "";

  ngOnInit () {
    this.id = this.pokemon.details.id;
    this.name = this.pokemon.name.charAt(0).toUpperCase() + this.pokemon.name.slice(1);
    this.img = this.pokemon.details.sprites.front_default;
  }

  onSelectPokemon() {
    this.select.emit(this.id);
  }

}
