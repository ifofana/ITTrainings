import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

import { StudentDataService } from '../../services/student-data.service';
import { Student } from '../../models/student';
// import { Gender } from '../../models/gender';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  id: number;

  student: Student;

  // Gender array
  listGender = [
    {id: 0, name: 'Male'},
    {id: 1, name: 'Female'}
  ];

  // List the class day
  listDays = [
    { id: 0, name: 'Saturday'},
    { id: 1, name: 'Sunday'}
  ];

  // List the class selection
  listAgeGroup = [
    { id: 0, value: 'foundtion', name: 'Foundition - 5 & 6 years old'},
    { id: 1, value: 'beginner', name: 'Beginner - 7 & 8 years old'},
    { id: 2, value: 'intermediate', name: 'Intermediate - 9 & 10 years old'},
    { id: 3, value: 'proficient', name: 'Proficient - 11 & 12 years old'},
    { id: 4, value: 'advanced', name: 'Advanced - 13 & 14 years old'},
    { id: 5, value: 'youth', name: 'Youth - 15 & 16 years old'},
    { id: 6, value: 'adult', name: 'Adult - 17 & 18 years old'}
  ];

  // Flag for the text area, default is hidden
  isShown = false;

  constructor(private studentService: StudentDataService,
              private route: ActivatedRoute,
              // private formBuilder: FormBuilder,
              private router: Router) {
                // this.createStudentForm( );
              }

  ngOnInit( ) {

    this.id = this.route.snapshot.params.id;

    this.student = new Student();

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

  selectDayChange($event) {
    // In my case $event come with a id value
    this.student.classDay = this.listDays[$event].name;
  }

  selectAgeGroup($event) {
    this.student.classSelection = this.listAgeGroup[$event].name;
  }

  selectGender($event) {
    this.student.gender = this.listGender[$event].name;
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
      this.studentService.updateStudent(this.id, this.student)
      .subscribe(
        data => {
          console.log(data);
          this.router.navigate(['students']);
        }
      );
    }
  }

  courseId(id: number) {
    throw new Error('Method not implemented.');
  }

}
