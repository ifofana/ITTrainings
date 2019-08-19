import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../service/authentication.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	user: User = new User();
	errorMessage: string;

	constructor(
		private userService: UserService,
		private router: Router
	) {
				
	}

	ngOnInit() {
		if(this.userService.currentUserValue) {
			//this.router.navigate(['/profile']);
			this.router.navigate(['/welcome'])
			return;
		}
	}

	login() {	
		this.userService.login(this.user)
			.subscribe(
				data => {
					console.log(data)
					console.log('Token=' + this.user.token);
					//this.router.navigate(['/profile'])
					this.router.navigate(['/welcome'])
				},
				error => {
					console.log(error)
					this.errorMessage = "Username or password is incorrect"
				}
			)
	}

}
