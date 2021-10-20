'use strict'

let finish = false

setTimeout(() => {
    console.log('********* Finishing loop...')
    finish = true
}, 1000) // dispatch event after 1 second


function doingSomething() {
    console.log('doing nothing...')
    if(!finish)
        setTimeout(() => doingSomething(), 10)
}

doingSomething()
    