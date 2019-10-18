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

  export class GuardienDataService {

    currentUser: User;
    headers: HttpHeaders;

      constructor(private http: HttpClient) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.headers = new HttpHeaders({
            authorization: 'Bearer ' + this.currentUser.token,
            'Content-Type': 'application/json; charset=UTF-8'
      });
    }// end of parameterized constructor

    // This method get all the Guardien
    retrieveAllGuardien( ):Observable<any> {
      return this.http.get<ParentGuard[ ]>(`${API_URL}/api/guardien`, {headers: this.headers});
    } // end of retrieveAllguardiens method

    // This method delete a Guardien
    deleteGuardien(id: any) {
      return this.http.delete(`${API_URL}/api/guardien/${id}`, {headers: this.headers} );
    }// end of deleteGurdien method

    /*
     * This method get one of the guardien by its id number
     */
    retrieveGuardien(id: any) {
      return this.http.get<ParentGuard>(`${API_URL}/api/guardien/${id}`, {headers: this.headers} );
    }// end of retrieveGuardien method

    // Update guardien information form
    updateGuardien(id , Gardien) {
      console.log('=====================> updateGuardien');
      console.log('=====================> ' + id);
      return this.http.put(`${API_URL}/api/guardien/${id}`, ParentGuard, {headers: this.headers});
    }

    // Create a guardieninformation
    createGuardien(guardien) {
      return this.http.post(`${API_URL}/api/Guardien/`, guardien, {headers: this.headers});
    }
  }
