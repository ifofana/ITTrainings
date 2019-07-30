import { Component, OnInit } from '@angular/core';
import { CourseDataService } from '../service/data/course-data.service';
import { Router } from '@angular/router';
import { StudentDataService } from '../service/data/student-data.service';

export class Course {
	constructor(
		public id: number,
		public name : string,
		public description : string,
		public startDate : Date,
		public endDate : Date
	) {

	}
}

@Component({
	selector: 'app-list-courses',
	templateUrl: './list-courses.component.html',
	styleUrls: ['./list-courses.component.css']
})
export class ListCoursesComponent implements OnInit {

	courses: Course[] 

	message: string

	constructor(
		private courseService: CourseDataService,
		private studentService: StudentDataService, 
		private router: Router) { }

	ngOnInit() {
		this.refreshCourses();
	}

	refreshCourses() {
		this.courseService.retrieveAllCourses().subscribe(
			response => {
				console.log(response);
				this.courses = response;
			}
		)
	}

	deleteCourse(id) {
		console.log(`delete course ${id}`);
		this.courseService.deleteCourse(id).subscribe(
			response => {
				console.log(response);
				this.message = `Delete of Course ${id} Successfull!`;
				this.refreshCourses();
			}
		)
	}

	updateCourse(id) {
		console.log(`update ${id}`);
		this.router.navigate(['courses',id]);
	}

	addCourse() {
		this.router.navigate(['courses',-1])
	}

	pickCourseToEnrollIn(c) {
		console.log('course details = ' + c.id + ', ' + c.description);
		this.router.navigate(['students',-1,c.id]);
		//this.studentService.createStudent(null,c.id);
	}
}
