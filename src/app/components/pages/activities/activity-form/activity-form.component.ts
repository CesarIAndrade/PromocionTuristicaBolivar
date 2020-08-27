import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivitiesService } from 'src/app/services/activities.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { imagesUrl } from 'src/environments/environment';

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
    private location: Location,
    private activedRoute: ActivatedRoute
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
  imageSelected: string | ArrayBuffer;
  image: File;

  ngOnInit(): void {
    this.activedRoute.paramMap.subscribe((params) => {
      if (params.get('id')) {
        this.getActivity(params.get('id'));
      } else {
        this.date = this.getDate();
        this.activityForm.get('startDay').setValue(this.date);
        this.activityForm.get('endDay').setValue(this.date);
      }
    });
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
      this.editActivity();
    } else {
      this.createActivity();
    }
  }

  async createActivity() {    
    if (this.activityForm.valid) {
      if (this.image) {
        var startDay = this.activityForm.get('startDay').value;
        var endDay = this.activityForm.get('endDay').value;
        var response: any = await this.activitiesService.createActivity(
          this.activityForm.get('activity').value,
          this.activityForm.get('comunity').value,
          this.activityForm.get('description').value,
          startDay.split('T')[0],
          endDay.split('T')[0],
          startDay.split('T')[1],
          endDay.split('T')[1],
          this.image
        );
        if (response?.success) {
          this.activityForm.reset();
          this.router.navigateByUrl('/activities-list');
        }
      } else {
        alert('Necesitas una imagen');
      }
    }
  }

  goBack() {
    this.location.back();
  }

  async getActivity(id: string) {
    var response: any = await this.activitiesService.getActivity(id);
    if (response?.success) {
      const {
        Actividad,
        Comunidad,
        Descripcion,
        DiaFinal,
        DiaInicial,
        HoraFin,
        HoraInicio,
        IdRelacionesActividad,
        Imagen
      } = response.success[0];
      this.activityForm.setValue({
        activityId: IdRelacionesActividad,
        activity: Actividad,
        description: Descripcion,
        comunity: Comunidad,
        startDay: DiaInicial + 'T' + HoraInicio,
        endDay: DiaFinal + 'T' + HoraFin
      });
      this.imageSelected = imagesUrl + Imagen;
      this.submitButton = 'edit';
      this.action = 'Modificar';
    }
  }

  async editActivity() {
    if (this.activityForm.valid) {
      var startDay = this.activityForm.get('startDay').value;
      var endDay = this.activityForm.get('endDay').value;
      var response: any = await this.activitiesService.editActivity(
        this.activityForm.get('activityId').value,
        this.activityForm.get('activity').value,
        this.activityForm.get('comunity').value,
        this.activityForm.get('description').value,
        startDay.split('T')[0],
        endDay.split('T')[0],
        startDay.split('T')[1],
        endDay.split('T')[1],
        this.image
      );
      if (response?.success) {
        this.activitiesService.refresh$.emit();
        this.router.navigate(['/activities-list']);
        this.submitButton = null;
        this.action = 'Guardar';
      }
    }
  }

  uploadPhoto(event) {
    if (event.target.files && event.target.files[0]) {
      this.image = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => (this.imageSelected = reader.result);
      reader.readAsDataURL(this.image);
    }
  }
}
