import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import {Category} from './category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoriesUrl = 'api/categories';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesUrl)
      .pipe(
        catchError(this.handleError<Category[]>('getCategories', []))
      );
  }

  getCategoryNo404<Data>(id: number): Observable<Category> {
    const url = `${this.categoriesUrl}/?id=${id}`;
    return this.http.get<Category[]>(url)
      .pipe(
        map(categories => categories[0]), 
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
        }),
        catchError(this.handleError<Category>(`getCategory id=${id}`))
      );
  }

  getCategory(id:number): Observable<Category|undefined>{
    const url = `${this.categoriesUrl}/${id}`;
    return this.http.get<Category>(url).pipe(
      catchError(this.handleError<Category>(`getCategory id=${id}`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); 

      return of(result as T);
    };
  }
}
