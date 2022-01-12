'use strict'

const express = require('express')
const app = express()
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')
const openapi = YAML.load('./openapi.yaml')
const tasks = require('./lib/tasks-in-mem')
const crypto = require('crypto')

const PORT = 3000

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapi))
require('./lib/tasky-router')(app)

insertDummies().then(() => {
    app.listen(PORT, () => {
        console.log(`Tasky app listening on port ${PORT}!`)
    })    
})

function insertDummies() {
    const prms = [
        tasks.insertUser('muadib', digest('bb')),
        tasks.insertUser('rambo', digest('xpto')),
        tasks.insertTask('muadib', 7, 'swim-mile', 'Achieve 1 mile swimming open water.'),
        tasks.insertTask('muadib', 3, 'pi-workout', 'Complete the first workout of Web Dev course.'),
        tasks.insertTask('muadib', 20, 'peaa', 'Finish the book of Patterns of Enterprise Application Architecture by Martin Fowler.'),
        tasks.insertTask('rambo', 4, 'room-manage', 'Manage all books and stuff in my room')
    ]
    return Promise.all(prms)
}

function digest(message) {
    return crypto
        .createHash('sha256')
        .update(message)
        .digest('hex')
}