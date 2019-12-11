/*
 * Compnent supplies configuration metadata for an Angular component, and OnInit is lifecycle hook that is called after
 * Angular has initialized all data-bound properties of a directive.
 */
import { Component, OnInit } from '@angular/core';

/* provides navigation and URL manipulation capabilities. */
import { Router } from '@angular/router';

import { Contact } from '../../models/contact';
import { ContactDataService } from '../../services/contact-data.service';

@Component({
  selector: 'app-list-contacts',
  templateUrl: './list-contacts.component.html',
})

export class ListContactsComponent implements OnInit {

  contacts: Contact[ ];
  message: string;

  constructor(private contactService: ContactDataService, private router: Router ) { }

  // ngOnInit method to handle any additional initialization tasks.
  ngOnInit( ) { this.refreshContacts( ); }

  refreshContacts( ) {
    this.contactService.retrieveAllContacts().subscribe(
      response => {
        console.log(response);
        this.contacts = response;
      }
    );
  }// end of refreshContacts method

  deleteContact(id: any) {
    console.log(`delete contact ${id}`);
    this.contactService.deleteContact(id).subscribe(
      response => {
        console.log(response);
        this.message = `Delete of contact ${id} Successfull!`;
        this.refreshContacts();
      }
    );
  }// end of deleteContact

  updateContact(id: any) {
    console.log(`update ${id}`);
    this.router.navigate(['contacts', id]);
  }// end of updateContact method

  addContact() {
    console.log('Go to Contact Form');
    this.router.navigate(['contacts', -1]);
  }// end of addContact method

  viewContactDetails(c: Contact) {
    console.log('Go to ContactDetailsComponent');
    localStorage.setItem("detailContact", JSON.stringify(c));
    this.router.navigate(['/contactdetails', c.contactId]);
  }


}// end of ListContactsComponent class
