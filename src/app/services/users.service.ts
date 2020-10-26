import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { apiUrl } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  refresh$ = new EventEmitter();

  getUsers() {
    return new Promise((resolve, reject) => {
      this.http
        .get(apiUrl + 'listarUsuarios', {
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

  getUser(id: string) {
    const body = new HttpParams().set('IdUsuario', id);
    return new Promise((resolve, reject) => {
      this.http
        .post(apiUrl + 'obtenerUsuario', body.toString(), {
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

  createUser(
    username: string,
    password: string,
    document: string,
    firstName: string,
    secondName: string,
    firstLastname: string,
    secondLastname: string,
    email: string
  ) {
    const body = new HttpParams()
      .set('Usuario', username)
      .set('Contrasena', password)
      .set('CedulaIdentidad', document)
      .set('PrimerNombre', firstName)
      .set('SegundoNombre', secondName)
      .set('PrimerApellido', firstLastname)
      .set('SegundoApellido', secondLastname)
      .set('Correo', email);
    return new Promise((resolve, reject) => {
      this.http
        .post(apiUrl + 'registroUsuario', body.toString(), {
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

  updateUser(
    id: string,
    personId: string,
    username: string,
    password: string,
    identityNumber: string,
    firstName: string,
    secondName: string,
    firstLastname: string,
    SecondLastname: string,
    email: string
  ) {
    const body = new HttpParams()
      .set('IdUsuario', id)
      .set('IdPersona', personId)
      .set('Usuario', username)
      .set('Contrasena', password)
      .set('CedulaIdentidad', identityNumber)
      .set('PrimerNombre', firstName)
      .set('SegundoNombre', secondName)
      .set('PrimerApellido', firstLastname)
      .set('SegundoApellido', SecondLastname)
      .set('Correo', email);
    return new Promise((resolve, reject) => {
      this.http
        .post(apiUrl + 'actualizarUsuario', body.toString(), {
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

  deleteUser(id: string) {
    const body = new HttpParams().set('IdUsuario', id);
    return new Promise((resolve, reject) => {
      this.http
        .post(apiUrl + 'eliminarUsuario', body.toString(), {
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

  getImages() {
    return new Promise((resolve, reject) => {
      this.http
        .get(apiUrl + 'listarImagenes', {
          headers: new HttpHeaders()
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
