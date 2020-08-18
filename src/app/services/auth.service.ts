import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { apiUrl } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  autenticated$ =  new EventEmitter();

  test: boolean = true;

  login(user: string, password: string) {
    const body = new HttpParams()
      .set('Usuario', user)
      .set('Contrasena', password);
    return new Promise((resolve, reject) => {
      this.http
        .post(apiUrl + 'login', body.toString(), {
          headers: new HttpHeaders().set(
            'Content-Type',
            'application/x-www-form-urlencoded'
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

  logout() {
    return new Promise((resolve, reject) => {
      this.http
        .get(apiUrl + 'cerrarActualSesion', {
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
