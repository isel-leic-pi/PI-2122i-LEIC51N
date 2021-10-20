'use strict'

const fetch = require('node-fetch')

/**
 * 
 * @param {String} url 
 * @returns Promise.<Number> with the length of the body response.
 */
function getBodyLengthOf(url) {
    return fetch(url)
        .then(res => res.text()) // Promise<Promise<string>>
        .then(body => body.length)
}
const urls = {
    'github': 'https://github.com/',
    'MDN': 'https://developer.mozilla.org/en-US/',
    'stackoverflow': 'https://stackoverflow.com/'
}

Object
    .keys(urls)
    .forEach(prop => {
        console.log('Request to ' + prop + '...')
        getBodyLengthOf(urls[prop])
            .then(size => console.log(prop + ' body response has length of ' + size))
    })

