import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';

/**
 * @title Stepper that displays errors in the steps
 */
@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
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

  constructor(private _formBuilder: FormBuilder) { }

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
      emailCtrl: ['', Validators.required]
    });
  }

  // When isShown flag is true then the onChkChange be tell the text area to be seen
  onChkChange() {
    console.log('Checked value changed.');
    this.isShown = ! this.isShown;
  }
}

export class DatepickerStartViewExample {
  startDate = new Date(1990, 0, 1);
}
