import { Component, OnInit } from '@angular/core';
import { TournamentService } from '../tournament.service';

export class Participant {
  name: string;
  region: string;
  constructor(name: string, region: string) {
    this.name = name;
    this.region = region;
  }
}

export class Tournament {
  _id!: string;
  name: string;
  organizer: string;
  teams: number;
  participants: Participant[];
  constructor(
    name: string,
    organizer: string,
    teams: number,
    participants: Participant[]
  ) {
    this.name = name;
    this.organizer = organizer;
    this.teams = teams;
    this.participants = participants;
  }
}

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css'],
})
export class TournamentComponent implements OnInit {
  tournaments: Tournament[] = [];
  tournament: Tournament;

  constructor(private tournamentService: TournamentService) {
    this.tournament = new Tournament('', '', 0, [{ name: '', region: '' }]);
  }

  private _handleResponse(response: Tournament[]): void {
    this.tournaments = response;
  }

  private _handleError(error: any): void {
    alert(error);
  }

  ngOnInit(): void {
    this.tournamentService
      .getAll(null)
      .then((response) => this._handleResponse(response))
      .catch((error) => this._handleError(error));
  }

  onAdd() {
    this.tournament.participants.push({ name: '', region: '' });
  }

  onSubmit() {
    this.tournamentService
      .create(this.tournament)
      .then((response) => {
        alert('Successfully created');
        this.tournaments.push(response);
      })
      .catch((error) => this._handleError(error));
  }
}
