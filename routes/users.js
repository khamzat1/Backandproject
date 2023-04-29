const express = require('express');
const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
const router = express.Router()
const { User, valid, usersSchema, } = require('../models/user')
const _ = require('lodash');
const auth = require('../middleware/auth');

//me pathi bu restful xizmatlarida foydalanuvcining malumotlariuni olishdda ishlatiladi 
router.get('/me',auth,async(req,res)=>{
  const user = await  User.findById(req.user._id).select('-password')
    res.send(user)
})




router.post('/', async (req, res) => {
    // const { error } = valid(req.body);
   //  if (error) return res.status(400).send(error.details[0].message);
    if (!req.body.password) return res.status(400).send("Password is required..");
   
   let user = await User.findOne({email:req.body.email})
   if(user)
    return res.status(400).send('Mavjud bolgan malumot')

   user = new User(_.pick(req.body, ['name', 'email', 'password','isAdmin']))
   //.pick metodi bilan qisqaroq req bodysini yozishimiz mumkin
   const salt = await bcrypt.genSalt()
   user.password = await bcrypt.hash(user.password, salt)

   await user.save();

   res.send(_.pick(user, ['_id', 'name', 'email','isAdmin']))
   //pick metodini yan bir plus tarafi shuki frontendga qaysi malumot kerak bulsa paswordi yoshirgan holat da chiqarib beraoladi 
});


module.exports = router
