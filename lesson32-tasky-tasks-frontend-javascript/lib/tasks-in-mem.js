'use strict'

module.exports = {
    getUsers,
    insertUser,
    deleteUser,
    getAll,
    getTask,
    deleteTask,
    insertTask,
    updateTask
}

/**
 * Data storage for tasks objects where the key is
 * the username and the value is an array of Task instances.
 */
const tasks = {}

/**
 *  @returns {Promise.<Array.<String>>} Fullfield with a String array with th usernames.
 */
function getUsers() {
    return Promise.resolve(Object.keys(tasks))
}

/**
 * @param {String} username 
 * @returns {Promise.<undefined>} Fulfills with `undefined` upon success.
 */
function insertUser(username) {
    if(tasks[username]) return rejectPromise(409, username + ' already exists!')
    tasks[username] = []
    return Promise.resolve(undefined)
}

/**
 * @param {String} username 
 * @returns {Promise.<undefined>} Fulfills with `undefined` upon success.
 */
function deleteUser(username) {
    if(!tasks[username]) return rejectPromise(404, username + ' not available!') 
    delete tasks[username]
    return Promise.resolve(undefined)
}


/**
 * @param {String} username
 * @returns {Promise.<Array.<Task>>}
 */
function getAll(username) {
    const userTasks = tasks[username]
    return !userTasks
        ? rejectPromise(404, 'There is no username ' + username)
        : Promise.resolve(userTasks.map(t => { return {
            title: t.title,
            id: t.id,
            description: t.description,
            dueDate: t.dueDate.toISOString().slice(0, 10)
        }}))
}

function rejectPromise(status, msg) {
    const err =  Error(msg)
    err.status = status
    return Promise.reject(err)
}

/**
 * @param {String} username
 * @param {String} id Task id
 * @returns {Promise.<Task>} Fulfills with the Task object for given id or Rejected otherwise.
 */
function getTask(username, id) {
    const userTasks = tasks[username]
    if(!userTasks) {
        return rejectPromise(404, username + ' not available!') 
    }
    const ts = userTasks.filter(t => t.id === id)
    if(ts.length == 0) {
        return rejectPromise(404, 'No task with id ' + id) 
        
    }
    return Promise.resolve(ts[0])
}

/**
 * @param {String} username
 * @param {String} id Task id
 * @returns {Promise.<undefined>} Fulfills with `undefined` upon success.
 */
function deleteTask(username, id) {
    return getTask(username, id)
        .then(() => {
            const userTasks = tasks[username].filter(t => t.id != id)
            tasks[username] = userTasks
        })
}

/**
 * @typedef Task
 * @type {Object}
 * @property {String} id Unique Id
 * @property {Date} dueDate Date that task should complete.
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
function newTask(days, title, description) {
    const dt = new Date()
    dt.setDate(dt.getDate() + days)
    return {
        id: Math.random().toString(36).substr(2), 
        dueDate: dt, 
        title, 
        description}
}

/**
 * @param {String} username
 * @param {Number} due Number of days to task due.
 * @param {String} title 
 * @param {String} descriptions
 * @returns {Promise.<Task>} Fulfills with the new Task after save on disk.
 */
function insertTask(username, due, title, description) {     
    const task = new newTask(due, title, description)
    const userTasks = tasks[username]
    if(!userTasks) {
        tasks[username] = [task]
    } else
        userTasks.push(task)
    return Promise.resolve(task)
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