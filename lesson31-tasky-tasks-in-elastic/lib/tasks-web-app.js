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
router.get('/users/:username/tasks/:id', (req, res, next) => {
    tasks
        .getTask(req.params.username, req.params.id)
        .then(task => {
            res.render('taskDetails', task)
        })
        .catch(err => next(err))
})
router.post('/users/:username/tasks', (req, res, next) => {
    const dueDate = new Date(req.body.dueDate)
    const days = Math.ceil((dueDate - Date.now()) / (24*60*60*1000))
    tasks
        .insertTask(req.params.username, days, req.body.title, req.body.desc)
        // .then(task => res.render('taskDetails', task)) // ERRADO
        /*
        .then(task => res
            .setHeader('Location', `/users/${req.params.username}/tasks/${task.id}`)
            .status(302)
            .end())
        */ // <=>
        .then(task => res.redirect(`/users/${req.params.username}/tasks/${task.id}`))
        .catch(err => next(err))
})

module.exports = router