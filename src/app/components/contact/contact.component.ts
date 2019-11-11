import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(private contactService: ContactDataService, private route: ActivatedRoute, private router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
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
