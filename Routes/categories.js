const express = require("express");
const {Category, validate} = require("../Models/categoryModel")
const router = express.Router();


//GET METHOD
router.get('/', async (req, res) => {
    const categories = await Category.find();
    res.send(categories);  
})

//POST METHOD
router.post('/', async(req, res) => {
    const { error } = validate(req.body);
    if (error) res.status(400).send(error.details[0].message);
    else {
        let newCategory = new Category ({
            name: req.body.name
        })
        await newCategory.save();
        res.send(newCategory);
    }
})

//PUT METHOD
router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) res.status(400).send(error.details[0].message);
    else {
        const category = await Category.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })
        if (!category) res.status(404).send("The category with ID " + req.params.id + " was not found.");
    
        res.send(category);
    }
})

//DELETE METHODS
router.delete('/:id', async (req, res) => {
    const category = await Category.findByIdAndDelete(req.params.id)
    if (!category) res.status(404).send("The category with ID " + req.params.id + " was not found.");
    res.send(category);
})

//GET ELEMENT BY ID Method
router.get('/:id', async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (!category) req.status(404).send("The category with ID " + req.params.id + " was not found.");
    res.send(category);
})



module.exports = router;
