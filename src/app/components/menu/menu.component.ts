import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../service/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isUserLoggedIn = false;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
  this.isUserLoggedIn = this.authenticationService.isUserLoggedIn();
  }

}
