import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, forkJoin, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit='

  constructor(private httpClient: HttpClient) {
    
  }  

  fetchPokemon (start: string, end: string): Observable<any> {
    return this.httpClient.get(this.apiUrl + end + "&offset=" + start).pipe(
      catchError((error) => {
        console.error("Fehler beim Ausführen der Pokémon-Liste:", error);
        throw error;
      }) 
    );
  }

  fetchPokemonDetails (url: string): Observable<any> {

    return this.httpClient.get(url).pipe(
      catchError((error) => {
        console.error(`Fehler beim Abrufen der Details für URL ${url}:`,error);
        throw error;
      })
    );
    
  }

  combinePokemonInformations(pokemonArray: any[]): Observable<any> {
    if(!pokemonArray || !pokemonArray.length) {
      console.error("Erro: Keine Pokémondaten übergeben");
      return new Observable(observer => observer.complete());
    }

    const detailRequests = pokemonArray.map(pokemon => 
      this.fetchPokemonDetails(pokemon.url).pipe(
        map(details => ({
          ...pokemon,
          details
        }))
      )
    );
    
    return forkJoin(detailRequests).pipe(
      catchError((error) => {
        console.error("Fehler beim Kombinieren der Pokémon-Informationen:", error);
        throw error;
      })
    )
  }
}
