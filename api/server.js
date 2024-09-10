const express = require('express')
const server = express()


const ProjectRouter = require('./project/router.js')
const ResourceRouter = require('./resource/router.js')
const TaskRouter = require('./task/router.js')


server.use(express.json())

server.use('/api/projects', ProjectRouter)
server.use('/api/resources', ResourceRouter)
server.use('/api/tasks', TaskRouter)

module.exports = server