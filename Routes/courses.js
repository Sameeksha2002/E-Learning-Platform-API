const express = require('express')
const router = express.Router();
const { Course, validate } = require("../Models/courseModel")
const {Category} = require("../Models/categoryModel")


//GET METHOD
router.get('/', async (req, res) => {
    const courses = await Course.find();
    res.send(courses);  
})

//POST METHOD
router.post('/', async(req, res) => {
    const { error } = validate(req.body);
    if (error) res.status(400).send(error.details[0].message);
    else {
        const category = await Category.findById(req.body.categoryId);
        if (!category) res.status(404).send("Not a category");
        else {
            let newCourse = new Course({
                title: req.body.name,
                category: {
                    _id: category._id,
                    name: category.name
                },
                creator: req.body.creator,
                rating: req.body.rating
            })
            await newCourse.save();
            res.send(newCourse);
        }
    }
})
//PUT METHOD
router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
        if (error) res.status(400).send(error.details[0].message);
        else {
            const category = await Category.findById(req.body.categoryId);
            if (!category) res.status(404).send("Not a category");
            else {
                const course = await Course.findByIdAndUpdate(req.params.id,
                    {
                        title: req.body.name,
                    category: {
                        _id: Category._id,
                        name: cat
                    },
                    creator: req.body.creator,
                        rating: req.body.rating
                    },
                    { new: true })
                if (!course) res.status(404).send("The student with ID " + req.params.id + " was not found.");
                res.send(Course);
            }
        }
    })
    
//DELETE METHODS
router.delete('/:id', async (req, res) => {
    const course = await Course.findByIdAndDelete(req.params.id)
        if (!course) res.status(404).send("The student with ID " + req.params.id + " was not found.");
        res.send(course);
    })
    
//GET ELEMENT BY ID Method
router.get('/:id', async (req, res) => {
    const course = await Course.findById(req.params.id);
        if (!course) req.status(404).send("The students with ID " + req.params.id + " was not found.");
        res.send(course);
    })
    
    
    
    
module.exports = router;

