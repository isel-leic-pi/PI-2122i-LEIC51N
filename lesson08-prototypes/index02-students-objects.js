'use strict'

function newStudent(name, nr, grades) {
    const std = {}
    std.name = name
    std.number = nr
    std.grades = grades
    std.average = average
    return std
}

/**
 * The binding called this in its body automatically 
 * points at the object that it was called on.
 */
const classroom = [
    newStudent('Ze Manel', 32423, [15, 17, 18, 14, 13]),
    newStudent('Maria Antonieta', 76354, [17, 15, 16, 13]),
    newStudent('Cromo da Bola', 98274, [12, 17, 10, 11]),
    newStudent('Antunes Marcelino',1832, [18, 14, 16, 17])
]

function average() {
    const sum = this.grades.reduce((p, c) => p + c, 0)
    return sum / this.grades.length
}

classroom
    .forEach(std => 
        console.log(std.name + ': ' + std.average())) // This implicit
