import { Component } from '@angular/core';
import data from '../assets/school.json';

export type SchoolType = {
  username: string;
  gpa: number;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'School information';
  school: SchoolType[] = data;
}
