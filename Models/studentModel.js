const mongoose = require('mongoose')
const joi = require('joi')
const studentSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3 },
    isEnrolled: { type: Boolean, default: false },
    phone: {type: Number, required:true,minlength:10}
})
const Student = mongoose.model('Student', studentSchema);

function validateData(student) {
    const schema = {
        name: joi.string().min(3).max(50).required(),
        phone: joi.string().min(10).max(50).required(),
        isEnrolled: joi.boolean()
    }
    return joi.validate(student, schema)
}

exports.Student = Student
exports.validate = validateData