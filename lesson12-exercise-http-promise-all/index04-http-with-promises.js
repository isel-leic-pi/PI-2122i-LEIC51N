'use strict'

const fetch = require('node-fetch')

/**
 * @param {String} url 
 * @returns Promise.<Number> with the length of the body response.
 */
function getBodyLengthOf(url) {
    return fetch(url)
        .then(res => res.text()) // Promise<Promise<string>>
        .then(body => body.length)
}

/**
 * @param {Array.<String>} urls
 * @returns {Promise.<Number>} With the sum of bodies lengths of the HTTP requests to given urls
 */
function sumBodiesLengths_NOT_SCALING(urls) {
    /**
     * DO NOT use Promise.all() nor new Promise((resolve, reject) => {...})
     */
    return Object
        .values(urls)
        .reduce((prev, curr) => prev
            .then(result => {
                console.log(`Requesting ${curr}...`)
                return getBodyLengthOf(curr)
                    .then(val => {
                        console.log(`====> Response of ${curr} size =${val}`)
                        return val + result
                    })
            }), 
        Promise.resolve(0))
}

function sumBodiesLengths(urls) {
    /**
     * DO NOT use Promise.all() nor new Promise((resolve, reject) => {...})
     */
    return Object
        .values(urls)
        .map(url => {
            console.log(`Requesting ${url}...`)
            return getBodyLengthOf(url)
        })
        .reduce((prev, curr) => prev
            .then(result => curr.then(val => {
                console.log(`====> Response of size =${val}`)
                return val + result
            })), 
        Promise.resolve(0))
}
const urls = {
    'github': 'https://github.com/',
    'MDN': 'https://developer.mozilla.org/en-US/',
    'stackoverflow': 'https://stackoverflow.com/'
}

/*
Object
    .keys(urls)
    .forEach(prop => {
        console.log('Request to ' + prop + '...')
        getBodyLengthOf(urls[prop])
            .then(size => console.log(prop + ' body response has length of ' + size))
    })
*/

/*
sumBodiesLengths(urls)
    .then(sum => console.log('TOTAL size of bodies = ' + sum))
*/

const prms = Object
    .values(urls)
    .map(url => {
        console.log(`Requesting ${url}...`)
        return getBodyLengthOf(url)
    })

Promise
    .all(prms)
    .then(sizes => sizes.reduce((p,c) => p + c))
    .then(sum => console.log('SUM = ' + sum))