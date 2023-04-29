require('express-async-errors');
const { transport } = require('winston')
require('winston-mongodb')
module.exports = function(){
winston.add(new winston.transports.Console());
winston.add(new winston.transports.File({ filename: 'logs/vd-logs.log',level:'error' }));
winston.add(new winston.transports.MongoDB({db: 'mongodb://127.0.0.1:27017/virtualdars-logs',level:'info'}))

//protsess bu event emettir bulib
//catch ilib ololmagan xatoni unkodieksepshin ilib oladi
// process.on('uncaughtException',ex =>{
//     winston.error(ex.message,ex);
// });


//winstonning exception metodi orqalli ham ilib olishimiz mumkin
//buning uchun exception metodining handel funksiyasiga transport berib yuboramiza
winston.exceptions.handle( new winston.transports.Console(),new winston.transports.File({ filename: 'logs/vd-logs.log',level:'error' }))

//endi esa promis reject bulganda xatoni ilib oladigab unhandlengreject
//metodini ishlatamiz
//yuqoridagi kod promes reject bulganida xatoni ilib olomagani sabsbli
//processning unhandelreject metodidan foydalanimiz
process.on('unhandledRejection',ex=>{
    throw ex;
})};




