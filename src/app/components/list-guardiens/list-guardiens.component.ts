import { Component, OnInit } from '@angular/core';
import { Guardien } from 'src/app/models/Guardien';
import { Router } from '@angular/router';
import { GuardienDataService } from 'src/app/services/guardien.services';

@Component({
  selector: 'app-list-guardiens',
  templateUrl: './list-guardiens.component.html',
  styleUrls: ['./list-guardiens.component.css']
})
export class ListGuardiensComponent implements OnInit {
guardiens:Guardien[];
message:string;
  constructor(private guardienService:GuardienDataService, private router :Router) { }

  ngOnInit() {this.refreshGurdiens();}

refreshGurdiens() {
  this.guardienService.retrieveAllGuardien().subscribe(
    response => {
      console.log(response);
      this.guardiens = response;
}
  );

}
deleteGuardien(id: any) {
  console.log(`delete guardien ${id}`);
  this.guardienService.deleteGuardien(id).subscribe(
    response => {
      console.log(response);
      this.message = `Delete of guardien ${id} Successfull!`;
      this.refreshGurdiens();
    }
  );
}// end of deleteGuardien

updateGuardien(id: any) {
  console.log(`update ${id}`);
  this.router.navigate(['guardiens', id]);
}// end of updateGuardien method

addGuardien( ) {
  console.log('Go to Guardien Form');
  this.router.navigate(['guardiens', -1]);
}// end of addGuardien method


}// end of ListGuardiensComponent class
