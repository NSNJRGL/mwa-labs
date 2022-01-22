import { Component, OnInit } from '@angular/core';
import { JobsService } from '../jobs.service';

export class Location {
  _id: String;
  address: String;
  coordinates: Number[];
  constructor(id: String, address: String, coordinates: Number[]) {
    this._id = id;
    this.address = address;
    this.coordinates = coordinates;
  }
}

export class Jobs {
  _id: String;
  title: String;
  salary: Number;
  location: Location;
  description: String;
  experience: String;
  skills: String[];
  postDate: Date;
  constructor(
    id: String,
    title: String,
    salary: Number,
    location: Location,
    description: String,
    experience: String,
    skills: String[],
    postDate: Date
  ) {
    this._id = id;
    this.title = title;
    this.salary = salary;
    this.location = location;
    this.description = description;
    this.experience = experience;
    this.skills = skills;
    this.postDate = postDate;
  }
}

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css'],
})
export class JobComponent implements OnInit {
  jobs: Jobs[] = [];
  job!: Jobs;

  constructor(private jobService: JobsService) {
    const newLocation = new Location('', '', [0, 0]);
    this.job = new Jobs('', '', 0, newLocation, '', '', [], new Date());
  }

  ngOnInit(): void {
    this.jobService
      .getAll()
      .then((response) => (this.jobs = response))
      .catch((error) => console.log(error));
  }

  onSave() {
    this.jobService
      .create(this.job)
      .then((response) => {
        alert('Job created successfully');
        this.jobs.push(response);
      })
      .catch((error) => {
        alert(error);
      });
  }
}
