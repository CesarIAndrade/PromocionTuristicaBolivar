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
    endTime: string,
    image: File
  ) {
    const fd = new FormData();
    fd.append('Actividad', activity);
    fd.append('Comunidad', comunity);
    fd.append('Descripcion', description);
    fd.append('DiaInicio', startDay);
    fd.append('DiaFin', endDay);
    fd.append('HoraInicio', startTime);
    fd.append('HoraFin', endTime);
    fd.append('Imagen', image);
    return new Promise((resolve, reject) => {
      this.http
        .post(apiUrl + 'crearActividad', fd, {
          headers: new HttpHeaders().set(
            'Authorization',
            'Bearer ' + localStorage.getItem('token')
          ),
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

  deleteActivity(id: string) {
    const body = new HttpParams().set('IdRelacionesActividad', id);
    return new Promise((resolve, reject) => {
      this.http
        .post(apiUrl + 'eliminarActividad', body.toString(), {
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

  getActivity(id: string) {
    const body = new HttpParams().set('IdRelacionesActividad', id);
    return new Promise((resolve, reject) => {
      this.http
        .post(apiUrl + 'buscarActividad', body.toString(), {
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

  editActivity(
    id: string,
    activity: string,
    comunity: string,
    description: string,
    startDay: string,
    endDay: string,
    startTime: string,
    endTime: string,
    image: File
  ) {
    const fd = new FormData();
    fd.append('IdRelacionesActividad', id);
    fd.append('Actividad', activity);
    fd.append('Comunidad', comunity);
    fd.append('Descripcion', description);
    fd.append('DiaInicio', startDay);
    fd.append('DiaFin', endDay);
    fd.append('HoraInicio', startTime);
    fd.append('HoraFin', endTime);
    fd.append('Imagen', image);
    return new Promise((resolve, reject) => {
      this.http
        .post(apiUrl + 'actualizarActividad', fd, {
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
