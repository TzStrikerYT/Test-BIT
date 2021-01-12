const Course = require('../db_modules/courses_schema');

class CoursesService {
    constructor() {
    }

    #formatJsonToSearch(tags, name) {
        let jsonFormat = {};
        if (tags.length > 0 && name) {
            jsonFormat = {'tags': {$in: tags}, 'name': {$regex: '.*' + name + '.*'}};
        } else if (tags.length > 0 && !name) {
            jsonFormat = {'tags': {$in: tags}};
        } else if (tags.length === 0 && name) {
            jsonFormat = {'name': {$regex: '.*' + name + '.*'}}
        } else {
            jsonFormat = undefined;
        }
        return jsonFormat;
    }

    getCourses({ tags, name }) {
        return new Promise((resolve, reject) => {
            const json = this.#formatJsonToSearch(tags, name)
            Course.find(json, (err, document) => {
                if (err) reject(err);
                resolve(document);
            })
        });
    }

    getCoursesById({ courseId }) {
        return new Promise((resolve, reject) => {
           Course.findById(courseId, (err, document) => {
               if (err) reject(err);
               resolve(document);
           })
        });
    }

    createCourse({ course }) {
        return new Promise((resolve, reject) => {
            const newCourse = new Course(course);
            newCourse.save((err, document) => {
                if (err) reject(err);
                resolve(document);
            });
        });
    }

    updateCourse({ courseId, course }) {
        return new Promise((resolve, reject) => {
            Course.updateOne({'_id': courseId}, course, (err, document) => {
                if (err) reject(err);
                resolve(document);
            });
        });
    }

    deleteCourse({ courseId }) {
        return new Promise(((resolve, reject) => {
            Course.deleteOne({'_id': courseId}, (err, document) => {
                if (err) reject(err);
                resolve(document);
            })
        }))
    }
}

module.exports = CoursesService;