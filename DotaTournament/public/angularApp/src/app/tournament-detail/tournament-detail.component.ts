import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TournamentService } from '../tournament.service';
import { Tournament } from '../tournament/tournament.component';

@Component({
  selector: 'app-tournament-detail',
  templateUrl: './tournament-detail.component.html',
  styleUrls: ['./tournament-detail.component.css'],
})
export class TournamentDetailComponent implements OnInit {
  tournament: Tournament;

  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private tournamentService: TournamentService
  ) {
    this.tournament = new Tournament('', '', 0, []);
  }

  private _handleResponse(response: Tournament): void {
    this.tournament = response;
  }

  private _handleError(error: any): void {
    alert(error);
  }

  ngOnInit(): void {
    const id = this.router.snapshot.paramMap.get('id');

    if (id) {
      this.tournamentService
        .getOne(id)
        .then((response) => this._handleResponse(response))
        .catch((error) => this._handleError(error));
    }
  }

  onDelete(): void {
    const id = this.router.snapshot.paramMap.get('id');

    if (id) {
      this.tournamentService
        .delete(id)
        .then((response) => {
          alert(response);
          this.route.navigateByUrl('/tournaments');
        })
        .catch((error) => this._handleError(error));
    }
  }
}
