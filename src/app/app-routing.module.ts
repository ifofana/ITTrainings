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
import { Guardien} from './models/Guardien';
import { ListGuardiensComponent } from './components/list-guardiens/list-guardiens.component';

const routes: Routes = [

// public pages
{ path: '', redirectTo: 'login', pathMatch: 'full'},

{ path: 'login', component: LoginComponent},

{ path: 'register', component: RegisterComponent},

// admin+user
{ path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], data: {roles: [Role.ADMIN, Role.USER]} },

{ path: 'detail/:id', component: DetailComponent, canActivate: [AuthGuard], data: {roles: [Role.ADMIN]} },

{ path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: {roles: [Role.ADMIN]} },

{ path: 'welcome', component: WelcomeComponent, canActivate: [AuthGuard], data: {roles: [Role.ADMIN, Role.USER]} },

{ path: 'welcome/:name', component: WelcomeComponent, canActivate: [AuthGuard], data: {roles: [Role.ADMIN, Role.USER]} },

{ path: 'students', component: ListStudentsComponent, canActivate: [AuthGuard], data: {roles: [Role.ADMIN, Role.USER]} },

{ path: 'students/:id', component: StudentComponent, canActivate: [AuthGuard], data: {roles: [Role.ADMIN, Role.USER]} },

{ path: 'contacts', component: ListContactsComponent, canActivate: [AuthGuard], data: {roles: [Role.ADMIN, Role.USER]} },

{ path: 'contacts/:id', component: ContactComponent, canActivate: [AuthGuard], data: {roles: [Role.ADMIN, Role.USER]} },

{ path : 'guardien', component:  ListGuardiensComponent ,canActivate:[AuthGuard],data:{roles:[Role.ADMIN,Role.USER]}},

{path  : 'guardien/:id',component: Guardien,canActivate:[AuthGuard],data:{roles:[Role.ADMIN,Role.USER]}},

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
