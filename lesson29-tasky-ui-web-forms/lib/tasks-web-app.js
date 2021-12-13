'use strict'

const tasks = require('./tasks-in-mem')
const router = require('express').Router()

router.get('/', (req, res) => {
    res.render('index')
})
router.get('/users', (req, res, next) => {
    tasks
        .getUsers()
        .then(users => {
            const model = users.map(username => {return {
                username: username,
                path: `/users/${username}/tasks`
            }})
            return res.render('users', { 'users': model })
        })
        .catch(err => next(err))
})
router.get('/users/:username/tasks', (req, res, next) => {
    tasks
        .getAll(req.params.username)
        .then(tasks => {
            res.render('tasks', {tasks})
        })
        .catch(err => next(err))
})

module.exports = router