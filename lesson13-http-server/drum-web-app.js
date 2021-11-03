'use strict'

const fetch = require('node-fetch')
const http = require('http')

const server = http.createServer(listener)

server.listen(8080, () => {
    console.log('Listening on port 8080')
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
    fetch('http://localhost:4000/artists/' + country)
        .then(resp => resp.json())
        .then(arr => arr.map(r => `<tr><td>${r}</td></tr>`).join('\n'))
        .then(rows => {
            resp.setHeader('content-type', 'text/html')
            resp.write(template(rows))
            resp.end() // Sends the HTTP response and finishes
        })
}

function template(rows) {
    return `
<html>
   <head><title>DRUM</title></head>
   <body>
      <table>
         <tr><th>Artist</th></tr>
         ${rows}
      </table>
   </body>
</html>
`
}