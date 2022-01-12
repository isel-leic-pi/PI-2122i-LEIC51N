'use strict'

const tasks = require('./tasks-in-mem')
const router = require('express').Router()
const passport = require('passport')

router.get('/', (req, res) => res.render('index'))
router.get('/signup', (req, res) => {
    const alert = req.session ? req.session.alert : {}
    delete req.session.alert
    res.render('signup', { alert })
})
router.get('/users', getUsers)
router.use(checkAuthentication)
router.get('/users/:username/tasks', getUserTasks)
router.get('/users/:username/tasks/:id', getTask)
router.post('/users/:username/tasks', insertTask)

passport.serializeUser((user, done) => done(null, user.username))
passport.deserializeUser((username, done) => { tasks
    .getUser(username)
    .then(user => done(null, user))
    .catch(err => done(err))
})

function checkAuthentication(req, res, next) {
    if(!req.user) {
        req.session.alert = {
            title: 'Acess Forbiden',
            kind: 'danger',
            message: 'User must be authenticated to access user\'s data'
        }
        res.redirect('/signup')
    }
    else next()
}

function getUsers(req, res, next) {
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
}
function getUserTasks(req, res, next) {
    tasks
        .getAllTasks(req.params.username)
        .then(tasks => {
            res.render('tasks', {tasks})
        })
        .catch(err => next(err))
}
function getTask(req, res, next) {
    tasks
        .getTask(req.params.username, req.params.id)
        .then(task => {
            res.render('taskDetails', task)
        })
        .catch(err => next(err))
}
function insertTask(req, res, next) {
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
}

module.exports = router