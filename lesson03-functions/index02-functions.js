'use strict'

let square = function(nr) {
    return nr * nr
}

function testSquare() {    
    console.log(square(3)) // 9
    console.log(square(4, 'super isel')) // 16
    console.log(square())  // NaN Not-a-number
    const foo = square
    console.log(foo(3))
    square = console.log
    square('Ola Isel')
}

const fibonacci = function(size) {
    let length = size
    const next = function (prev, curr) {
        if(length <= 0) return
        console.log(prev)
        --length
        next(curr, prev + curr)
    }
    
    next(0, 1)
}

function wrapValue(v) {
    return () => v
}

testSquare()
fibonacci(10)
fibonacci(8)

const f1 = wrapValue('super')
const f2 = wrapValue('isel')

console.log(f1())
console.log(f2())
