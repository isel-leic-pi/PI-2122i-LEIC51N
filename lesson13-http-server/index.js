'use strict'

const http = require('http')

const server = http.createServer(listener)

server.listen(4000, () => {
    console.log('Listening on port 4000')
})
/**
 * @param {http.IncomingMessage} req 
 * @param {http.ServerResponse} resp 
 */
function listener(req, resp) {
    console.log(req.url)
    resp.write('Hello World!')
    resp.end() // Sends the HTTP response and finishes
}