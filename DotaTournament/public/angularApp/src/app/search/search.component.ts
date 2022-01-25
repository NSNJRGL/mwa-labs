import { Component, OnInit } from '@angular/core';
import { TournamentService } from '../tournament.service';
import { Tournament } from '../tournament/tournament.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  tournaments: Tournament[] = [];
  isSearched: boolean = false;
  search: String = '';

  constructor(private tournamentService: TournamentService) {}

  private _handleResponse(response: Tournament[]): void {
    this.isSearched = true;
    this.tournaments = response;
  }

  private _handleError(error: any): void {
    alert(error);
  }

  ngOnInit(): void {}

  onSearch(): void {
    this.isSearched = false;
    this.tournamentService
      .getAll(this.search)
      .then((response) => this._handleResponse(response))
      .catch((error) => this._handleError(error));
  }
}
