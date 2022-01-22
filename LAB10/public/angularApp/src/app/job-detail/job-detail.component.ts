import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Jobs, Location } from '../job/job.component';
import { JobsService } from '../jobs.service';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css'],
})
export class JobDetailComponent implements OnInit {
  job!: Jobs;

  constructor(
    private route: ActivatedRoute,
    private jobService: JobsService,
    private router: Router
  ) {
    const newLocation = new Location('', '', [0, 0]);
    this.job = new Jobs('', '', 0, newLocation, '', '', [], new Date());
  }

  ngOnInit(): void {
    const paramId = this.route.snapshot.paramMap.get('id');

    if (paramId) {
      this.jobService
        .getOne(paramId)
        .then((response) => (this.job = response))
        .catch((error) => alert(error));
    }
  }

  onUpdate() {
    this.jobService
      .update(this.job)
      .then((response) => {
        alert(response);
        this.router.navigateByUrl('/jobs');
      })
      .catch((error) => alert(error));
  }

  onDelete() {
    this.jobService
      .delete(this.job._id)
      .then((response) => {
        alert(response);
        this.router.navigateByUrl('/jobs');
      })
      .catch((error) => alert(error));
  }
}
