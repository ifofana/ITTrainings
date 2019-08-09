import { NgModule } from '@angular/core';
import { Router, Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DetailComponent } from './components/detail/detail.component';
import { AdminComponent } from './components/admin/admin.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';

import { AuthGuard } from './guards/auth.guard';

import { Role } from './models/role';

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
	//public pages
	{ path: '', redirectTo:'login', pathMatch:'full'},
	{ path: 'login', component: LoginComponent},
	{ path: 'register', component: RegisterComponent},
	//user+admin+student+teacher
	{ path: 'profile', component: ProfileComponent, 
			canActivate: [AuthGuard], 
			data: {roles: [Role.ADMIN, Role.STUDENT]}},
	{ path: 'detail/:id', component: DetailComponent,
			canActivate: [AuthGuard], 
			data: {roles: [Role.ADMIN]}},
	{ path: 'admin', component: AdminComponent,
			canActivate: [AuthGuard], 
			data: {roles: [Role.ADMIN]}},
	//public pages
	{ path: '404', component: NotFoundComponent},
	{ path: '401', component: UnauthorizedComponent},

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
export class AppRoutingModule {
	constructor(private router: Router) {
		//For unknown pages
		this.router.errorHandler = (error: any) => {
			this.router.navigate(['/404']);
		}
	}
 }
