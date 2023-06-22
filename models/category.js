const Joi = require('joi');
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        require: true,
        minlength:5,
        maxlength:50
    }
});


  function validateCategory(category) {
      const schema = Joi.object().keys({
          name: Joi.string().min(3).max(50).required()
     });

      return Joi.validate(category, schema);
  }

 

const Category = mongoose.model('Category', categorySchema);

exports.Category = Category;
exports.validate = validateCategory;
exports.categorySchema = categorySchema;     

