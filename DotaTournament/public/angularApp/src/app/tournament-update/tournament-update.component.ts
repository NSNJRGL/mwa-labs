import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TournamentService } from '../tournament.service';
import { Tournament } from '../tournament/tournament.component';

@Component({
  selector: 'app-tournament-update',
  templateUrl: './tournament-update.component.html',
  styleUrls: ['./tournament-update.component.css'],
})
export class TournamentUpdateComponent implements OnInit {
  tournament: Tournament;

  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private tournamentService: TournamentService
  ) {
    this.tournament = new Tournament('', '', 0, [{ name: '', region: '' }]);
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

  onUpdate(): void {
    this.tournamentService
      .update(this.tournament)
      .then((response) => {
        alert(response);
        this.route.navigateByUrl(`/tournaments/${this.tournament._id}`);
      })
      .catch((error) => this._handleError(error));
  }
}
