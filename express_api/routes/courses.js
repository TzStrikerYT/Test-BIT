const express = require('express');
const router = express.Router();
const CoursesService = require('../services/courses');

const courseService = new CoursesService()

// /api/courses

router.get('/', async (req, res) => {
    const tagsPatter = /tag*/
    const { name } = req.query;
    const { ...allTags } = req.query;
    const tags = []
    const tagsKeys = Object.keys(allTags).filter(k => tagsPatter.exec(k))
    for (let i in allTags){
        if (tagsKeys.includes(i)) tags.push(allTags[i]);
    }

    await courseService.getCourses({ tags, name })
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({
                data: err,
                message: `Something went wrong searching the courses by tags`
            })
        })
});

router.get('/:courseId', async (req, res) => {
    const { courseId } = req.params;
    await courseService.getCoursesById( { courseId } )
        .then(data => {
            if (data) {
                res.status(200).json({
                    data: data,
                    message: `This is the course that make match with ${courseId} id`
                });
            } else {
                res.status(200).json({
                    data: data,
                    message: `The action has been enacted but the response does not include an entity`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                data: err,
                message: `Something went wrong searching the courses by tags`
            })
        })
});

router.post('/', async (req, res) => {
    const course = req.body;
    await courseService.createCourse( { course } )
        .then(data => {
            res.status(201).json({
                data: data,
                message: `This is the course that you create`
        })})
        .catch(error => {
            res.status(500).json({
                data: error,
                message: `Something went wrong creating the new course`
        })})
});

router.put('/:courseId', async (req, res) => {
    const {courseId} = req.params;
    const course = req.body;
    await courseService.updateCourse({courseId, course})
        .then(data => {
            if (data) {
                res.status(200).json(data);
            } else {
                res.status(204).json({
                    data: data,
                    message: `the action has been enacted but the response does not include an entity`
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                data: error,
                message: `Something went wrong updating the course`
            })
        })
});

router.delete('/:courseId', async (req, res) => {
    const { courseId } = req.params;
    await courseService.deleteCourse( { courseId } )
        .then(data => {
            res.status(200).json({
                data: data,
                message: `The course was deleted successfully`
            });
        })
        .catch(error => {
            res.status(500).json({
                data: error,
                message: `Something went wrong deleting the course`
            });
        })
});

module.exports = router;
