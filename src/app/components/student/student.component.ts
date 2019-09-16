import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { StudentDataService } from '../../services/student-data.service';
import { Student } from '../../models/student';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html'
})

export class StudentComponent implements OnInit {

  id: number;

  student: Student;

  // Flag for the text area, default is hidden
  isShown = false;

  constructor(private studentService: StudentDataService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit( ) {

    this.id = this.route.snapshot.params.id;

    this.student = new Student( );

    if (this.id !== -1) {
      this.studentService.retrieveStudent(this.id)
        .subscribe(
          data => this.student = data
        );
    }
  }

  // When isShown flag is true then the toggleShow be tell the text area to be seen
  toggleShow( ) {
    this.isShown = ! this.isShown;
  }

  saveStudent( ) {
    console.log('Saving student');

    console.log('this.id = ' + this.id);

    if (this.id === -1) {
      console.log(' ************* create Student! ');

      this.studentService.createStudent(this.student).subscribe(data => {
          console.log(data);
          this.router.navigate(['students']);
        });
    } else {
      this.studentService.updateStudent({ id: this.id, student: this.student })
      .subscribe(
        data => {
          console.log(data);
          this.router.navigate(['students']);
        }
      );
    }
  }

  courseId( ) {
    throw new Error('Method not implemented.');
  }

}
