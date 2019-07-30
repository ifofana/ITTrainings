import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from 'src/app/list-courses/list-courses.component';
import { API_URL } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class CourseDataService {

  constructor(private http: HttpClient) { }

  retrieveAllCourses() {
	  return this.http.get<Course[]>(`${API_URL}/training/courses`);
  }

  deleteCourse(id) {
	  return this.http.delete(`${API_URL}/training/courses/${id}`);
  }

  retrieveCourse(id) {
	  return this.http.get<Course>(`${API_URL}/training/courses/${id}`);
  }

  updateCourse(id, course) {
	  return this.http.put(`${API_URL}/training/courses/${id}`, course);
  }

  createCourse(course) {
	  return this.http.post(`${API_URL}/training/courses/`, course);
  }
}
