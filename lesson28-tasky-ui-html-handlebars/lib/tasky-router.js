'use strict'

const express = require('express')
const tasksRouter = require('./tasks-web-api')
const path = require('path')

/**
 * @param {Express} app 
 */
module.exports = function(app) {
    /**
     * Setup
     */
    app.set('view engine', 'hbs')
    app.use(express.json()) // Parses of HTTP request body and populates req.body
    app.use(express.static('public'))
    // app.get('/bootstrap.min.css', (req, res) => { res.sendFile(path.join(process.cwd(), 'bootstrap.min.css')) })
    // app.get('/todo.png', (req, res) => { res.sendFile(path.join(process.cwd(), 'todo.png')) })
    /**
     * Route handlers
     */
    app.get('/', (req, res) => {
        res.render(path.join(process.cwd(), 'views/index.html'))
    })
    app.get('/users', (req, res) => {
        res.sendFile(path.join(process.cwd(), 'views/users.html'))
    })
    app.use(tasksRouter)

    // eslint-disable-next-line no-unused-vars
    app.use((err, req, res, next) => {
        res
            .status(err.status || 500)
            .json({ message: err.message })
    })
}