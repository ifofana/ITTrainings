import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/models/student';
import { ContactDataService } from 'src/app/services/contact-data.service';
import { GuardianDataService } from 'src/app/services/guardian-data.services';
import { Contact } from 'src/app/models/contact';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
  studentId: string;
  currentStudent: Student;
  message: string;

  constructor(private router: Router, private route: ActivatedRoute, 
              private contactService: ContactDataService, private guardianService: GuardianDataService) {
    this.currentStudent = JSON.parse(localStorage.getItem('detailStudent'));
    console.log('this.currentStudent.contactId=' + this.currentStudent.contactId);
    this.currentStudent.contact = new Contact();
    contactService.retrieveContact(this.currentStudent.contactId).subscribe(
      data => this.currentStudent.contact = data
    );
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.studentId = params.get('id');
      }
    })
  }

  refreshGuardians() {
    this.guardianService.retrieveAllGuardians().subscribe(
      response => {
        console.log(response);
        this.currentStudent.parentGuardians = response;
      }
    );
  }

  addGuardian() {
    console.log('Go to Guardian Form');
    this.router.navigate(['guardian', -1]);
  }

  updateGuardian(id: any) {
    console.log(`update ${id}`);
    this.router.navigate(['guardian', id]);
  }

  deleteGuardian(id: any) {
    console.log(`delete guardian ${id}`);
    this.guardianService.deleteGuardian(id).subscribe(
      response => {
        console.log(response);
        this.message = `Delete of guardian ${id} Successfull!`;
        this.refreshGuardians();
      }
    );
  }
}
