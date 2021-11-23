'use strict'

const express = require('express')
const tasksRouter = require('./tasks-web-api')

/**
 * @param {Express} app 
 */
module.exports = function(app) {
    app.use(express.json()) // Parses of HTTP request body and populates req.body
    app.use(tasksRouter)

    // eslint-disable-next-line no-unused-vars
    app.use((err, req, res, next) => {
        res
            .status(err.status || 500)
            .json({ message: err.message })
    })
}