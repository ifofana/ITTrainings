import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Student } from '../../models/student';
import { StudentDataService } from '../../services/student-data.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Role } from 'src/app/models/role';
import { ContactDataService } from 'src/app/services/contact-data.service';
import { Contact } from 'src/app/models/contact';
import { ConfirmationDialogService } from 'src/app/services/confirmation-dialog.service';

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.css']
})
export class ListStudentsComponent implements OnInit {

  currentUser: User;

  students: Student[];

  message: string;

  selectedStudent: Student;

  // Flag for the text area, default is hidden
  isShown = false;

  constructor(private userService: UserService, private contactService: ContactDataService,
    private studentService: StudentDataService, private router: Router,
    private confirmationDialogService: ConfirmationDialogService) {
      this.userService.currentUser.subscribe(data => {
        this.currentUser = data;
      });
   }

  ngOnInit() {
    this.refreshStudents();
  }

  refreshStudents() {
    this.studentService.retrieveAllStudents().subscribe(
      response => {
        console.log(response);
        this.students = response;
      }
    );
  }

  deleteStudent(id: any) {
    console.log(`delete student ${id}`);
    this.studentService.deleteStudent(id).subscribe(
      response => {
        console.log(response);
        this.message = `Delete of student ${id} Successfull!`;
        this.selectedStudent = null;
        this.refreshStudents();
      }
    );
  }

  updateStudent(id: any) {
    console.log("updateStudent");
    console.debug('*** this.selectedStudent='+JSON.stringify(this.selectedStudent)); 
    this.selectedStudent.parentGuardians = null;
    console.debug('### this.selectedStudent='+JSON.stringify(this.selectedStudent)); 
    this.selectedStudent.contact = null;
    this.studentService.updateStudent(id, this.selectedStudent).subscribe(
      data => {
        console.debug(data);
        this.message = `Update of student ${this.selectedStudent.firstName} Successfull!`;
      }
    );

  }// end of updateStudent method

  addStudent() {
    console.log('Go to Student Form');
    //this.router.navigate(['studentstepper']);
    this.router.navigate(['contacts', -1]);

  }

  viewStudentDetails(student: Student) {
    console.log('Go to StudentDetailsComponent');
    localStorage.setItem("detailStudent", JSON.stringify(student));
    this.router.navigate(['/studentdetails', student.studentId]);

  }

  onSelect(s: Student): void {
    this.selectedStudent = s;
    if (this.selectedStudent != null) {
      if (this.selectedStudent.allerges != null) {
        this.isShown = true;
      }
      this.selectedStudent.contact = new Contact();
      this.contactService.retrieveContact(this.selectedStudent.contactId).subscribe(
        data => this.selectedStudent.contact = data
      );
      console.log('TEST......... Contact Name=' + this.selectedStudent.contact.contactName);
    }
  }

  public openConfirmationDialog() {
    this.confirmationDialogService.confirm('Please confirm..', `Are you sure you want to delete ${this.selectedStudent.firstName} ${this.selectedStudent.middlename} ${this.selectedStudent.lastName} profile? All information associated to this user profile will be permanently deleted. This operation can not be undone.`)
    .then((confirmed) => {
      if (confirmed) {
        console.log('User confirmed:', confirmed);
        this.deleteStudent(this.selectedStudent.studentId);
      } else {
        console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)');
      }
    });//)
    //.catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  // When isShown flag is true then the toggleShow be tell the text area to be seen
  toggleShow( ) {
    this.isShown = ! this.isShown;
  }

  get isAdmin( ) {
    return this.currentUser && this.currentUser.role === Role.ADMIN;
  }
  
}
