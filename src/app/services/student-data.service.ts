import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Student } from '../models/student';
import { User } from '../models/user';
import { API_URL } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class StudentDataService {

  currentUser: User;
  headers: HttpHeaders;

    constructor(private http: HttpClient) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.headers = new HttpHeaders({
      authorization: 'Bearer ' + this.currentUser.token,
      'Content-Type': 'application/json; charset=UTF-8'
    });
  }

  retrieveAllStudents( ): Observable<any> {
    return this.http.get<Student[]>(`${API_URL}/api/students`, {headers: this.headers});
  }

  deleteStudent(id) {
    return this.http.delete(`${API_URL}/api/students/${id}`, {headers: this.headers});
  }

  retrieveStudent(id) {
    return this.http.get<Student>(`${API_URL}/api/students/${id}`, {headers: this.headers});
  }

  updateStudent(id, student) {// http://localhost:8080/api/students/1
    console.log('=====================> updateStudent');
    console.log('=====================> ' + id);
    return this.http.put(`${API_URL}/api/students/${id}`, student, {headers: this.headers});
  }

  createStudent(student) {// http://localhost:8080/api/students

    return this.http.post(`${API_URL}/api/students/`, student, {headers: this.headers});
  }
}
