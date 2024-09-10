// build your `/api/projects` router here
const express = require('express');
const router = express.Router()

const Projects = require('./model.js')

router.get('/', async (req, res, next) => {
    try {
        const projects = await Projects.getProjects()
        res.status(200).json(projects)
    } catch (err) {
        next(err)
    }  
})

router.post('/', async (req, res, next) => {
    try {
        const newProject = await Projects.postProject(req.body)
        res.status(201).json(newProject)
    } catch (err) {
        next(err)
    }
})

//error handling middleware

router.use((err, req, res, next) => {//eslint-disable-line
    res.status(err.status || 500).json({
      sageAdvice: 'Finding the real error is 90% of the bug fix',
      message: err.message,
      stack: err.stack,
    })
})

module.exports = router