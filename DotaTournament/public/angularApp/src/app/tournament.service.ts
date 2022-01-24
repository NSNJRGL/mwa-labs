import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tournament } from './tournament/tournament.component';

@Injectable({
  providedIn: 'root',
})
export class TournamentService {
  baseUrl = 'http://localhost:8080/api';
  constructor(private http: HttpClient) {}

  _handleError(error: any): Promise<any> {
    return Promise.reject(error);
  }

  getAll(search: String | null): Promise<Tournament[]> {
    let url = this.baseUrl + '/tournaments';

    if (search) {
      url = url + '?search=' + search;
    }

    return this.http
      .get(url)
      .toPromise()
      .then((response) => response)
      .catch((error) => this._handleError(error));
  }

  getOne(id: String): Promise<Tournament> {
    const url = this.baseUrl + '/tournaments/' + id;

    return this.http
      .get(url)
      .toPromise()
      .then((response) => response)
      .catch((error) => this._handleError(error));
  }

  delete(id: String): Promise<String> {
    const url = this.baseUrl + '/tournaments/' + id;

    return this.http
      .delete(url)
      .toPromise()
      .then((response) => response)
      .catch((error) => this._handleError(error));
  }

  update(tournament: Tournament): Promise<String> {
    const url = this.baseUrl + '/tournaments/' + tournament._id;

    return this.http
      .put(url, tournament)
      .toPromise()
      .then((response) => response)
      .catch((error) => this._handleError(error));
  }

  create(tournament: Tournament): Promise<Tournament> {
    const url = this.baseUrl + '/tournaments';

    return this.http
      .post(url, tournament)
      .toPromise()
      .then((response) => response)
      .catch((error) => this._handleError(error));
  }
}
