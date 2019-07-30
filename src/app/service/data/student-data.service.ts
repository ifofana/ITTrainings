import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from 'src/app/list-students/list-students.component';
import { API_URL } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class StudentDataService {

  constructor(private http: HttpClient) { }

  retrieveAllStudents() {
    return this.http.get<Student[]>(`${API_URL}/training/students`);
  }

  deleteStudent(id) {
    return this.http.delete(`${API_URL}/training/students/${id}`);
  }

  retrieveStudent(id) {
    return this.http.get<Student>(`${API_URL}/training/students/${id}`);
  }

  updateStudent(id, courseId, student) {//http://localhost:8080/training/students/1/courses/1
    console.log('=====================> updateStudent')
    console.log('=====================> ' + id);
    return this.http.put(`${API_URL}/training/students/${id}/courses/${courseId}`, student);
  }

  createStudent(student, courseId) {//http://localhost:8080/training/students/2

    return this.http.post(`${API_URL}/training/students/${courseId}`, student);
  }
}
