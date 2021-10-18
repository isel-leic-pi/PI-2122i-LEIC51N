'use strict'

const { expect } = require('@jest/globals')
const { flatten } = require('./../lib/utils')
const utils = require('./../lib/utils')

test('Flattening and array with 3 sub arrays', () => {
    // AAAA
    /*
     * Arrange 
     */
    const arr = [[4,5,6], [3], [9,7]]
    /*
     * Act 
     */
    const actual = arr.flatten() // utils.flatten(arr)
    /*
     * Assert = Compare the expected value with the actual value 
     */
    expect(actual).toEqual([4,5,6,3,9,7])
})

test('Flattening an empty array should return an empty array', () => {
    expect(flatten([])).toEqual([])
})

test('Loop from 3 to 1', () => {
    const arr = [1, 2, 3]
    utils.loop(
        3, 
        n => n > 0,  // predicate
        n => n - 1,  // update function
        item => expect(item).toBe(arr.pop())) // consumer

})