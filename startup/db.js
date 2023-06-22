const mongoose = require('mongoose');
const winston = require('winston');
const config = require('config');

module.exports = function(){ mongoose.set('strictQuery', false);
//mongoose.set('useFindAndModify',false);
mongoose.connect(config.get('db'), { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        winston.debug('mongodbga ulanish xosil qilindi...')
    })}