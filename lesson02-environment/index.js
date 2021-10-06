'use strict'

function foo() {

    /**
     * DON'T DO THIS
     * => Use let or const accordingly
     */
    person = new Object()
    person.id = 81354813
    console.log(person.id)   // > 81354813
    console.log(person.name) // > undefined
}

foo()

person.id = "Ze Manel"
person.address = "Rua Rosa"

console.log(person)
