const Joi = require('joi');
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({

    name:{
        type:String,
        require: true,
        minlength:5,
        maxlength:50
    },
    isVip:{
        type:Boolean,
        default:false
    },
    phone:{
        type:String,
        require: true,
        minlength:5,
        maxlength:50
    },
    bonusPoints:Number
})

const Customer = mongoose.model('Customer',customerSchema);


function validateCategory(customer){
    const schema = Joi.object().keys({
        name:Joi.string().min(5).max(50).required(),
        isVip:Joi.boolean().required(),
        phone:Joi.string().min(5).max(50).required(),
        bonusPoints:Joi.number().min(0)
    });
    return Joi.valid(customer,schema);
}

exports.Customer = Customer;
exports.validate = validateCategory;