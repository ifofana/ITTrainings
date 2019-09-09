import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Course } from '../models/course';
import { API_URL } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentDataService {

  constructor(private http: HttpClient) { }

  retrieveStudentEnrollments() {
    return this.http.get<Course[]>(`${API_URL}/training/enrollments`);
  }
}
