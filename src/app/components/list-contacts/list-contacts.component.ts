/*
 * Compnent supplies configuration metadata for an Angular component, and OnInit is lifecycle hook that is called after
 * Angular has initialized all data-bound properties of a directive.
 */
import { Component, OnInit } from '@angular/core';

/* provides navigation and URL manipulation capabilities. */
import { Router } from '@angular/router';

import { Contact } from '../../models/contact';
import { ContactDataService } from '../../services/contact-data.service';
import { ConfirmationDialogService } from 'src/app/services/confirmation-dialog.service';

@Component({
  selector: 'app-list-contacts',
  templateUrl: './list-contacts.component.html',
  styleUrls: ['./list-contacts.component.css']
})

export class ListContactsComponent implements OnInit {

  contacts: Contact[ ];
  message: string;

  selectedContact: Contact;

  constructor(private contactService: ContactDataService, private router: Router, 
    private confirmationDialogService: ConfirmationDialogService) { }

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
        this.selectedContact = null;
        this.refreshContacts();
      }
    );
  }// end of deleteContact

  updateContact(id: any) {
    console.log("updateContact");
    console.debug('*** this.selectedContact='+JSON.stringify(this.selectedContact)); 
    this.selectedContact.students = null;
    console.debug('### this.selectedContact='+JSON.stringify(this.selectedContact)); 

    this.contactService.updateContact(id, this.selectedContact).subscribe(
      data => {
        console.debug(data);
        this.message = `Update of contact ${this.selectedContact.contactName} Successfull!`;
      }
    );

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

  onSelect(contact: Contact): void {
    this.selectedContact = contact;
  }

  public openConfirmationDialog() {
    this.confirmationDialogService.confirm('Please confirm..', `Are you sure you want to delete ${this.selectedContact.contactName} profile? All information associated to this user profile will be permanently deleted. This operation can not be undone.`)
    .then((confirmed) => {
      if (confirmed) {
        console.log('User confirmed:', confirmed);
        this.deleteContact(this.selectedContact.contactId);
      } else {
        console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)');
      }
    });//)
    //.catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

}// end of ListContactsComponent class
