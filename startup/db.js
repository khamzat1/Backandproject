const mongoose = require('mongoose');
const winston = require('winston');
module.exports = function(){ mongoose.set('strictQuery', false);
//mongoose.set('useFindAndModify',false);
mongoose.connect('mongodb://127.0.0.1:27017/nodeproject', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        winston.debug('mongodbga ulanish xosil qilindi...')
    })}