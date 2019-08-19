import { Component, OnInit } from '@angular/core';
import { StudentDataService } from '../services/student-data.service';
import { Router } from '@angular/router';
import { Student } from '../models/student';

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.css']
})
export class ListStudentsComponent implements OnInit {

  students: Student[]

  message: string

  courseId = 3

  constructor(private studentService: StudentDataService, private router: Router) { }

  ngOnInit() {
    this.refreshStudents();
  }

  refreshStudents() {
    this.studentService.retrieveAllStudents().subscribe(
      response => {
        console.log(response);
        this.students = response;
      }
    )
  }

  deleteStudent(id) {
    console.log(`delete student ${id}`);
    this.studentService.deleteStudent(id).subscribe(
      response => {
        console.log(response);
        this.message = `Delete of Student ${id} Successfull!`;
        this.refreshStudents();
      }
    );
  }

  updateStudent(id) {//path: 'students/:id/:courseId'
		console.log(`update ${id}`);
		this.router.navigate(['students',id,3]);//course id is 3
	}

	addStudent(courseId) {//path: 'students/:id/:courseId'
		this.router.navigate(['students',-1,courseId]);
  }

}
