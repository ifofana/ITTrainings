import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user: User;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService) { }

  ngOnInit( ) {

    this.user = new User();
  }

  signUpUser() {
    console.log('Sign up user');
    console.log(this.user.id);
    console.log(this.user.username);
    console.log(this.user.password);

    this.userService.register(this.user)
        .subscribe(
          data => {
            console.log(data);
            this.router.navigate(['/login']);
          },
          error => {
            console.log('hmm');
            this.router.navigate(['**']);
          }
        );
  }

}
