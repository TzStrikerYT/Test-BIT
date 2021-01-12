import { Component, OnInit } from '@angular/core';
import { CourseService } from "../../services/course.service";

@Component({
  selector: 'app-user-courses',
  templateUrl: './user-courses.component.html',
  styleUrls: ['./user-courses.component.css']
})
export class UserCoursesComponent implements OnInit {

  constructor(public userCourseService: CourseService) { }

  ngOnInit(): void {
    this.getCourses()
  }

  getCourses() {
    this.userCourseService.getCourses().subscribe(
      res => {
        console.log(res)
        this.userCourseService.courses = res;
      },
      err => console.error(err)
    )
  }

}
