'use strict'

/**
 * The binding called this in its body automatically 
 * points at the object that it was called on.
 */
const classroom = [
    { name: 'Ze Manel', number: 32423, grades: [15, 17, 18, 14, 13], average },
    { name: 'Maria Antonieta', number: 76354, grades: [17, 15, 16, 13], average },
    { name: 'Cromo da Bola', number: 98274, grades: [12, 17, 10, 11], average },
    { name: 'Antunes Marcelino', number: 1832, grades: [18, 14, 16, 17], average },
]

function average() {
    const sum = this.grades.reduce((p, c) => p + c, 0)
    return sum / this.grades.length
}

classroom
    .forEach(std => 
        console.log(std.name + ': ' + std.average())) // This implicit
