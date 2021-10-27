'use strict'

const fetch = require('node-fetch')

/**
 * @param {String} url 
 * @returns Promise.<Number> with the length of the body response.
 */
async function getBodyLengthOf(url) {
    console.log('Requesting ' + url)
    const resp = await fetch(url)
    const body = await resp.text()
    console.log('=====> Response from ' + url)
    return body.length
}
async function sumBodiesLengths_NOT_SCALING(urls) {
    let sum = 0
    for (const prop in urls) {
        sum += await getBodyLengthOf(urls[prop])
    }
    return sum
}

/**
 * @param {Object} urls 
 * @returns {Promise.<Number>}
 */
async function sumBodiesLengths(urls) {
    const prms = Object.values(urls).map(getBodyLengthOf) 
    let sum = 0
    for (const p of prms) {
        sum += await p
    }
    return sum
}


const urls = {
    'github': 'https://github.com/',
    'MDN': 'https://developer.mozilla.org/en-US/',
    'stackoverflow': 'https://stackoverflow.com/'
}

/*
Object
    .keys(urls)
    .forEach(async prop => {
        console.log('Request to ' + prop + '...')
        const size = await getBodyLengthOf(urls[prop])
        console.log(prop + ' body response has length of ' + size)
    })
*/

sumBodiesLengths(urls)
    .then(sum => console.log('TOTAL size of bodies = ' + sum))

/*
 * Push an illegal URL and run again 
 */
urls.dummy = 'lkadjlfjadljf'
main()

async function main() {
    try {
        const sum = await sumBodiesLengths(urls)
        console.log('TOTAL size of bodies = ' + sum)
    } catch(e) {
        console.log(e)
    }
}