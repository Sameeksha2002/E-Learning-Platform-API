const mongoose = require('mongoose')
const { categorySchema } = require('../Models/categoryModel');
const joi = require('joi')

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength:50
    },
    category: {
        type: categorySchema,
        required: true
    },
    creator: {
        type: String,
        required:true
    },
    rating: {
        type: Number,
        required:true
    }
})
const Course = mongoose.model('Course', courseSchema);

function validateData(course) {
    const schema = {
        title: joi.string().max().min().required(),
        categoryId: joi.string().required(),
        creator: joi.string().min(5).required(),
        rating: joi.number().min(0).required()
    }
    return joi.validate(course, schema);
}

exports.Course = Course;
exports.validate = validateData;
