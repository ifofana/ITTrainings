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
  guardian: ParentGuard;
  currentUser: User;

  constructor(private guardianService: GuardienDataService,
    private route: ActivatedRoute, private router: Router) {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.guardian = new ParentGuard();
    if (this.id !== -1) {
      this.guardianService.retrieveGuardian(this.id).subscribe(
        data => this.guardian = data
      );
    }
  }

  saveGuardian() {
    if (this.id === -1) {
      console.log(' ************* create guardian! ');
      this.guardianService.createGuardian(this.guardian).subscribe(
        data => {
          console.log(data);
          this.router.navigate(['guardians']);
        }
      );
    } else {
      this.guardianService.updateGuardian(this.id, this.guardian).subscribe(
        data => {
          console.log(data);
          this.router.navigate(['guardians']);
        }
      );

    }
  }
}
