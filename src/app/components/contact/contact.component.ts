import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ContactDataService } from '../../services/contact-data.service';
import { Contact } from '../../models/contact';
import { User } from 'src/app/models/user';
import { Student } from 'src/app/models/student';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  //id: number;
  contact: Contact;
  currentUser: User;

  // Flag for the text area, default is hidden
  //isShown = false;

  public myForm: FormGroup;

  constructor(private _fb: FormBuilder, private contactService: ContactDataService, private route: ActivatedRoute, private router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }// end of parameterized constructor

  ngOnInit() {
    //this.id = this.route.snapshot.params.id;
    //console.log('id is ' + this.id);
    // Declare and create new object of Contact class
    this.contact = new Contact();
    // if (this.id !== -1) {
    //   this.contactService.retrieveContact(this.id).subscribe(
    //     data => this.contact = data
    //   );
    // }// end of if statement
    this.myForm = this._fb.group({
      contactName: ['', [Validators.required, Validators.minLength(5)]],
      contactRelationshipToStudent: ['', [Validators.required, Validators.minLength(3)]],
      contactPhoneNumber: ['', Validators.required],
      contactAltPhoneNumber: [''],
      contactEmail: ['', [Validators.required, Validators.pattern(/[^@]+@[^\.]+\..+/)]],
      contactAltEmail: [''],
      students: this._fb.array([
        this.initStudent(),
      ])
    });
  }// end of ngOnInit method

  initStudent() {
    return this._fb.group({
      firstName: ['', Validators.required],
      middlename: [''],
      lastName: ['', Validators.required],
      gender: [''],
      dob: [''],
      age: [''],
      allerges: [''],
      classDay: [''],
      classSelection: [''],
      //isShown: false,
      parentGuardians: this._fb.array([
        this.initParentGuardian()
      ])
    });
  }

  initParentGuardian() {
    return this._fb.group({
      pgName: ['', Validators.required],
      pgAddressOne: ['', Validators.required],
      pgAddressTwo: [''],
      pgCity: ['', Validators.required],
      pgState: ['', Validators.required],
      pgZipCode: ['', Validators.required],
      pgPhoneNumber: ['', Validators.required],
      pgAltPhoneNumber: [''],
      pgEmail: ['', Validators.required],
      pgAltEmail: [''],
      pgRelationshipToStudent: ['', Validators.required]
    })
  }

  addStudent() {
    const control = <FormArray>this.myForm.controls['students'];
    control.push(this.initStudent());
  }

  removeStudent(i: number) {
    console.log('removeStudent('+i+')');
    const control = <FormArray>this.myForm.controls['students'];
    control.removeAt(i);
  }

  addParentGuardian(student): void {
    const control = <FormArray>student.controls['parentGuardians'];
    control.push(this.initParentGuardian());
  }

  removeParentGuardian(student, j: number) {
    console.log('removeParentGuardian('+j+')');
    const control = <FormArray>student.controls['parentGuardians'];
    control.removeAt(j);
  }

  save(formData) {
    console.log(formData.value);
    this.contact.contactName = this.myForm.get('contactName').value;
    this.contact.contactRelationshipToStudent = this.myForm.get('contactRelationshipToStudent').value;
    this.contact.contactPhoneNumber = this.myForm.get('contactPhoneNumber').value;
    this.contact.contactAltPhoneNumber = this.myForm.get('contactAltPhoneNumber').value;
    this.contact.contactEmail = this.myForm.get('contactEmail').value;
    this.contact.contactAltEmail = this.myForm.get('contactAltEmail').value;
    console.log('*** this.myForm.value='+this.myForm.value); 

    console.log('NAME OF CONTACT=' + this.contactName.value);
    console.log('STUDENTS LIST=' + this.studentsArray.value);
    
    // for (var i = 0, len = this.studentsArray.length; i < len; i++) {
    //   console.log('this.studentsArray[' + i + ']=' + this.studentsArray[i]);
    //   for (var j = 0, jlen = this.myForm.controls.students[i].parentGuardians.length; j < jlen; j++) {
    //     console.log('this.studentsArray[' + i + '].parentGuardians[' + j + ']=' + this.studentsArray[i].parentGuardians[j]);
    //   }
    // }

    this.contactService.createContact(formData.value).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['students']);
      }
    );
  }

  saveContact() {
    //if (this.id === -1) {
      console.log(' ************* create Contact! ');
      this.contactService.createContact(this.contact).subscribe(
        data => {
          console.log(data);
          this.router.navigate(['contacts']);
        }
      );
    // } else {
    //   this.contactService.updateContact(this.id, this.contact).subscribe(
    //     data => {
    //       console.log(data);
    //       this.router.navigate(['contacts']);
    //     }
    //   );
    // }// end of else statement
  }// end of saveContact method

  // When isShown flag is true then the toggleShow be tell the text area to be seen
  // toggleShow() {
  //   this.isShown = !this.isShown;
  // }

  get contactName(): any { return this.myForm.get('contactName');}

  get studentsArray(): FormArray {
    return this.myForm.controls.students as FormArray;
  }

}// end of ContactComponent class
