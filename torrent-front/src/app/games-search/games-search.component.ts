import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { debounce, debounceTime, distinct, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Category } from '../category';
import { CategoryService } from '../category.service';
import { Game } from '../game';
import { GameService } from '../game.service';

@Component({
  selector: 'app-games-search',
  templateUrl: './games-search.component.html',
  styleUrls: ['./games-search.component.css']
})
export class GamesSearchComponent implements OnInit {
  games: Observable<Game[]> | undefined;
  private searchTerms = new Subject<string>();

  constructor(private gamesService: GameService) { }

  public search(term:string):void{
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.games = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term:string) =>this.gamesService.searchGames(term))
    )
  }

}
