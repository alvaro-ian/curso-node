const http = require('http')
const fs = require('fs')
const path = require('path')

const hostname = 'localhost'
const port = 3000

const server = http.createServer((req, res) => {
    console.log('requisição:', req.method, req.url)
    console.log('cabeçalhos:', req.headers)
    if (req.method != 'GET') {
        res.statusCode = 405
        res.setHeader('Content-Type', 'text/html')
        res.setHeader('Allow', 'GET')
        return res.end(`<h1>Error 405: ${req.method} is not supported</h1>`)
    }
    let targetResource
    if (req.url == '/')
        targetResource = '/index.html'
    else
        targetResource = req.url
    const filePath = path.resolve('./public' + targetResource)
    fs.exists(filePath, (exists) => {
        if (!exists) {
            res.statusCode = 404
            res.setHeader('Content-Type', 'text/html');
            return res.end(`<h1>Error 404: ${req.url} not found</h1>`)
        }
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html')
        fs.createReadStream(filePath).pipe(res)
    })
})

server.listen(port, hostname, () => {
    console.log(`servidor escutando em http://${hostname}:${port}/`)
})