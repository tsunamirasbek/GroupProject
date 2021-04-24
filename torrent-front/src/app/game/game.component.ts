import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../category';
import { CategoryService } from '../category.service';
import { Game } from '../game';
import { GameService } from '../game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  games: Game[] = [];
  public title: any

  constructor(
    private route: ActivatedRoute,
    private gameService:GameService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.gameService.getGames().subscribe(data => {
        this.games = data.filter(o => o.categoryId == param.id)
        
      })
    })
  }

  getGames() {
    this.gameService.getGames()
        .subscribe(games => this.games = games);
  }

  Search(){
    if(this.title !=""){
      this.games = this.games.filter(res=>{
        return res.title.toLocaleLowerCase().match(this.title.toLocaleLowerCase());
      })
    }else if (this.title == ""){
      this.ngOnInit();
    }
  }

}
