import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { Student } from 'src/app/models/student';
import { StudentDataService } from 'src/app/services/student-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';

/**
 * @title Stepper that displays errors in the steps
 */
@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: false}
  }]
})

export class StepperComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  genderChoices = [
    'Male',
    'Female'
  ];

  dayChoices = [
    'Saturday',
    'Sunday'
  ];

  ageGroupChoices = [
    'Foundition - 5 & 6 years old',
    'Beginner - 7 & 8 years old',
    'Intermediate - 9 & 10 years old',
    'Proficient - 11 & 12 years old',
    'Advanced - 13 & 14 years old',
    'Youth - 15 & 16 years old',
    'Adult - 17 & 18 years old'
  ];

  // Flag for the text area, default is hidden
  isShown = false;

  formSubmitted: boolean = false;

  student: Student;
  currentUser: User;

  constructor(private studentService: StudentDataService, 
    private route: ActivatedRoute, 
    private router: Router,
    private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      middleCtrl: ['', Validators.required],
      lastCtrl: ['', Validators.required],
      genderCtrl: ['', Validators.required],
      dobCtrl: ['', Validators.required],
      ageCtrl: ['', Validators.required],
      alCheckCtrl: ['', Validators.required],
      alergiesCtrl: ['', Validators.required],
      classDayCtrl: ['', Validators.required],
      classSelectionCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      contactFullNameCtrl: ['', Validators.required],
      contactRelationshipToStudentCtrl: ['', Validators.required],
      contactPhoneNumberCtrl: ['', Validators.required],
      contactAltPhoneNumberCtrl: ['', Validators.required],
      contactEmailCtrl: ['', Validators.required],
      contactAltEmailCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      guardianFullNameCtrl: ['', Validators.required],
      guardianAddressOneCtrl: ['', Validators.required],
      guardianAddressTwoCtrl: ['', Validators.required],
      guardianCityCtrl: ['', Validators.required],
      guardianStateCtrl: ['', Validators.required],
      guardianZipCodeCtrl: ['', Validators.required],
      guardianPhoneNumberCtrl: ['', Validators.required],
      guardianAltPhoneNumberCtrl: ['', Validators.required],
      guardianEmailCtrl: ['', Validators.required],
      guardianAltEmailCtrl: ['', Validators.required]
    });

    this.student = new Student( );
  }

  // When isShown flag is true then the onChkChange be tell the text area to be seen
  onChkChange() {
    console.log('Checked value changed.');
    this.isShown = ! this.isShown;
  }

  submit() {
    console.log('submitted');
    console.log(this.firstFormGroup.value);
    console.log(this.secondFormGroup.value);
    console.log(this.thirdFormGroup.value);
    this.formSubmitted = true;
    this.student.firstName = this.firstFormGroup.get('firstCtrl').value;
    this.student.middlename = this.firstFormGroup.get('middleCtrl').value;
    this.student.lastName = this.firstFormGroup.get('lastCtrl').value;
    this.student.gender = this.firstFormGroup.get('genderCtrl').value;
    this.student.dob = this.firstFormGroup.get('dobCtrl').value;
    this.student.age = this.firstFormGroup.get('ageCtrl').value;
    this.student.allerges = this.firstFormGroup.get('alergiesCtrl').value;
    this.student.classDay = this.firstFormGroup.get('classDayCtrl').value;
    this.student.classSelection = this.firstFormGroup.get('classSelectionCtrl').value;
    console.log(' ************* create Student! ');
    this.studentService.createStudent(this.student)
    .subscribe(
      data => {
        console.log(data);
        this.router.navigate(['students']);
      }
    );
  }
}

export class DatepickerStartViewExample {
  startDate = new Date(1990, 0, 1);
}
