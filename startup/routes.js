const express = require('express');
const app = express();
const errorMiddleware = require('../middleware/error')
const categoriesRoute = require('../routes/categories');
const customersRoute = require('../routes/customers');
const coursesRoute = require('../routes/courses');
const enrollmentsRoute = require('../routes/enrollments')
const usersRoute = require('../routes/users');
const authRoute = require('../routes/auth')
module.exports = function (app) {
    app.use(express.json());
    app.use('/api/categories', categoriesRoute);
    app.use('/api/customers', customersRoute); //saytda customersga kelgan surovlarni hammasini customers faylda bajarib shu use orqali uzatiladi
    app.use('/api/courses/', coursesRoute);
    app.use('/api/enrollments', enrollmentsRoute)
    app.use('/api/users', usersRoute)
    app.use('/api/auth', authRoute)
    app.use(errorMiddleware)
}