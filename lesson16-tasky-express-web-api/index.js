'use strict'

const tasks = require('./lib/tasks')

tasks
    .getAll()
    .then(tasks => tasks.forEach(t => console.log(t)))

// tasks.saveDummies()