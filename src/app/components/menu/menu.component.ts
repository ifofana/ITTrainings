import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { Role } from 'src/app/models/role';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  currentUser: User;

  constructor(private userService: UserService, private router: Router) { 
    this.userService.currentUser.subscribe(data => {
      this.currentUser = data;
    });
  }

  ngOnInit() {
  
  }

  logOut( ) {
    this.userService.logOut().subscribe(data => {
      sessionStorage.removeItem('currentUser');
      this.router.navigate(['/login']);
    });
  }

  get isAdmin( ) {
    return this.currentUser && this.currentUser.role === Role.ADMIN;
  }

}
