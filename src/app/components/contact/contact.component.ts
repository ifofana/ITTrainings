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

  data = {
    cities: [
      {
        city: "",
        addressLines: [
          {
            addressLine: "",
          }
        ]
      }
    ]
  }

  myForm: FormGroup;

  constructor(private fb: FormBuilder, private contactService: ContactDataService, private route: ActivatedRoute, private router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.myForm = this.fb.group({
      name: [''],
      cities: this.fb.array([])
    })

    this.setCities();
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

  addNewCity() {
    let control = <FormArray>this.myForm.controls.cities;
    control.push(
      this.fb.group({
        city: [''],
        addressLines: this.fb.array([])
      })
    )
  }

  deleteCity(index) {
    let control = <FormArray>this.myForm.controls.cities;
    control.removeAt(index)
  }

  addNewAddressLine(control) {
    control.push(
      this.fb.group({
        addressLine: ['']
      }))
  }

  deleteAddressLine(control, index) {
    control.removeAt(index)
  }

  setCities() {
    let control = <FormArray>this.myForm.controls.cities;
    this.data.cities.forEach(x => {
      control.push(this.fb.group({ 
        city: x.city, 
        addressLines: this.setAddressLines(x) }))
    })
  }

  setAddressLines(x) {
    let arr = new FormArray([])
    x.addressLines.forEach(y => {
      arr.push(this.fb.group({ 
        addressLine: y.addressLine 
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

}// end of ContactComponent class
