'use strict'

const fetch = require('node-fetch')
const tasks = require('./../lib/tasks-in-elastic')

function insertDummies() {
    const prms = [
        tasks.insertTask('luke', 7, 'swim-mile', 'Achieve 1 mile swimming open water.'),
        tasks.insertTask('luke', 3, 'pi-workout', 'Complete the first workout of Web Dev course.'),
        tasks.insertTask('luke', 20, 'peaa', 'Finish the book of Patterns of Enterprise Application Architecture by Martin Fowler.'),
        tasks.insertTask('vader', 4, 'room-manage', 'Manage all books and stuff in my room')
    ]
    return Promise.all(prms)
}

beforeAll(() => { 
    tasks.setIndex('tasks-test')
    /*
     * First drop and recreate test Index 
     */
    return fetch(tasks.getUrl(), { method: 'delete'})
        .then(() => fetch(tasks.getUrl(), { method: 'put' }))
        .then(data => insertDummies())
})

test('Get all users', () => {
    return tasks
        .getUsers(users => {
            expect(users).toContain('luke')
            expect(users).toContain('vader')
        })
})


test('Get all tasks', () => {
    return Promise.all([
            tasks.getAll('luke'),
            tasks.getAll('vader')
        ])
        .then(tasks => {
            tasks = tasks.flatMap(tasks => tasks)
            return expect(tasks.length).toBe(4)
        })
})

test('Get a single task for given username and ID', () => {
    return tasks
        .getAll('luke')
        .then(tasks => {
            const all = tasks.filter(t => t.title.includes('swim'))
            if(all.length == 0) throw Error('Missing swim task!')
            return all[0]
        })
        .then(swim => tasks.getTask('luke', swim.id)) // Promise<Task>
        .then(task => expect(task.title).toBe('swim-mile'))
})

test('Create and delete a task', async () => {
    const shoes = await tasks.insertTask('rambo', 3, 'run-shoes', 'Buy new running shoes')
    const actual = await tasks.getTask('rambo', shoes.id)
    expect(actual.title).toBe('run-shoes')
    expect(actual.description).toBe('Buy new running shoes')
    await tasks.deleteTask('rambo', shoes.id)
    const allAfter = await tasks.getAll('rambo')
    expect(allAfter.length).toBe(0)
})
