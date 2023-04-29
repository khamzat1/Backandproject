const express = require('express');
const app = express();
require('./startup/logging')
require('winston-mongodb');
require('./startup/routes')(app)
require('./startup/db')()
require('./startup/config')()

//bu serverdagi promise reject bulgan vaqtda xatoni ushlab oladi
//xar doim midelwearlar va rotehandlarham chaqirilgan qator tartibida ishlaydi



const port = process.env.PORT || 5000;

app.listen(port, () => {
    winston.info(`${port}chi portni eshitishni boshladim...`)
}); 
