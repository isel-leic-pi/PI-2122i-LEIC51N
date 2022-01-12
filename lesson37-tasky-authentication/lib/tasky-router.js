'use strict'

const express = require('express')
const tasksWebApi = require('./tasks-web-api')
const tasksWebApp = require('./tasks-web-app')
const passport = require('passport')
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
    app.use(require('cookie-parser')())
    app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }))
    app.use(passport.initialize())
    app.use(passport.session())
    /**
     * Route handlers
     */
    app.use('/api', tasksWebApi)
    app.use(tasksWebApp)
    
    // eslint-disable-next-line no-unused-vars
    app.use((err, req, res, next) => {
        res
            .status(err.status || 500)
            .json({ message: err.message })
    })
}