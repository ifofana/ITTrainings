import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-welcome',
	templateUrl: './welcome.component.html',
	styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

	message = 'Some Welcome Message';
	welcomeMessageFromService = ' ';
	name = ' ';

	constructor(private route: ActivatedRoute) { }

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

}
