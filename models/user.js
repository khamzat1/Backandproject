const Joi = require('joi')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const config = require('config')




const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minLength: 3,
        maxLength: 50
    },
    email: {
        type: String,
        require: true,
        unique: true,
        minLength: 3,
        maxLength: 50
    },
    password: {
        type: String,
        require: true,
        minLength: 5,
        maxLength: 1024,

    },
    isAdmin: Boolean
})

usersSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'))
    return token;
}


const User = mongoose.model('User', usersSchema)

function validateUsers(users) {
    const schema = Joi.object().keys({
        name: Joi.string().min(3).required(),
        email: Joi.string().min(3).required(),
        password: Joi.string().min(5).max(255).required(),
        isAdmin: Joi.boolean().min(5).max(255).required()
    })


    return Joi.validate(users, schema)
};



exports.User = User
exports.validate = validateUsers
exports.usersSchema = usersSchema;
