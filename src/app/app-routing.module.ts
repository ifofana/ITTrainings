import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ErrorComponent } from './error/error.component';
import { ListCoursesComponent } from './list-courses/list-courses.component';
import { LogoutComponent } from './logout/logout.component';
import { RouteGuardService } from './service/route-guard.service';
import { CourseComponent } from './course/course.component';
import { ListStudentsComponent } from './list-students/list-students.component';
import { StudentComponent } from './student/student.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
	{ path: '', component: LoginComponent},//canActivate, RouteGuardService
	{ path: 'login', component: LoginComponent},
	{ path: 'signup', component: SignupComponent},
	{ path: 'welcome', component: WelcomeComponent, canActivate: [RouteGuardService]},
	{ path: 'welcome/:name', component: WelcomeComponent, canActivate: [RouteGuardService]},
	{ path: 'courses', component: ListCoursesComponent, canActivate: [RouteGuardService]},
	{ path: 'students', component: ListStudentsComponent, canActivate: [RouteGuardService]},
	{ path: 'logout', component: LogoutComponent, canActivate: [RouteGuardService]},
	{ path: 'courses/:id', component: CourseComponent, canActivate: [RouteGuardService]},
	{ path: 'students/:id/:courseId', component: StudentComponent, canActivate: [RouteGuardService]},
	
	{ path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
