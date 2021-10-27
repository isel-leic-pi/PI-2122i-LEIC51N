'use strict'

const fs = require('fs/promises')

module.exports = { copy }

/**
 * @param {String} from Input file
 * @param {String} to Output file
 * @returns {Promise.<undefined>} Fulfills with undefined upon success.
 */
function copy(from, to) {
    const pInput = fs.readFile(from)
    return pInput.then(data => fs.writeFile(to, data))
}