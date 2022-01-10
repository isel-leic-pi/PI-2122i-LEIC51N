const app = require('express')()
app.use(require('cookie-parser')())

app.use((req, res, next) => {
    console.log(req.headers.cookie)
    console.log(req.cookies)
    next()
})
app.get('/hello', (req, res) => res.end('Hello World!'))

app.get('/boss/:boss', (req, res) => {
    // res.setHeader('Set-Cookie', `boss=${req.params.boss}; Path=/hello;`)
    res.cookie('boss', req.params.boss, { maxAge: 20000 })
    return res.end('Hello BOSS!')
})

app.get('/bro/:bro', (req, res) => {
    res.cookie('bro', req.params.bro)
    return res.end('Hello BOSS!')
})


app.listen(3000, () => {
    console.log('Listening on port 3000!')
})