import { NgModule } from '@angular/core';
import { Router, Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DetailComponent } from './components/detail/detail.component';
import { AdminComponent } from './components/admin/admin.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';

import { AuthGuard } from './guards/auth.guard';

import { Role } from './models/role';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ErrorComponent } from './components/error/error.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ListStudentsComponent } from './components/list-students/list-students.component';
import { StudentComponent } from './components/student/student.component';
import { ContactComponent } from './components/contact/contact.component';
import { ListContactsComponent} from './components/list-contacts/list-contacts.component';
import { ParentGuard} from './models/parent.guard';
import { ListGuardiansComponent } from './components/list-guardians/list-guardians.component';
import { GuardianComponent } from './components/guardian/guardian.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { StudentDetailsComponent } from './components/student-details/student-details.component';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';

import { MainComponent } from './components/main/main.component';
import { MyTestsComponent } from './components/mytests/my-tests/my-tests.component';

const routes: Routes = [

// public pages
{ path: '', redirectTo: 'main', pathMatch: 'full'},

{ path: 'main', component: MainComponent},

{ path: 'login', component: LoginComponent},

{ path: 'register', component: RegisterComponent},

// admin+user
{ path: 'studentstepper', component: StepperComponent, canActivate: [AuthGuard], data: {roles: [Role.ADMIN, Role.USER]} },

{ path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], data: {roles: [Role.ADMIN, Role.USER]} },

{ path: 'detail/:id', component: DetailComponent, canActivate: [AuthGuard], data: {roles: [Role.ADMIN]} },

{ path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: {roles: [Role.ADMIN]} },

{ path: 'welcome', component: WelcomeComponent, canActivate: [AuthGuard], data: {roles: [Role.ADMIN, Role.USER]} },

{ path: 'welcome/:name', component: WelcomeComponent, canActivate: [AuthGuard], data: {roles: [Role.ADMIN, Role.USER]} },

{ path: 'students', component: ListStudentsComponent, canActivate: [AuthGuard], data: {roles: [Role.ADMIN, Role.USER]} },

{ path: 'students/:id', component: StudentComponent, canActivate: [AuthGuard], data: {roles: [Role.ADMIN, Role.USER]} },

{ path: 'contacts', component: ListContactsComponent, canActivate: [AuthGuard], data: {roles: [Role.ADMIN, Role.USER]} },

{ path: 'contacts/:id', component: ContactComponent, canActivate: [AuthGuard], data: {roles: [Role.ADMIN, Role.USER]} },

{ path: 'guardians', component:  ListGuardiansComponent, canActivate: [AuthGuard], data: {roles: [Role.ADMIN, Role.USER]} },

{ path: 'studentdetails/:id', component:  StudentDetailsComponent, canActivate: [AuthGuard], data: {roles: [Role.ADMIN, Role.USER]} },

{ path: 'contactdetails/:id', component: ContactDetailsComponent, canActivate: [AuthGuard], data: {roles: [Role.ADMIN, Role.USER]} },

{ path: 'tests', component: MyTestsComponent, canActivate: [AuthGuard], data: {roles: [Role.ADMIN]} },

{ path: 'guardian/:id', component: GuardianComponent, canActivate: [AuthGuard], data: {roles: [Role.ADMIN, Role.USER]} },

{ path: 'logout', component: LogoutComponent, canActivate: [AuthGuard], data: {roles: [Role.ADMIN, Role.USER]} },


// public pages
{ path: '404', component: NotFoundComponent},
{ path: '401', component: UnauthorizedComponent},
{ path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
constructor(private router: Router) { this.router.errorHandler = (error: any) => {this.router.navigate(['/404']); }; }
}
