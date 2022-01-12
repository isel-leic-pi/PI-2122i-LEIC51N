'use strict'

const request = require('supertest')
const express = require('express')
const tasks = require('./../lib/tasks-in-mem')
const jestOpenAPI = require('jest-openapi').default

// Load an OpenAPI file (YAML or JSON) into this plugin
jestOpenAPI(process.cwd() + '/openapi.yaml');

/**
 * Setup express app
 */
const app = express()
require('./../lib/tasks-web-api').setTasksDb(tasks)
require('./../lib/tasky-router')(app)

function insertDummies() {
    const prms = [
        tasks.insertUser('gamboa'),
        tasks.insertUser('rambo'),
        tasks.insertTask('gamboa', 7, 'swim-mile', 'Achieve 1 mile swimming open water.'),
        tasks.insertTask('gamboa', 3, 'pi-workout', 'Complete the first workout of Web Dev course.'),
        tasks.insertTask('gamboa', 20, 'peaa', 'Finish the book of Patterns of Enterprise Application Architecture by Martin Fowler.'),
        tasks.insertTask('rambo', 4, 'room-manage', 'Manage all books and stuff in my room')
    ]
    return Promise.all(prms)
}

const DATA_PATH = './__tests__/data/'

beforeAll(() => { 
    return insertDummies()
})

test('Get all tasks for username gamboa', () => {
    return request(app)
        .get('/api/users/gamboa/tasks')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(resp => {
            // Assert that the HTTP response satisfies the OpenAPI spec
            expect(resp).toSatisfyApiSpec()
            return expect(resp.body.length).toBe(3)
        })
})

test('Get all tasks for unkown username', () => {
    return request(app)
        .get('/api/users/EUREUREUR/tasks')
        .expect(404)
})

test('Update a task for username rambo', () => {
    return tasks
        .getAllTasks('rambo')
        .then(tasks => {
            expect(tasks.length).toBe(1)
            return request(app)
                .put('/api/users/rambo/tasks/' + tasks[0].id)
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
