module.exports = function(req,res,next){
    if(!req.user.isAdmin)
    return res.status(403).send('Murojaat rad etildi')
    next()
}
//surovda yaroqli token bulmasa 401 yani anoturayz qaytariladi
//surovda token bulsayu foydalanuvchida resurni boshqarishda huquqqi bulmas  403 yani forbetten qaytyariladi