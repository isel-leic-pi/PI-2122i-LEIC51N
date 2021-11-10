const express = require('express')
const app = express()
const wiki = require('./wiki-router')
const port = 3000

app.use('/wiki', wiki)

app.get('/dummy', (req, res) => {
    res.send('Dummy')
})

app.use((req, res, next) => {
    console.log('Filter handler')
    next()
})

app.get('/', (req, res) => {
    res.send('Hello World!') // content-type = text/html
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})
