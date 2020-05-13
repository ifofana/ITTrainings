import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import {map} from 'rxjs/operators';

import { User } from '../models/user';
import { API_URL, AUTHENTICATED_USER } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public currentUser: Observable<User>;
  private currentUserSubject: BehaviorSubject<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User> (JSON.parse(localStorage.getItem(AUTHENTICATED_USER)));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(user: User): Observable<any> {
    const headers = new HttpHeaders(user ? {
      authorization: 'Basic ' + btoa(user.username + ':' + user.password)
    } : { } );

    return this.http.get<any> (API_URL + '/api/user/login', {headers}).pipe(
      map(response => {
        if (response) {
          localStorage.setItem(AUTHENTICATED_USER, JSON.stringify(response));
          this.currentUserSubject.next(response);
        }
        return response;
      })
    );
  }

  logOut( ): Observable<any> {
    return this.http.post(API_URL + '/api/user/logout', {}).pipe(
      map(response => {
        localStorage.removeItem(AUTHENTICATED_USER);
        this.currentUserSubject.next(null);
      })
    );
  }

  register(user: User): Observable<any> {
    return this.http.post(API_URL + '/api/user/registration', JSON.stringify(user),
  {headers: {'Content-Type': 'application/json; charset=UTF-8'}});
  }

  public get isUserLoggedIn( ) {
    const user = sessionStorage.getItem(AUTHENTICATED_USER);
    return !(user === null);
  }

}
