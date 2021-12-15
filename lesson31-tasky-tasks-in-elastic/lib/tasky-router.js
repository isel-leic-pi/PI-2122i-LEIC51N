'use strict'

const express = require('express')
const tasksWebApi = require('./tasks-web-api')
const tasksWebApp = require('./tasks-web-app')

/**
 * @param {Express} app 
 */
module.exports = function(app) {
    /**
     * Setup
     */
    app.set('view engine', 'hbs')
    app.use(express.json()) // Parses of HTTP request body in JSON and populates req.body
    app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
    app.use(express.static('public'))
    // app.get('/bootstrap.min.css', (req, res) => { res.sendFile(path.join(process.cwd(), 'bootstrap.min.css')) })
    // app.get('/todo.png', (req, res) => { res.sendFile(path.join(process.cwd(), 'todo.png')) })
    /**
     * Route handlers
     */
    app.use(tasksWebApp)
    app.use('/api', tasksWebApi)

    // eslint-disable-next-line no-unused-vars
    app.use((err, req, res, next) => {
        res
            .status(err.status || 500)
            .json({ message: err.message })
    })
}