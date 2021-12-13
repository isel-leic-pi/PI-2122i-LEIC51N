'use strict'

const express = require('express')
const app = express()
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')
const openapi = YAML.load('./openapi.yaml')
const tasks = require('./lib/tasks-in-mem')

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
        tasks.insertTask('gamboa', 7, 'swim-mile', 'Achieve 1 mile swimming open water.'),
        tasks.insertTask('gamboa', 3, 'pi-workout', 'Complete the first workout of Web Dev course.'),
        tasks.insertTask('gamboa', 20, 'peaa', 'Finish the book of Patterns of Enterprise Application Architecture by Martin Fowler.'),
        tasks.insertTask('rambo', 4, 'room-manage', 'Manage all books and stuff in my room')
    ]
    return Promise.all(prms)
}