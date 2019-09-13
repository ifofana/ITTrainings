/* Import diffent classes from @angular library */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

/* Import HttpIntercepterBasicAuthService class from http-intercepter-basic-auth.service package */
import { HttpIntercepterBasicAuthService } from './service/http/http-intercepter-basic-auth.service';

/* Import different componet classes from user component packages */
import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { MenuComponent } from './components/menu/menu.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ErrorComponent } from './components/error/error.component';
import { FooterComponent } from './components/footer/footer.component';
import { ListCoursesComponent } from './components/list-courses/list-courses.component';
import { CourseComponent } from './components/course/course.component';
import { ListStudentsComponent } from './components/list-students/list-students.component';
import { StudentComponent } from './components/student/student.component';
import { SignupComponent } from './components/signup/signup.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DetailComponent } from './components/detail/detail.component';
import { AdminComponent } from './components/admin/admin.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { ContactInfoComponent } from './components/contact-info/contact-info.component';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    MenuComponent,
    LoginComponent,
    LogoutComponent,
    ErrorComponent,
    FooterComponent,
    ListCoursesComponent,
    CourseComponent,
    ListStudentsComponent,
    StudentComponent,
    SignupComponent,
    RegisterComponent,
    ProfileComponent,
    DetailComponent,
    AdminComponent,
    NotFoundComponent,
    UnauthorizedComponent,
    ContactInfoComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],

  providers: [
     {provide: HTTP_INTERCEPTORS, useClass: HttpIntercepterBasicAuthService, multi: true}
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
