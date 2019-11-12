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
import { User } from '../models/user';
import { API_URL } from 'src/app/app.constants';
import { ParentGuard } from '../models/parent.guard';

@Injectable({
    providedIn: 'root'
  })

  export class GuardianDataService {

    currentUser: User;
    headers: HttpHeaders;

      constructor(private http: HttpClient) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.headers = new HttpHeaders({
            authorization: 'Bearer ' + this.currentUser.token,
            'Content-Type': 'application/json; charset=UTF-8'
      });
    }// end of parameterized constructor

    // This method get all the Guardian
    retrieveAllGuardians( ):Observable<any> {
      return this.http.get<ParentGuard[ ]>(`${API_URL}/api/guardians`, {headers: this.headers});
    } // end of retrieveAllGuardians method

    // This method delete a Guardian
    deleteGuardian(id: any) {
      return this.http.delete(`${API_URL}/api/guardians/${id}`, {headers: this.headers} );
    }// end of deleteGurdien method

    /*
     * This method get one of the guardian by its id number
     */
    retrieveGuardian(id: any) {
      return this.http.get<ParentGuard>(`${API_URL}/api/guardians/${id}`, {headers: this.headers} );
    }// end of retrieveGuardian method

    // Update guardian information form
    updateGuardian(id , Gardien) {
      console.log('=====================> updateGuardian');
      console.log('=====================> ' + id);
      return this.http.put(`${API_URL}/api/guardians/${id}`, ParentGuard, {headers: this.headers});
    }

    // Create a guardian
    createGuardian(guardian) {
      return this.http.post(`${API_URL}/api/guardians/`, guardian, {headers: this.headers});
    }
  }
