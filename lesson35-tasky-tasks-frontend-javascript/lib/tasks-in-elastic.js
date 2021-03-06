'use strict'

const fetch = require('node-fetch')
let elasticUrl = 'http://localhost:9200/tasks'

module.exports = {
    setIndex, 
    getUrl,
    getUsers, 
    getAll,
    getTask,
    deleteTask,
    insertTask,
    updateTask
}

function setIndex(index) {
    elasticUrl = 'http://localhost:9200/' + index
}

function getUrl() {
    return elasticUrl
}

/**
 *  @returns {Promise.<Array.<String>>} Fullfield with a String array with th usernames.
 */
function getUsers() {
    return fetch(elasticUrl + '/_search')
        .then(res => { if(checkStatus(res, 200)) return res.json()})
        .then(doc => doc.hits.hits.map(d => d._source.username))
        .then(arr => [...new Set(arr)])
}

/**
 * @param {String} username
 * @returns {Promise.<Array.<Task>>}
 */
function getAll(username) {
    return fetch(elasticUrl + '/_search?q=username:' + username)
        .then(res => { if(checkStatus(res, 200)) return res.json()})
        .then(doc => doc.hits.hits.map(d => {
            d._source.id = d._id
            return d._source
        }))
}

/**
 * @param {String} username
 * @param {String} id Task id
 * @returns {Promise.<Task>} Fulfills with the Task object for given id or Rejected otherwise.
 */
function getTask(username, id) {
    return fetch(elasticUrl + '/_doc/' + id)
        .then(res => { if(checkStatus(res, 200, 'No task with id ' + id)) return res.json()})
        .then(doc => {
            if(doc._source.username != username)
                throw taskError (404, username + ' not available!')
            doc._source.id = doc._id
            return doc._source
        })
}

function taskError(status, message) {
    const err = new Error(message)
    err.status = status
    return err
}

/**
 * @param {String} username
 * @param {String} id Task id
 * @returns {Promise.<undefined>} Fulfills with `undefined` upon success.
 */
function deleteTask(username, id) {
    return getTask(username, id)
        .then(() => fetch(elasticUrl + '/_doc/' + id + '?refresh=true', {
            method: 'delete'
        }))
        .then(res => checkStatus(res, 200))
}

/**
 * @typedef Task
 * @type {Object}
 * @property {String} id Unique id based on the _id generated by ElasticSearch.
 * @property {String} username Username of the task's owner.
 * @property {Date} due Number of days to due task
 * @property {String} title 
 * @property {String} description
 */
/**
 * 
 * @param {Number} days Number of days to complete this task.
 * @param {String} title Title of this task.
 * @param {String} description Description of this task.
 * @returns {Task} New Task object.
 */
function newTask(username, days, title, description) {
    const dt = new Date()
    dt.setDate(dt.getDate() + days)
    return {
        username, 
        dueDate: dt, 
        title, 
        description}
}

/**
 * @param {String} username
 * @param {Number} due Number of days to task due.
 * @param {String} title 
 * @param {String} descriptions
 * @returns {Promise.<Task>} Fulfills with the new Task after save on Elastic.
 */
function insertTask(username, due, title, description) {     
    const task = newTask(username, due, title, description)
    return fetch(elasticUrl + '/_doc?refresh=true', {
        method: 'post',
        body:    JSON.stringify(task),
        headers: { 'Content-Type': 'application/json' },
    })
        .then(res => { if(checkStatus(res, 201)) return res.json() })
        .then(doc => {
            task.id = doc._id
            return task
        })
}

function checkStatus(res, code, msg) {
    if(res.status === code) return true
    const err = msg
        ? Error(msg)
        : Error(res.statusText)
    err.status = res.status
    throw err
}

/**
 * 
 * @param {String} username 
 * @param {String} id 
 * @param {Number} days 
 * @param {String} title 
 * @param {String} description 
 * @returns Promise<Task> with the already updated values
 */
function updateTask(username, id, days, title, description) {
    const dt = new Date()
    dt.setDate(dt.getDate() + days)
    return getTask(username,id)
        .then(task => {
            task.title = title
            task.dueDate = dt, 
            task.description = description
            return task
        })
}