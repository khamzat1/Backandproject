const express = require('express');
const bcrypt = require('bcrypt')
const Joi = require('joi')
const mongoose = require('mongoose');
const router = express.Router()
const { User } = require('../models/user')
const _ = require('lodash')




router.post('/', async (req, res) => {
    //const { error } = validate(req.body);
    //  if (error) return res.status(400).send(error.details[0].message);
    //if (!req.body.password) return res.status(400).send("Password is required..");

    let user = await User.findOne({ email: req.body.email })
    if (!user)
        return res.status(400).send('notugri email yoki parol')
    //foydalanuivchidan kelgan parolni bazadagi salt qilingan parol bilan tekshirish uchun
    //bcrypting compear degan metodidan foydalanimiza
    const isValidPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isValidPassword)
        return res.status(400).send('notugri email yoki parol')

    const token = user.generateAuthToken();
    //sign bu jsonwebtokinning metodi bulib 
    //bu metod ikkita metod qabul qiladi 
    //1-payload frontendga qaytariladigan malumot 
    //2-secret bulib bu jsonwebtoken malumotlarini maxfiylash yani shefrovka qilishga ishlatiladi

    res.header('x-auth-token', token).send(true)
    //tokenni biz respons bodysida emas headerda qaytaramiza
    //headerning ichiga custom parameter joylashga ikkita metod beriladi
    //1chisi headerning nomi 2chisi headerning qiymati
    //custom headerlarning x- dan boshlanishi kerak

});

//bu token frontentga nimaga kerak deganda buining sababi backand qaytarib bergan bu tokenni 
//va bundan buyogiga backdga junatiladigan xarqandey surovning headeriga usha olingan tokenni qushib junatish kerak buladi
//va backandan kelgan har qandey surovni headerni jsonwebtoken borligini va valed ekanliogini tekshiradi
//keyin qaysi routga surov junatsa ham usha webtokenni qushib junatishi kerak buladi aks xolda unga xato qaytadi


function validate(req) {  
    const schema = Joi.object().keys({
        name: Joi.string().min(3).required(),
        email: Joi.string().min(3).required(),
    })


    return Joi.object().keys(validate(req, schema))
}


module.exports = router
