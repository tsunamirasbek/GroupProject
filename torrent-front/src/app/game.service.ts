import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import {Game} from './game';


@Injectable({
  providedIn: 'root'
})
export class GameService {
  private gamesUrl = 'api/games';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.gamesUrl)
      .pipe(
        catchError(this.handleError<Game[]>('getGames', []))
      );
  }

  getCategoryNo404<Data>(id: number): Observable<Game> {
    const url = `${this.gamesUrl}/?id=${id}`;
    return this.http.get<Game[]>(url)
      .pipe(
        map(games => games[0]), 
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
        }),
        catchError(this.handleError<Game>(`getGame id=${id}`))
      );
  }

  getGame(id:number): Observable<Game|undefined>{
    const url = `${this.gamesUrl}/${id}`;
    return this.http.get<Game>(url).pipe(
      catchError(this.handleError<Game>(`getGame id=${id}`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); 

      return of(result as T);
    };
  }

  searchGames(term:string):Observable<Game[]>{
    if(!term.trim()){
      return of([]);
    }
    return this.http.get<Game[]>(`${this.gamesUrl}/?title=${term}`).pipe(
      catchError(this.handleError<Game[]>('searchGames',[]))
    );
  }

  addComment(comment: { username: string; text: string; game: string; }): Observable<any> {
    return this.http.post<any>(this.gamesUrl + 'comment/', comment, this.httpOptions)
  }

  getComment(): Observable<any[]> {
    return this.http.get<any[]>(this.gamesUrl + 'comment/')
  }


}
