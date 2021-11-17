'use strict'

const express = require('express')
const app = express()
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')
const openapi = YAML.load('./openapi.yaml')

const PORT = 3000

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapi))
require('./lib/tasky-router')(app)

app.listen(PORT, () => {
    console.log(`Tasky app listening on port ${PORT}!`)
})
