// build your `/api/resources` router here
const express = require('express');
const router = express.Router();

const Resources = require('./model.js')

router.get('/', async (req, res, next) => {
    try {
        const resources = await Resources.getResources();
        res.status(200).json(resources)
    } catch (err) {
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const newResource = await Resources.postResource(req.body)
        res.status(201).json(newResource)
    } catch (err) {
        next(err)
    }
})

//error handling middleware

router.use(( err, req, res, next) => {//eslint-disable-line
    res.status(err.status || 500).json({
        sageAdvice: 'Finding the real error is 90% of the bug fix',
        message: err.message,
        stack: err.stack,
    })
})

module.exports = router