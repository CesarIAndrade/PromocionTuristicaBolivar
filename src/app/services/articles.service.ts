import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { apiUrl } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  constructor(private http: HttpClient) {}

  refresh$ = new EventEmitter();

  getArticles(url: string, autenticated: boolean) {
    if (autenticated) {
      var headers = new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    } else {
      var headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
    }
    return new Promise((resolve, reject) => {
      this.http
        .get(apiUrl + url, {
          headers: headers,
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

  getArticle(id: string) {
    const body = new HttpParams().set('IdNoticia', id);
    return new Promise((resolve, reject) => {
      this.http
        .post(apiUrl + 'buscarNoticia', body.toString(), {
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

  createArticle(
    title: string,
    shortDescription: string,
    description: string,
    image: File
  ) {
    const fd = new FormData();
    fd.append('Titulo', title);
    fd.append('DescripcionNoticiaCorta', shortDescription);
    fd.append('DescripcionNoticia', description);
    fd.append('ImagenTitulo', image);
    return new Promise((resolve, reject) => {
      this.http
        .post(apiUrl + 'crearNoticia', fd, {
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

  editArticle(
    id: string,
    title: string,
    shortDescription: string,
    description: string,
    image: File
  ) {
    const fd = new FormData();
    fd.append('IdNoticia', id);
    fd.append('Titulo', title);
    fd.append('DescripcionNoticiaCorta', shortDescription);
    fd.append('DescripcionNoticia', description);
    fd.append('ImagenTitulo', image);
    return new Promise((resolve, reject) => {
      this.http
        .post(apiUrl + 'actualizarNoticia', fd, {
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

  deleteArticle(id: string) {
    const body = new HttpParams().set('IdNoticia', id);
    return new Promise((resolve, reject) => {
      this.http
        .post(apiUrl + 'eliminarNoticia', body.toString(), {
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

  changeState(id: string, state: string) {
    const body = new HttpParams().set('IdNoticia', id).set('Estado', state);
    console.log(body);
    return new Promise((resolve, reject) => {
      this.http
        .post(apiUrl + 'cambiarEstadoNoticia', body.toString(), {
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
