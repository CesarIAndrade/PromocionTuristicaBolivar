import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { apiUrl } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ActivitiesService {
  constructor(private http: HttpClient) {}

  refresh$ = new EventEmitter();

  getActivities() {
    return new Promise((resolve, reject) => {
      this.http
        .get(apiUrl + 'listarActividades', {
          headers: new HttpHeaders()
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', 'Bearer ' + localStorage.getItem('token')),
        })
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  createActivity(
    activity: string,
    comunity: string,
    description: string,
    startDay: string,
    endDay: string,
    startTime: string,
    endTime: string
  ) {
    const body = new HttpParams()
      .set('Actividad', activity)
      .set('Comunidad', comunity)
      .set('Descripcion', description)
      .set('DiaInicio', startDay)
      .set('DiaFin', endDay)
      .set('HoraInicio', startTime)
      .set('HoraFin', endTime);
    return new Promise((resolve, reject) => {
      this.http
        .post(apiUrl + 'crearActividad', body.toString(), {
          headers: new HttpHeaders()
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', 'Bearer ' + localStorage.getItem('token')),
        })
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }
}
