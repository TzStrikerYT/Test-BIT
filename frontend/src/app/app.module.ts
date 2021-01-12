import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { CourseComponent } from './components/course/course.component';
import { HomeComponent } from './components/home/home.component';
import { UserCoursesComponent } from './components/user-courses/user-courses.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminCreateCourseComponent } from './components/admin-create-course/admin-create-course.component';


//Routes for all application
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'admin/create-courses',
    component: AdminCreateCourseComponent
  }
]

@NgModule({
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTabsModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  declarations: [
    AppComponent,
    CourseComponent,
    HomeComponent,
    UserCoursesComponent,
    LoginComponent,
    SignupComponent,
    AdminDashboardComponent,
    AdminCreateCourseComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }