import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { apiUrl } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonsService {

  constructor(private http: HttpClient) {}

  refresh$ = new EventEmitter();
  authors: any[] = [];

  getPersons() {
    return new Promise((resolve, reject) => {
      this.http
        .get(apiUrl + 'listarPersonasPublica', {
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

  getPerson(id: string) {
    const body = new HttpParams().set('IdUsuario', id);
    return new Promise((resolve, reject) => {
      this.http
        .post(apiUrl + '', body.toString(), {
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

  createPerson(
    document: string,
    firstName: string,
    secondName: string,
    firstLastname: string,
    secondLastname: string,
    email: string
  ) {
    const body = new HttpParams()
      .set('CedulaIdentidad', document)
      .set('PrimerNombre', firstName)
      .set('SegundoNombre', secondName)
      .set('PrimerApellido', firstLastname)
      .set('SegundoApellido', secondLastname)
      .set('Correo', email);
    return new Promise((resolve, reject) => {
      this.http
        .post(apiUrl + 'crearPersona', body.toString(), {
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

  updatePerson(
    personId: string,
    identityNumber: string,
    firstName: string,
    secondName: string,
    firstLastname: string,
    SecondLastname: string,
    email: string
  ) {
    const body = new HttpParams()
      .set('IdPersona', personId)
      .set('CedulaIdentidad', identityNumber)
      .set('PrimerNombre', firstName)
      .set('SegundoNombre', secondName)
      .set('PrimerApellido', firstLastname)
      .set('SegundoApellido', SecondLastname)
      .set('Correo', email);
    return new Promise((resolve, reject) => {
      this.http
        .post(apiUrl + 'actualizarPersona', body.toString(), {
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

  deletePerson(id: string) {
    const body = new HttpParams().set('IdPersona', id);
    return new Promise((resolve, reject) => {
      this.http
        .post(apiUrl + 'eliminarPersona', body.toString(), {
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
