/* Import classes from angular packages */
import { Component } from '@angular/core';
import { Router } from '@angular/router';

/* Import UserService class from services/user.service package */
import { UserService } from './services/user.service';

/* Import classes from models directory */
import { User } from './models/user';
import { Role } from './models/role';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'IITrainings';
  

  constructor(private userService: UserService, private router: Router) {
    
  }

  

} // end AppComponent class
