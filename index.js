const express = require('express');
const app = express();
const winston = require('winston')
require('./startup/logging')
require('winston-mongodb');
require('./startup/routes')(app)
require('./startup/db')()
require('./startup/config')()

//bu serverdagi promise reject bulgan vaqtda xatoni ushlab oladi
//xar doim midelwearlar va rotehandlarham chaqirilgan qator tartibida ishlaydi



const port = process.env.PORT || 9000;

const server = app.listen(port, () => {
    winston.info(`${port}chi portni eshitishni boshladim...`)
});

module.exports = server