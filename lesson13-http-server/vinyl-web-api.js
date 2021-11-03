'use strict'

const lastfm = require('./lastfm')
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
    const [, artists, country] = req.url.split('/')
    if(artists != 'artists' || !country) {
        resp.statusCode = 404
        resp.write(JSON.stringify({error: 'Path not supported!'}))
        resp.end()
        return
    }
    lastfm
        .getTopArtists(country)
        .then(arr => {
            resp.setHeader('content-type', 'application/json')
            resp.write(JSON.stringify(arr))
            resp.end() // Sends the HTTP response and finishes
        })
}