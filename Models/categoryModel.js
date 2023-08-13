const mongoose = require('mongoose')
const joi = require('joi')
const categorySchema = new mongoose.Schema({
    name: { type: String, required:true, minlength:3}
})
const Category = mongoose.model('Category', categorySchema);

function validateData(category) {
    const schema = {
        name: joi.string().min(3).required()
    }
    return joi.validate(category, schema)
}

exports.Category = Category;
exports.categorySchema = categorySchema;
exports.validate = validateData;