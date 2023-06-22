const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const { Category,validate } = require('../models/category');
const mongoose = require('mongoose');
const routes = require('../startup/routes');


router.get('/',async(req,res)=>{
    //throw new Error('Toifada qanaqadir xato sodir buldi');
    const categories = await Category.find().sort('name');
    res.send(categories); 
   
    //bu try catch mongo db qandedir xolatda ishlamay qolganid aserverdagi xatoni yozib kursatish uchun
    //va bizga error emas balkimuammo haqida malumot beradi
    //promise reject bulganida
    
});

router.post('/',auth,async(req,res)=>{
    const token = req.header('x-auth-token')
    if(!token)
    return req.status(401).send('Token bulmagan sababmurojaat rad etildi')

    //  const { error } = validate(req.body);
    //  if(error)
    //   return res.status(400).send(error.message);
    
     let category = new Category({
        name:req.body.name
     })
     category = await category.save(); 

     res.status(201).send(category);
})

router.get('/:id',async(req,res)=>{
    // const token = req.header('x-auth-token')
    // if(!token)
    // return req.status(401).send('Token bulmagan sababmurojaat rad etildi')
    if(!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(404).send('Yaroqsiz aydi')
    let category = await Category.findById(req.params.id);
    if(!category)
        return res.status(404).send('Berilgan IDteng bulgan toifa topilmadi');

    res.send(category);
});
 
router.put('/:id',auth,async (req,res) => {
    const token = req.header('x-auth-token')
    if(!token)
    return req.status(401).send('Token bulmagan sababmurojaat rad etildi')

    //   const {error} = validate(req.body);
    //   if(error)
    //   return res.status(404).send(error.message);

    let category = await Category.findByIdAndUpdate(req.params.id,{name:req.body.name},{
        new:true
    });

    if(!category)
        return res.status(404).send('Berilgan IDga teng bulgan toifa topilmadi');
     
    res.send(category);
    
});

router.delete('/:id',[auth,admin],async (req,res)=>{
    let category = await Category.findByIdAndRemove(req.params.id);
    if(!category)
    return res.status(400).send('Berilgan IDga teng bulgan toifa topilmadi')

    res.send(category);
})




module.exports = router