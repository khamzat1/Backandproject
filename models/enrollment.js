const Joi = require('joi')
const mongoose =  require('mongoose')


const Enrollment = mongoose.model('Enrollment',new mongoose.Schema({
    customer:{
        type: new mongoose.Schema({
            name:{
                type: String,
                require:true,
                minlength:3,
                maxlength:50
            }
        }),
        required:true
    },
    course:{
        type: new mongoose.mongoose.Schema({
            title:{
                type:String,
                require:true,
                trim:true,
                minlength:5,
                maxlength:235
            }
        }),
        required:true
    },

    dateStart:{
        type:Date,
        required:true,
        default:Date.now
    },
    courseFee:{
        type:Number,
        min:0
    }
}));

function validateEnrollment(enrollment){
    const schema = Joi.object().keys({
        customerId: Joi.string().required(),
        courseId: Joi.string().required()
    });
    return Joi.validate(enrollment,schema)
}

exports.Enrollment = Enrollment;
exports.validate = validateEnrollment;  