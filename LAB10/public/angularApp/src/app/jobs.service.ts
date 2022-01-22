import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Jobs } from './job/job.component';

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  baseUrl = 'http://localhost:8080/api';
  constructor(private http: HttpClient) {}

  getAll(): Promise<Jobs[]> {
    const url = this.baseUrl + '/jobs';
    return this.http
      .get(url)
      .toPromise()
      .then((response) => response as Jobs[])
      .catch((error) => Promise.reject(error));
  }

  getOne(id: String): Promise<Jobs> {
    const url = this.baseUrl + '/jobs/' + id;
    return this.http
      .get(url)
      .toPromise()
      .then((response) => response as Jobs)
      .catch((error) => Promise.reject(error));
  }

  delete(id: String): Promise<String> {
    const url = this.baseUrl + '/jobs/' + id;
    return this.http
      .delete(url)
      .toPromise()
      .then((response) => response as String)
      .catch((error) => Promise.reject(error));
  }

  create(job: Jobs): Promise<Jobs> {
    const url = this.baseUrl + '/jobs';
    const data = {
      title: job.title,
      salary: job.salary,
      location: {
        address: job.location.address,
        coordinates: job.location.coordinates,
      },
      description: job.description,
      experience: job.experience,
      skills: job.skills,
      postDate: job.postDate,
    };

    return this.http
      .post(url, data)
      .toPromise()
      .then((response) => response as Jobs)
      .catch((error) => Promise.reject(error));
  }

  update(job: Jobs): Promise<Jobs> {
    const url = this.baseUrl + '/jobs/' + job._id;
    const data = {
      title: job.title,
      salary: job.salary,
      location: {
        address: job.location.address,
        coordinates: job.location.coordinates,
      },
      description: job.description,
      experience: job.experience,
      skills: job.skills,
      postDate: job.postDate,
    };

    return this.http
      .put(url, data)
      .toPromise()
      .then((response) => response as Jobs)
      .catch((error) => Promise.reject(error));
  }
}
