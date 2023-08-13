const express = require("express");
const {Student, validate} = require("../Models/studentModel")
const router = express.Router();


//GET METHOD
router.get('/', async (req, res) => {
    const students = await Student.find();
    res.send(students);  
})

//POST METHOD
router.post('/', async(req, res) => {
    const { error } = validate(req.body);
    if (error) res.status(400).send(error.details[0].message);
    else {
        let newStudent = new Student ({
            name: req.body.name,
            isEnrolled: req.body.isEnrolled,
            phone: req.body.phone
        })
        await newStudent.save();
        res.send(newStudent);
    }
})

//PUT METHOD
router.put('/:id', async (req, res) => {
const { error } = validate(req.body);
    if (error) res.status(400).send(error.details[0].message);
    else {
        const student = await Student.findByIdAndUpdate(req.params.id, { name: req.body.name, isEnrolled: req.body.isEnrolled, phone:req.body.phone}, { new: true })
        if (!student) res.status(404).send("The student with ID " + req.params.id + " was not found.");    
        res.send(student);
    }
})

//DELETE METHODS
router.delete('/:id', async (req, res) => {
    const student = await Student.findByIdAndDelete(req.params.id)
    if (!student) res.status(404).send("The student with ID " + req.params.id + " was not found.");
    res.send(student);
})

//GET ELEMENT BY ID Method
router.get('/:id', async (req, res) => {
    const student = await Student.findById(req.params.id);
    if (!student) req.status(404).send("The students with ID " + req.params.id + " was not found.");
    res.send(student);
})




module.exports = router;