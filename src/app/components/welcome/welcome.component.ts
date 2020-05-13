import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { Role } from 'src/app/models/role';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-welcome',
	templateUrl: './welcome.component.html',
	styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

	currentUser: User;
	
	message = 'Some Welcome Message';
	welcomeMessageFromService = ' ';
	name = ' ';

	constructor(private userService: UserService, private route: ActivatedRoute) {
		this.userService.currentUser.subscribe(data => {
			this.currentUser = data;
		});
	 }

	ngOnInit() { this.name = this.route.snapshot.params.name; }

	getWelcomeMessage() {

	}

	handleSuccessfulResponse(response) {
		// this.welcomeMessageFromService = response.message;
		console.log(response);
		console.log(response.message);
		this.welcomeMessageFromService = response.message;
	}

	handleErrorResponse(error) {
		console.log(error);
		console.log(error.error);
		console.log(error.error.message);
		this.welcomeMessageFromService = error.error.message;
	}

	get isAdmin( ) {
		return this.currentUser && this.currentUser.role === Role.ADMIN;
	}

}
