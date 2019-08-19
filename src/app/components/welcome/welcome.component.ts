import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WelcomeDataService } from '../../service/data/welcome-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

	message = 'Some Welcome Message'
	welcomeMessageFromService = ''
	name = ''

  constructor(private route : ActivatedRoute, private service: WelcomeDataService) { }

  ngOnInit() {
	  this.name = this.route.snapshot.params['name'];
  }

  getWelcomeMessage() {
	//console.log(this.service.executeHelloWorldBeanService());

	 this.service.executeHelloWorldBeanService().subscribe(
		 response => this.handleSuccessfulResponse(response),
		 error => this.handleErrorResponse(error)
	 );

	 console.log('last line of getwelcome message');
  }

  getWelcomeMessageWithParmeter() {
	//console.log(this.service.executeHelloWorldBeanService());

	 this.service.executeHelloWorldBeanServicePathVariable(this.name).subscribe(
		 response => this.handleSuccessfulResponse(response),
		 error => this.handleErrorResponse(error)
	 );

	 console.log('last line of getwelcome message');
  }

  handleSuccessfulResponse(response){
	//this.welcomeMessageFromService = response.message;
	console.log(response);
	console.log(response.message);
	this.welcomeMessageFromService = response.message;
  }

  handleErrorResponse(error){
	console.log(error);
	console.log(error.error);
	console.log(error.error.message);
	this.welcomeMessageFromService = error.error.message;
  }

}
