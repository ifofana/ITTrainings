import { Component, OnInit } from '@angular/core';
import { StudentDataService } from '../../services/student-data.service';
import { Student } from '../../models/student';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  id: number;
  courseId: number;
  student: Student;

  constructor(private studentService: StudentDataService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.id = this.route.snapshot.params['id'];
    this.courseId = this.route.snapshot.params['courseId'];

    this.student = new Student();

    if(this.id != -1) {
      this.studentService.retrieveStudent(this.id)
        .subscribe(
          data => this.student = data
        )
    }
  }

  saveStudent() {
    console.log("WHAT US ")
    console.log('this.id = ' + this.id);
    console.log('this.courseId = ' + this.courseId);
    if(this.id === -1) {
      console.log(" ************* create Student! ");
      this.studentService.createStudent(this.student, this.courseId)
      .subscribe(
        data => {
          console.log(data)
          this.router.navigate(['students'])
        }
      )
    }
    else {
      this.studentService.updateStudent(this.id, this.courseId, this.student)
      .subscribe(
        data => {
          console.log(data)
          this.router.navigate(['students'])
        }
      );
    }
  }

}
