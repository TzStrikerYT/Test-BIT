import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  URL_API = 'http://localhost:8080/api/courses'

  selectedCourse: Course = {
    dayTime: '',
    description: '',
    duration: '',
    endDate: '',
    name: '',
    place: '',
    startDate: ''
  };
  courses : Course[];

  constructor(private http: HttpClient) { }

  getCourses() {
    return this.http.get<Course[]>(this.URL_API);
  }

  createCourse(course: Course) {
    return this.http.post(this.URL_API, course);
  }

  deleteCourse(id: string) {
    return this.http.delete(`${this.URL_API}/${id}`)
  }

  putCourse(course: Course) {
    return this.http.put(`${this.URL_API}/${course._id}`, course)
  }
}
