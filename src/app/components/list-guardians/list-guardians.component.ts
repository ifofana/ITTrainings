import { Component, OnInit } from '@angular/core';
import { ParentGuard } from 'src/app/models/parent.guard';
import { Router } from '@angular/router';
import { GuardianDataService } from 'src/app/services/guardian-data.services';

@Component({
  selector: 'app-list-guardians',
  templateUrl: './list-guardians.component.html',
  styleUrls: ['./list-guardians.component.css']
})
export class ListGuardiansComponent implements OnInit {

  guardians: ParentGuard[];
  selectedPg: ParentGuard;
  message: string;

  constructor(private guardianService: GuardianDataService, private router: Router) { }

  ngOnInit() { 
    this.refreshGuardians(); 
  }

  refreshGuardians() {
    this.guardianService.retrieveAllGuardians().subscribe(
      response => {
        console.log(response);
        this.guardians = response;
      }
    );

  }
  deleteGuardian(id: any) {
    console.log(`delete guardian ${id}`);
    this.guardianService.deleteGuardian(id).subscribe(
      response => {
        console.log(response);
        this.message = `Delete of guardian ${id} Successfull!`;
        this.selectedPg = null;
        this.refreshGuardians();
      }
    );
  }// end of deleteGuardian

  updateGuardian(id: any) {
    console.log("updateGuardian");
    console.log(`update ${id}`);
    console.log('*** this.selectedPg='+JSON.stringify(this.selectedPg));
    this.guardianService.updateGuardian(id, this.selectedPg).subscribe(
      data => {
        console.log(data);
        this.message = `Update of parent/guardian ${this.selectedPg.pgName} Successfull!`;
      }
    )
  }// end of updateGuardian method

  addGuardian() {
    console.log('Go to Guardian Form');
    this.router.navigate(['guardian', -1]);
  }// end of addGuardian method

  onSelect(pg: ParentGuard): void {
    this.selectedPg = pg;
  }

}// end of ListGuardiansComponent class

