'use strict'

/**
 * Demo of what you should NEVER do!
 */

let finish = false

setTimeout(() => {
    console.log('Finishing loop...')
    finish = true
}, 1000) // dispatch event after 1 second

while(!finish)
    console.log('doing nothing...')