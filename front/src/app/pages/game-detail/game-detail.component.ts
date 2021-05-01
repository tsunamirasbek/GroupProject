import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit {

  constructor(private gameService: GameService, private route: ActivatedRoute,private location:Location) { }

  public game
  public reqs = []
  public comments = []

  public titles = ["OS", "Processor", "Video Card", "Memory Storage"]

  commentData = {
    username: '',
    text: '',
    game: ''
  }

  ngOnInit(): void {
    let id = parseInt(this.route.snapshot.paramMap.get('id'))
    this.gameService.getGame(id).subscribe(game => {
      this.game = game
      this.reqs = this.game.requirements.split(',')
    })

    this.gameService.getComment().subscribe(comment => {
      this.comments = comment.filter(item => item.game.name == this.game.name)
    })
  }

  onComment() {
    this.commentData.game = this.game.name
    this.gameService.addComment(this.commentData).subscribe()
  }
  goBack(): void {
    this.location.back();
  }

}
