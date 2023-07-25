import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Game } from 'src/app/models/game';
import { GameServiceService } from 'src/app/services/game-service.service';

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css'],
})
export class GameFormComponent implements OnInit {
  game: Game | any = {
    id: 0,
    title: '',
    description: '',
    image: '',
    created_at: new Date(),
  };

  edit: boolean = false;

  constructor(
    private gameService: GameServiceService,
    private route: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const params = this.activeRoute.snapshot.params;
    if (params.id) {
      this.gameService.getGame(params.id).subscribe(
        (res) => {
          console.log(res);
          this.game = res;
          this.edit = true;
        },
        (err) => console.log(err)
      );
    }
  }

  saveNewGame() {
    delete this.game.created_at;
    delete this.game.id;

    this.gameService.saveGame(this.game).subscribe(
      (res) => {
        console.log(res);
        this.route.navigate(['/games']);
      },
      (err) => console.error(err)
    );
  }

  updateGame() {
    delete this.game.created_at;

    this.gameService.updateGame(this.game.id, this.game).subscribe(
      (res) => {
        console.log(res);
        this.route.navigate(['/games']);
      },
      (err) => console.log(err)
    );
  }
}
