import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { apiUrl } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ResearchService {
  constructor(private http: HttpClient) {}

  refresh$ = new EventEmitter();

  getResearchList() {
    return new Promise((resolve, reject) => {
      this.http
        .get(apiUrl + 'listarPublicaciones', {
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

  addResearch(
    researchTitle: string,
    researchLink: string,
    researchPubDate: string,
    authors: string[]
  ) {
    const body = new HttpParams()
      .set('TituloPublicacion', researchTitle)
      .set('EnlacePublicacion', researchLink)
      .set('FechaPublicacion', researchPubDate)
      .set('Autores', JSON.stringify(authors));
    return new Promise((resolve, reject) => {
      this.http
        .post(apiUrl + 'crearPublicacion', body.toString(), {
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

  deleteResearch(id: string) {
    const body = new HttpParams().set('IdPublicacion', id);
    return new Promise((resolve, reject) => {
      this.http
        .post(apiUrl + 'eliminarPublicacion', body.toString(), {
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

  getResearch(id: string) {
    const body = new HttpParams().set('IdPublicacion', id);
    return new Promise((resolve, reject) => {
      this.http
        .post(apiUrl + 'buscarPublicacion', body.toString(), {
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

  updateResearch(
    researchId: string,
    researchTitle: string,
    researchLink: string,
    researchPubDate: string,
    authors: string[]
  ) {        
    const body = new HttpParams()
      .set('IdPublicacion', researchId.toString())
      .set('TituloPublicacion', researchTitle)
      .set('EnlacePublicacion', researchLink)
      .set('FechaPublicacion', researchPubDate)
      .set('Autores', JSON.stringify(authors));
    return new Promise((resolve, reject) => {
      this.http
        .post(apiUrl + 'actualizarPublicacion', body.toString(), {
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
