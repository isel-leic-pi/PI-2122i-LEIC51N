'use strict'

const express = require('express')
const app = express()
const PORT = 3000

require('./lib/tasky-router')(app)

app.listen(PORT, () => {
    console.log(`Tasky app listening on port ${PORT}!`)
})
