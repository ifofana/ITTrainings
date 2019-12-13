import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Student } from '../../models/student';
import { StudentDataService } from '../../services/student-data.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Role } from 'src/app/models/role';

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html'
})
export class ListStudentsComponent implements OnInit {

  currentUser: User;

  students: Student[];

  message: string;

  constructor(private userService: UserService, 
    private studentService: StudentDataService, 
    private router: Router) {
      this.userService.currentUser.subscribe(data => {
        this.currentUser = data;
      });
   }

  ngOnInit() {
    this.refreshStudents();
  }

  refreshStudents() {
    this.studentService.retrieveAllStudents().subscribe(
      response => {
        console.log(response);
        this.students = response;
      }
    );
  }

  deleteStudent(id: any) {
    console.log(`delete student ${id}`);
    this.studentService.deleteStudent(id).subscribe(
      response => {
        console.log(response);
        this.message = `Delete of student ${id} Successfull!`;
        this.refreshStudents();
      }
    );
  }

  updateStudent(id: any) {
    console.log(`update ${id}`);
    this.router.navigate(['contacts', id]);
  }

  addStudent() {
    console.log('Go to Student Form');
    //this.router.navigate(['studentstepper']);
    this.router.navigate(['contacts', -1]);

  }

  viewStudentDetails(student: Student) {
    console.log('Go to StudentDetailsComponent');
    localStorage.setItem("detailStudent", JSON.stringify(student));
    this.router.navigate(['/studentdetails', student.studentId]);

  }

  get isAdmin( ) {
    return this.currentUser && this.currentUser.role === Role.ADMIN;
  }
  
}
