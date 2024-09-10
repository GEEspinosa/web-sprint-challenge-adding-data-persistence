// build your `/api/tasks` router here
const express = require('express');
const router = express.Router();

const Tasks = require('./model.js')

router.get('/', async (req, res, next) => {
    try {
        const tasks = await Tasks.getTasks();
        res.status(200).json(tasks)
    } catch (err) {
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const newTask = await Tasks.postTask(req.body);
        res.status(201).json(newTask)
    } catch (err) {
        next(err)
    }
})

//error handling middleware

router.use(( err, req, res, next) => {//eslint-disable-line
    res.status(err.message || 500).json({
        sageAdvice: 'Finding the real error is 90% of the bug fix',
        message: err.message,
        stack: err.stack,
    })
})


module.exports = router