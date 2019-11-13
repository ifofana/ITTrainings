import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/models/student';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
  studentId: string;
  currentStudent: Student;

  /***
   * select st.student_first_name, st.student_last_name,
        ci.contact_name, pg.pg_name
      from student_info st 
          join parentguard_info pg on pg.pg_id = st.parentguard_id
          join contact_info ci on ci.contact_id = st.contact_id
      where st.student_id = 1;
  ***/

  constructor(private router: Router, private route: ActivatedRoute) {
    this.currentStudent = JSON.parse(localStorage.getItem('detailStudent'));
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.studentId = params.get('id');
      }
    })

  }
}
