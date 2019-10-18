import { Component, OnInit } from '@angular/core';
import { ParentGuard } from 'src/app/models/parent.guard';
import { ActivatedRoute, Router } from '@angular/router';
import { GuardienDataService } from '..//..//services/guardien.services';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-guardien',
  templateUrl: './guardien.component.html',
  styleUrls: ['./guardien.component.css']
})
export class GuardienComponent implements OnInit {
id: number;
guardien: ParentGuard;
currentUser: User;

  constructor(private guardienService: GuardienDataService,
              private route: ActivatedRoute, private router: Router) {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
   }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.guardien = new ParentGuard();
    if (this.id !== -1) {
      this.guardienService.retrieveGuardien(this.id).subscribe(
          data => this.guardien = data
        );
      }
  }
  saveGuardien( ) {
    if (this.id === -1) {
      console.log(' ************* create guardien! ');
      this.guardienService.createGuardien(this.guardien).subscribe(
        (        data: any) => {
          console.log(data);
          this.router.navigate(['guardien']);
        }
      );
    } else {
      this.guardienService.updateGuardien(this.id, this.guardien).subscribe(
        data => {
          console.log(data);
          this.router.navigate(['guardien']);
        }
      );

      }
    }
  }
