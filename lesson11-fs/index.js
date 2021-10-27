'use strict'

const files = require('./files')

files
    .copy('dum.txt', 'out.txt')
    .then(() => console.log('Copy finished!'))

files
    .copy('unknown.txt', 'out.txt')            // Promise<undefined>
    .then(() => console.log('Copy finished!')) // Promise<undefined>
    .catch(err => console.log(err))  // Promise<undefined>