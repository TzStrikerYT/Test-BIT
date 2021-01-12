import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { CourseService } from "../../services/course.service";
import { CourseComponent } from '../course/course.component'
import { Course } from '../../models/course'
import { formatCurrency } from '@angular/common';



@Component({
  selector: 'app-admin-create-course',
  templateUrl: './admin-create-course.component.html',
  styleUrls: ['./admin-create-course.component.css']
})
export class AdminCreateCourseComponent implements OnInit {

  constructor(public courseService: CourseService) { }

  ngOnInit(): void {
  }

  emptyControl() {
    console.log('action')
  }

  cleanForm(form: NgForm) {
    form.reset()
  }

  //create and update
  addCourse(form: NgForm) {
    if (form.value._id) {
      this.courseService.putCourse(form.value).subscribe(
        res => {
          form.reset()
          alert('Curso Actualizado')
          this.getCourses()
        },
        err => {
          console.error(err)
          alert('Revisa que los campos sean correctos')
        }
      );
    } else {
      this.courseService.createCourse(form.value).subscribe(
        res => {
          form.reset()
          alert('Curso Creado')
          this.getCourses()
        },
        err => {
          console.error(err)
          alert('Revisa que los campos sean correctos')
        }
      );
    }
  }

  getCourses() {
    this.courseService.getCourses().subscribe(
      res => {
        console.log(res)
        this.courseService.courses = res;
      },
      err => console.error(err)
    )
  }
}
