import { Component, OnInit } from '@angular/core';
import { ActivitiesService } from 'src/app/services/activities.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from 'src/app/components/confirm-modal/confirm-modal.component';
import { imagesUrl } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.component.html',
  styleUrls: ['./activities-list.component.css'],
})
export class ActivitiesListComponent implements OnInit {
  constructor(
    private activitiesService: ActivitiesService,
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if(localStorage.getItem('token')) {
      this.addActivityButton = true;
      this.editActivityButton = true;
    } else {
      this.addActivityButton = false;
      this.editActivityButton = false;
    }
    this.getActivities();
    this.activitiesService.refresh$.subscribe(() => {
      this.getActivities();
    });
    this.authService.autenticated$.subscribe(() => {
      this.addActivityButton = false;
      this.editActivityButton = false;
    })
  }

  activities: any[] = [];
  addActivityButton: boolean;
  editActivityButton: boolean;

  async getActivities() {
    var response: any = await this.activitiesService.getActivities();
    if (response?.success) {
      response.success.map((item) => {
        item.Imagen = imagesUrl + item.Imagen;
      });
      this.activities = response.success;
    }
  }

  addActivity() {
    this.router.navigateByUrl('/activity-form');
  }

  editActivity(id: number) {
    this.router.navigateByUrl(`/activity-form/${id}`);
  }

  deleteActivity(id: string) {
    let dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '250px',
      height: 'auto',
    });
    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        try {
          var response: any = await this.activitiesService.deleteActivity(id);
          if (response?.success) {
            this.getActivities();
          }
        } catch (error) {
          alert('Algo salió mal');
        }
      }
    });
  }
}
