import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivitiesService } from 'src/app/services/activities.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.css'],
})
export class ActivityFormComponent implements OnInit {
  activityForm: FormGroup;

  constructor(
    private activitiesService: ActivitiesService,
    private router: Router,
    private location: Location
  ) {
    this.activityForm = new FormGroup({
      activityId: new FormControl(''),
      activity: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      comunity: new FormControl('', Validators.required),
      startDay: new FormControl('', Validators.required),
      endDay: new FormControl('', Validators.required),
    });
  }

  date: any;
  submitButton: string;
  action = 'Nueva';

  ngOnInit(): void {
    this.date = this.getDate();
    this.activityForm.get('startDay').setValue(this.date);
    this.activityForm.get('endDay').setValue(this.date);
  }

  getDate() {
    var fechaYHora = new Date();
    var fecha = fechaYHora.toJSON().split('T')[0];
    var minutes: any;
    if (fechaYHora.getMinutes() < 10) {
      minutes = `0${fechaYHora.getMinutes()}`;
    } else {
      minutes = fechaYHora.getMinutes();
    }
    var hora = fechaYHora.getHours() + ':' + minutes;
    return fecha + 'T' + hora;
  }

  handleSubmit() {
    if (this.submitButton == 'edit') {
      // this.editArticle();
    } else {
      this.createActivity();
    }
  }

  async createActivity() {
    if (this.activityForm.valid) {
      var startDay = this.activityForm.get('startDay').value;
      var endDay = this.activityForm.get('endDay').value;
      var response: any = await this.activitiesService.createActivity(
        this.activityForm.get('activity').value,
        this.activityForm.get('comunity').value,
        this.activityForm.get('description').value,
        startDay.split('T')[0],
        endDay.split('T')[0],
        startDay.split('T')[1],
        endDay.split('T')[1]
      );
      if (response?.success) {
        this.activityForm.reset();
        this.router.navigateByUrl('/activities-list');
      }
    }
  }

  goBack() {
    this.location.back();
  }
}
