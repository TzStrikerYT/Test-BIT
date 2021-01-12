const express = require('express');
const bodyParser = require('body-parser');
const coursesApiRouter = require('./routes/courses');
const usersApiRouter = require('./routes/users');
const authApiRouter = require('./routes/auth')
const passport = require('passport');
const cors = require('cors')
require('./connections/mongodb_connection');

const app = express();

//CORS
app.use(cors())

// Helpers
app.use(bodyParser.json());
app.use(passport.initialize());

// Routes for courses
app.use('/api/courses', coursesApiRouter);
app.use('/api/users', usersApiRouter);
app.use('/api/auth', authApiRouter);

const server = app.listen(8080, () => {
    console.log(`The server are running in http://localhost:${server.address().port}`)
})