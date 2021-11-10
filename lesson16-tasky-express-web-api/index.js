'use strict'

const express = require('express')
const app = express()
const tasksRouter = require('./lib/tasks-web-api')
const tasks = require('./lib/tasks-db')
const port = 3000

app.use(tasksRouter)

app.listen(port, () => {
    console.log(`Tasky app listening on port ${port}!`)
})
