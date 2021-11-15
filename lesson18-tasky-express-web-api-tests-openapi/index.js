'use strict'

const express = require('express')
const app = express()
const tasksRouter = require('./lib/tasks-web-api')
const PORT = 3000

app.use(tasksRouter)

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({ message: err.message })
})

app.listen(PORT, () => {
    console.log(`Tasky app listening on port ${PORT}!`)
})
