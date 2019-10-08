/* Import diffent classes from @angular library */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { ListStudentsComponent } from './components/list-students/list-students.component';
import { StudentComponent } from './components/student/student.component';
import { SignupComponent } from './components/signup/signup.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DetailComponent } from './components/detail/detail.component';
import { AdminComponent } from './components/admin/admin.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { ContactComponent } from './components/contact/contact.component';
import { ListContactsComponent } from './components/list-contacts/list-contacts.component';
import { Guardien } from './models/Guardien';
import { GuardienComponent } from './components/guardien/guardien.component';
import { ListGuardiensComponent } from './components/list-guardiens/list-guardiens.component';
import { StepperComponent } from './components/stepper/stepper.component';

import { CdkStepperModule } from '@angular/cdk/stepper';

import { 
  MatStepperModule,
  MatSelectModule, 
  MatButtonModule, 
  MatInputModule, 
  MatListModule, 
  MatGridListModule,
  MatAutocompleteModule,
  MatIconModule
} from '@angular/material';

import {MatDatepickerModule} from '@angular/material/datepicker';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    MenuComponent,
    LoginComponent,
    LogoutComponent,
    ErrorComponent,
    FooterComponent,
    ListStudentsComponent,
    StudentComponent,
    SignupComponent,
    RegisterComponent,
    ProfileComponent,
    DetailComponent,
    AdminComponent,
    NotFoundComponent,
    UnauthorizedComponent,
    ContactComponent,
    ListContactsComponent,
    GuardienComponent,
    ListGuardiensComponent,
    StepperComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatAutocompleteModule,
    BrowserAnimationsModule,
    MatListModule,
    MatGridListModule,
    MatIconModule,
    MatDatepickerModule,
    HttpClientModule
  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpIntercepterBasicAuthService, multi: true }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule { }
