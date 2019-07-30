import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../service/authentication.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	username = ''
	password = ''
	errorMessage = 'Invalid Credentials'
	invalidLogin = false

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private authenticationService : AuthenticationService
	) {
				
	}

	ngOnInit() {
		
	}

	handleLogin() {	
		this.authenticationService.authenticate(this.username, this.password)
			.subscribe(
				data => {
					console.log(data)
					this.router.navigate(['welcome'])
					this.invalidLogin = false
				},
				error => {
					console.log(error)
					this.invalidLogin = true
				}
			)
	}

}
