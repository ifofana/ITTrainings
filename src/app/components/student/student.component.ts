import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

import { StudentDataService } from '../../services/student-data.service';
import { Student } from '../../models/student';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  id: number;
  student: Student;

  listGenders = [
    {id: 1, gender: "UnKnown"},
    {id: 2, gender: "Male"},
    {id: 3, gender: "Female"}
  ];
  selectedValue = null;

  listDays = [
    { id: 0, name: "Saturday"},
    { id: 1, name: "Sunday"}
  ];

  listAgeGroup = [
    { id: 0, value: "foundtion", name: "Foundition - 5 & 6 years old"},
    { id: 1, value: "beginner", name: "Beginner - 7 & 8 years old"},
    { id: 2, value: "intermediate", name: "Intermediate - 9 & 10 years old"},
    { id: 3, value: "proficient", name: "Proficient - 11 & 12 years old"},
    { id: 4, value: "advanced", name: "Advanced - 13 & 14 years old"},
    { id: 5, value: "youth", name: "Youth - 15 & 16 years old"},
    { id: 6, value: "adult", name: "Adult - 17 & 18 years old"}
  ];

  isShown: boolean = false; // hidden by default

  toggleShow() {
    this.isShown = ! this.isShown;
  }

  registerStudentForm: FormGroup;
  studentFirstName: any;
  studentMiddleName: any;
  studentLastName: any;
  studentDOB: any;
  studentAge: any;
  studentGender: any;
  studentAllergiesMedicalCondition: any;
  studentClassDay: string;
  studentClassSelection: string;
  submitForm: boolean;

  constructor(private studentService: StudentDataService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
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

  createStudentForm( ) {
    this.registerStudentForm = this.formBuilder.group ({
      firstName:  [' ', [ Validators.required, Validators.pattern('[a-zA-Z ]*') ] ],
      middleName: [' ', [ Validators.required, Validators.pattern('[a-zA-Z ]*') ] ],
      lastName: [' ', [ Validators.required, Validators.pattern('[a-zA-Z ]*') ] ],
      dOB: [' ', Validators.required ],
      age: [' ', Validators.required],
      gender: [' ', Validators.required ],
      allergiesMedicalCondition: [false],
      textArea: [''],
      classDay: [' ', Validators.required],
      classSelection: [' ', Validators.required]
    });
  }// end of createStudentForm method

  // Save the student information when the Save Form button is click and no errors
  saveStudentInformation( ) {
    this.student = new Student( );
    this.student.firstName = this.studentFirstName.value;
    this.student.middleName = this.studentMiddleName.value;
    this.student.lastName = this.studentLastName.value;
    this.student.dob = this.studentDOB.value;
    this.student.age = this.studentAge.value;
    this.student.gender = this.studentGender.value;
    this.student.textArea = this.studentAllergiesMedicalCondition.value;
    this.student.classDay = this.studentClassDay;
    this.student.classSelection = this.studentClassSelection;
    this.submitForm = true;
  }// end of saveStudentInformation method

  // Clear student information form when clear button is clicked and set the flag submitForm to false
  onReset( ) {
    this.submitForm = false;
    this.registerStudentForm.reset( );
  }// end of onReset method

  selectChange( $event) {
    //In my case $event come with a id value
    this.selectedValue = this.listGenders[$event];
  }

  selectDayChange( $event) {
    //In my case $event come with a id value
    this.student.classDay = this.listDays[$event].name;
  }

  selectAgeGroup( $event ) {
    this.student.classSelection = this.listAgeGroup[$event].name;
  }

  saveStudent( ) {
    console.log('Saving student ');
    console.log('this.id = ' + this.id);
    // this.saveStudentInformation();
    console.log('Selected Value=' + this.selectedValue);
    if (this.id === -1) {
      console.log(' ************* create Student! ');
      this.studentService.createStudent(this.student)
      .subscribe(
        data => {
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
  courseId(id: number, student: Student) {
    throw new Error('Method not implemented.');
  }

}
