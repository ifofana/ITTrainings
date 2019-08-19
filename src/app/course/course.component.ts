import { Component, OnInit } from '@angular/core';
import { CourseDataService } from '../services/course-data.service';
import { Course } from '../models/course';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';

@Component({
	selector: 'app-course',
	templateUrl: './course.component.html',
	styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

	id: number;
	course: Course;
	currentUser: User;

	constructor(private courseService: CourseDataService, private route: ActivatedRoute, private router: Router) { 
		this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
	}

	ngOnInit() {

		this.id = this.route.snapshot.params['id'];

		this.course = new Course();

		if (this.id != -1) {
			this.courseService.retrieveCourse(this.id)
				.subscribe(
					data => this.course = data
				)
		}
	}

	saveCourse() {
		if(this.id === -1){
			console.log('HEY!!!!!!!!!!!!');
			//create Course
			this.courseService.createCourse(this.course)
			.subscribe(
				data => {
					console.log(data)
					this.router.navigate(['courses'])
				}
			)
		}
		else {
			this.courseService.updateCourse(this.id, this.course)
			.subscribe(
				data => {
					console.log(data)
					this.router.navigate(['courses'])
				}
			);
		}
	}

}
