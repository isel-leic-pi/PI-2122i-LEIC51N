'use strict'

const express = require('express')
const tasks = require('./tasks-in-mem')
const router = express.Router()

router.get('/users/:username/tasks', (req, res, next) => {
    tasks
        .getAll(req.params.username)
        .then(tasks => res.json(tasks))
        .catch(next)
})

router.get('/users/:username/tasks/:taskId', (req, res, next) => {
    tasks
        .getTask(req.params.username, req.params.taskId)
        .then(task => res.json(task))
        .catch(next)
})

router.delete('/users/:username/tasks/:taskId', (req, res, next) => {
    tasks
        .deleteTask(req.params.username, req.params.taskId)
        .then(() => res.json({message: `Task with id ${req.params.taskId} deleted!`}))
        .catch(next)
})

router.put('/users/:username/tasks/:taskId', (req, res, next) => {
    tasks
        .updateTask(
            req.params.username,
            req.params.taskId,
            req.body.days,
            req.body.title,
            req.body.description
        )
        .then(task => res.json({
            message: `Task with id ${task.id} updated!`,
            task: JSON.stringify(task)
        }))
        .catch(next)
})


module.exports = router