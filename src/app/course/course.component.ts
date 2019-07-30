import { Component, OnInit } from '@angular/core';
import { CourseDataService } from '../service/data/course-data.service';
import { Course } from '../list-courses/list-courses.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-course',
	templateUrl: './course.component.html',
	styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

	id: number;
	course: Course;

	constructor(private courseService: CourseDataService, private route: ActivatedRoute, private router: Router) { }

	ngOnInit() {

		this.id = this.route.snapshot.params['id'];

		this.course = new Course(this.id, '', '', new Date(), new Date());

		if (this.id != -1) {
			this.courseService.retrieveCourse(this.id)
				.subscribe(
					data => this.course = data
				)
		}
	}

	saveCourse() {
		if(this.id === -1){
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
