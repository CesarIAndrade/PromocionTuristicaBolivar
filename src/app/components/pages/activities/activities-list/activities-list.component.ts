import { Component, OnInit } from '@angular/core';
import { ActivitiesService } from 'src/app/services/activities.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.component.html',
  styleUrls: ['./activities-list.component.css'],
})
export class ActivitiesListComponent implements OnInit {
  constructor(private activitiesService: ActivitiesService, private router: Router) {}

  ngOnInit(): void {
    this.getActivities();
  }

  activities: any[] = [];

  async getActivities() {
    var response: any = await this.activitiesService.getActivities();
    console.log(response);
    if(response?.success) {
      this.activities = response.success;
    }
  }

  addActivity() {
    this.router.navigateByUrl('/activity-form');
  }
}
