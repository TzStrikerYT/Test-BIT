import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service'
import { Course } from '../../models/course'

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  constructor(public courseService: CourseService) { }

  ngOnInit(): void {
    this.getCourses()
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

  deleteCourse(id: string) {
    const res = confirm('¿Estas seguro que deseaes Eliminar este elemento?')
    if (res) {
      this.courseService.deleteCourse(id).subscribe(
        res => this.getCourses(),
        err => console.error(err)
        )
    }
  }

  editCourse(course: Course) {
    this.courseService.selectedCourse = course
  }

}
