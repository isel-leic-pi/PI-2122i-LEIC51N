'use strict'

module.exports = {  // Common JS
    'flatten': flatten,
    'loop': loop,
}

// <=> export function flatten() { ... } // EcmaScript 6

/**
 * @param {Array.<Array>} arr 
 */
function flatten(arr) {
    // return arr.reduce((prev, curr) => prev.concat(curr), [])
    return reduce(arr, (prev, curr) => prev.concat(curr), [])
}

function reduce(arr, accumulator, initial) {
    let prev = initial
    for (let i = 0; i < arr.length; i++) {
        const curr = arr[i]
        prev = accumulator(prev, curr)
    }
    return prev
}
function loop(value, testFunc,funcUpdate, func) {    
    while(testFunc(value))
    {
        func(value)        
        value = funcUpdate(value)        
    }
}