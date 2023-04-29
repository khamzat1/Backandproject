const winston = require('winston')
//winston loglarnihamma joyga yozishi mumkin bu holat tranport deyiladi
//transport sifatida consol file http protokolida ishlab turgan birorta protokol nazarda tutiladi
//yana qushinch hoalatda mongodbga couchdbga redis va logglyga yozihsga yordam beradi
//loggly bu loglarni boshqarish va analiz qilish uchun ishlatiladiga obyektdir
require('express-async-errors')

module.exports = function (err, req, res, next) {
    winston.info('error', err)
    res.status(500).send('severdan kutilmagan xatolik')
}
//winstonning 6ta metodi mavjud bulib 
//error,warn,info,verbose,debug,silly
//debug dastur qanaqa ishlayotganini aniqlash uchun
//silly logga hamma narsa yoziladi
