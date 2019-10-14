import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { API_URL, AUTHENTICATED_USER } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  currentUser: User;
  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.currentUser = JSON.parse(localStorage.getItem(AUTHENTICATED_USER));
    this.headers = new HttpHeaders({
      authorization: 'Bearer ' + this.currentUser.token,
      'Content-Type': 'application/json; charset=UTF-8'
    });
   }

   findAllUsers(): Observable<any> {
    return this.http.get(API_URL + '/api/admin/all', {headers: this.headers});
  }

}
