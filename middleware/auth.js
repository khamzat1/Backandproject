const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function auth(req, res, next) {
    const token = req.header('x-auth-token')
    if (!token)
        return res.status(401).send('token bulmagan murojaat rad etildi')

        //tokinning asilliugini tekshirish uchun jsonwebtokenning verify metodidan foydalaniladi
        //verify ikkita parametr qabul qiladi bular token va mahfiy kalit suz
        //bizda qanaqadir xato bulib qolish extimoli sabab xatoni ilib olish uchun try catchdan foydalanamiza
      try{
         const decoded =  jwt.verify(token, config.get('jwtPrivateKey'))
         req.user = decoded
         next()
      }
      catch (ex){
        return res.status(400).send('Yaroqsiz tokin');
      }
       
}


