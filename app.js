const express = require('express')
const categories = require("./Routes/categories")
const mongoose = require('mongoose')
const students = require("./Routes/students")
const courses = require('./Routes/courses')

mongoose.connect('mongodb://127.0.0.1/learningPlatform').then(()=> console.log("Connected with database")).catch(err => console.log("connection failed", err))
const app = express();
app.use(express.json())
app.use('/api/categories',categories)
app.use('/api/students', students)
app.use('/api/courses', courses)


const port = process.env.PORT || 3000
app.listen(port, ()=>console.log(`listening on ${port}..`))   //Template Literals ${} require backticks