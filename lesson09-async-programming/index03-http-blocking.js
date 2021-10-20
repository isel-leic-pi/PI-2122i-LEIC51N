'use strict'

const request = require('sync-request')

/**
 * 
 * @param {String} url 
 * @returns Number with the length of the body response.
 */
function getBodyLengthOf(url) {
    return request('GET', url).getBody().length
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
        const size = getBodyLengthOf(urls[prop])
        console.log(prop + ' body response has length of ' + size)
    })

