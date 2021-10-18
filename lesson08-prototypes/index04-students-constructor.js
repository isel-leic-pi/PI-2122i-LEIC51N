'use strict'


/**
 * Constructor function 
 * => to be called with new operator
 * => receives the implicit parameter this to the new object
 */
function Student(name, nr, grades) {
    this.name = name
    this.number = nr
    this.grades = grades
}

/**
 * The Student.prototype is the object prototype shared 
 * with all instances created from new Student(...)
 */
Student.prototype.average = function() {
    const sum = this.grades.reduce((p, c) => p + c, 0)
    return sum / this.grades.length
}

Student.prototype.toString = function() {
    return JSON.stringify(this)
}

/**
 * The binding called this in its body automatically 
 * points at the object that it was called on.
 */
const classroom = [
    new Student('Ze Manel', 32423, [15, 17, 18, 14, 13]),
    new Student('Maria Antonieta', 76354, [17, 15, 16, 13]),
    new Student('Cromo da Bola', 98274, [12, 17, 10, 11]),
    new Student('Antunes Marcelino',1832, [18, 14, 16, 17])
]

classroom
    .forEach(std => 
        /**
         * property lookup -- tracks the protype chain to loo for a property
         */
        console.log(std.name + ': ' + std.average())) // This implicit

/**
 * Lookup for toString in student object => then StudentPrototype => then to Object
 */
console.log(classroom[1].toString())