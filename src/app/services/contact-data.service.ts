/* Type of the Injectable metadata. Injectable decorator and metadata. */
import { Injectable } from '@angular/core';

/*
 * This service is available as an injectable class, with methods to perform HTTP requests. Each request method has
 * multiple signatures, and the return type varies based on the signature that is called
 * (mainly the values of observe and responseType). HttpHeaders represents the header configuration options
 * for an HTTP request. Instances should be assumed immutable with lazy parsing.
 */
import { HttpClient, HttpHeaders } from '@angular/common/http';

/*
 * A representation of any set of values over any amount of time.
 * This is the most basic building block of RxJS.
 */

import { Observable } from 'rxjs';

//import { Contact } from 'src/app/models/contact';
import { User } from '../models/user';
import { API_URL } from 'src/app/app.constants';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Injectable({
    providedIn: 'root'
  })

  export class ContactDataService {

    currentUser: User;
    headers: HttpHeaders;

      constructor(private http: HttpClient) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.headers = new HttpHeaders({
            authorization: 'Bearer ' + this.currentUser.token,
            'Content-Type': 'application/json; charset=UTF-8'
      });
    }// end of parameterized constructor

    // This method get all the Contacts
    retrieveAllContacts( ): Observable<any> {
      return this.http.get<FormGroup[ ]>(`${API_URL}/api/contacts`, {headers: this.headers});
    } // end of retrieveAllContacts method

    // This method delete a Contact
    deleteContact(id: any) {
      return this.http.delete(`${API_URL}/api/contacts/${id}`, {headers: this.headers} );
    }// end of deleteContact method

    /*
     * This method get one of the Contact by its id number
     */
    retrieveContact(id: any) {
      return this.http.get<FormGroup>(`${API_URL}/api/contacts/${id}`, {headers: this.headers} );
    }// end of retrieveContact method

    // Update contact information form
    updateContact(id, contact) {
      console.log('>>> Inside createContact service ');
      console.log(contact);
      console.log('>>> DATA printing end.');
      console.log('=====================> updateContact');
      console.log('=====================> ' + id);
      return this.http.put(`${API_URL}/api/contacts/${id}`, contact, {headers: this.headers});
    }

    // Create a contact information
    createContact(contact) {
      console.log('>>> Inside createContact service ');
      console.dir('contact = ' + JSON.stringify(contact));
      console.log('>>> DATA printing end.');
      return this.http.post(`${API_URL}/api/contacts/`, contact, {headers: this.headers});
    }
  }
