'use strict'

const request = require('supertest')
const express = require('express')
const tasksRouter = require('./../lib/tasks-web-api')
const tasks = require('./../lib/tasks-db')
const fs = require('fs/promises')

/**
 * Setup express app
 */
const app = express()
app.use(tasksRouter)

function insertDummies() {
    const prms = [
        tasks.insertTask('gamboa', 7, 'swim-mile', 'Achieve 1 mile swimming open water.'),
        tasks.insertTask('gamboa', 3, 'pi-workout', 'Complete the first workout of Web Dev course.'),
        tasks.insertTask('gamboa', 20, 'peaa', 'Finish the book of Patterns of Enterprise Application Architecture by Martin Fowler.'),
        tasks.insertTask('rambo', 4, 'room-manage', 'Manage all books and stuff in my room')
    ]
    return Promise.all(prms)
}

const DATA_PATH = './__tests__/data/'

beforeAll(() => { 
    tasks.changePath(DATA_PATH)
    return fs
        .mkdir(DATA_PATH, { recursive: true }) // create folder if not exists
        .then(() => insertDummies())
})

afterAll(() => {
    return fs
        .readdir(DATA_PATH)
        .then(files => files.map(f => fs.unlink(DATA_PATH + f)))
        .then(prms => Promise.all(prms))
})

test('Get all tasks for username gamboa', () => {
    return request(app)
        .get('/users/gamboa/tasks')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(resp => {
            return expect(resp.body.length).toBe(3)
        })
})

test('Get all tasks for unkown username', () => {
    return request(app)
        .get('/users/EUREUREUR/tasks')
        .expect(404)
})

test('Update a task for username rambo', () => {
    return tasks
        .getAll('rambo')
        .then(tasks => {
            expect(tasks.length).toBe(1)
            return request(app)
                .put('/users/rambo/tasks/' + tasks[0].id)
                .send({
                    days: 7,
                    title: 'bla bla',
                    description: 'say bla bla'
                })
                .set('Accept', 'application/json')
                .expect(200)
                .expect('Content-Type', /json/)
                .then(resp => {
                    expect(resp.body.message).toBe(`Task with id ${tasks[0].id} updated!`)
                })
        })
})
