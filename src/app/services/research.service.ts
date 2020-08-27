import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiUrl } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResearchService {

  constructor(private http: HttpClient) { }

  getResearchList() {
    return new Promise((resolve, reject) => {
      this.http
        .get(apiUrl + '', {
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
