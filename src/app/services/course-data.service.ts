import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Course } from '../models/course';
import { User } from '../models/user';
import { API_URL } from 'src/app/app.constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseDataService {

  currentUser: User;
  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.headers = new HttpHeaders({
      authorization: 'Bearer ' + this.currentUser.token,
      "Content-Type":"application/json; charset=UTF-8"
    });
   }

  retrieveAllCourses() : Observable<any> {
	  return this.http.get<Course[]>(`${API_URL}/api/courses`, {headers: this.headers});
  }

  deleteCourse(id) {
	  return this.http.delete(`${API_URL}/api/courses/${id}`, {headers: this.headers});
  }

  retrieveCourse(id) {
	  return this.http.get<Course>(`${API_URL}/api/courses/${id}`, {headers: this.headers});
  }

  updateCourse(id, course) {
	  return this.http.put(`${API_URL}/api/courses/${id}`, course, {headers: this.headers});
  }

  createCourse(course) {
	  return this.http.post(`${API_URL}/api/courses/`, course, {headers: this.headers});
  }
}
