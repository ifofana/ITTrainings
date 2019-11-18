import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ContactDataService } from '../../services/contact-data.service';
import { Contact } from '../../models/contact';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  id: number;
  contact: Contact;
  currentUser: User;

  // Flag for the text area, default is hidden
  isShown = false;

  data = {
    students: [
      {
        firstName: "",
        middlename: "",
        lastName: "",
        dob: "",
        age: "",
        gender: "",
        allerges: "",
        classSelection: "",
        classDay: "",
        isShown: false,
        parentGuardians: [
          {
            pgName: "",
          }
        ]
      }
    ]
  }

  myForm: FormGroup;

  constructor(private fb: FormBuilder, private contactService: ContactDataService, private route: ActivatedRoute, private router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.myForm = this.fb.group({
      contactName: [''],
      contactRelationshipToStudent: [''],
      contactPhoneNumber: [''],
      contactAltPhoneNumber: [''],
      contactEmail: [''],
      contactAltEmail: [''],
      students: this.fb.array([])
    })

    this.setStudents();
  }// end of parameterized constructor

  ngOnInit( ) {
    this.id = this.route.snapshot.params.id;
    console.log('id is ' + this.id);
    // Declare and create new object of Contact class
    this.contact = new Contact( );

    if (this.id !== -1) {
      this.contactService.retrieveContact(this.id).subscribe(
          data => this.contact = data
        );
    }// end of if statement
  }// end of ngOnInit method

  onSubmit() {
    alert(this.myForm.value);
  }

  addNewStudent() {
    let control = <FormArray>this.myForm.controls.students;
    control.push(
      this.fb.group({
        firstName: [''],
        middlename: [''],
        lastName: [''],
        gender: [''],
        dob: [''],
        age: [''],
        allerges: [''],
        classDay: [''],
        classSelection: [''],
        isShown: false,
        parentGuardians: this.fb.array([])
      })
    )
  }

  deleteStudent(index) {
    let control = <FormArray>this.myForm.controls.students;
    control.removeAt(index)
  }

  addNewParentGuardian(control) {
    control.push(
      this.fb.group({
        pgName: ['']
      }))
  }

  deleteParentGuardian(control, index) {
    control.removeAt(index)
  }

  setStudents() {
    let control = <FormArray>this.myForm.controls.students;
    this.data.students.forEach(x => {
      control.push(this.fb.group({ 
        firstName: x.firstName, 
        middlename: x.middlename,
        lastName: x.lastName,
        gender: x.gender,
        dob: x.dob,
        age: x.age,
        allerges: x.allerges,
        classDay: x.classDay,
        classSelection: x.classSelection,
        isShown: x.isShown,
        parentGuardians: this.setParentGuardians(x) }))
    })
  }

  setParentGuardians(x) {
    let arr = new FormArray([])
    x.parentGuardians.forEach(y => {
      arr.push(this.fb.group({ 
        pgName: y.pgName 
      }))
    })
    return arr;
  }

  saveContact() {
    if (this.id === -1) {
      console.log(' ************* create Contact! ');
      this.contactService.createContact(this.contact).subscribe(
        data => {
          console.log(data);
          this.router.navigate(['contacts']);
        }
      );
    } else {
      this.contactService.updateContact(this.id, this.contact).subscribe(
        data => {
          console.log(data);
          this.router.navigate(['contacts']);
        }
      );
    }// end of else statement
  }// end of saveContact method

  // When isShown flag is true then the toggleShow be tell the text area to be seen
  toggleShow() {
    this.isShown = ! this.isShown;
  }

}// end of ContactComponent class
