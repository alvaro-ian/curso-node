const http = require('http')
const express = require('express')
const path = require('path')
const morgan = require('morgan')

const porta = 3000

const app = express()
app.use(morgan('dev'))

app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res) => {
    console.log('cabeçalhos:', req.headers)
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')
    res.end('<h1>Hello express app</h1>')
})

const servidor = http.createServer(app)
servidor.listen(porta, () => {
    console.log(`servidor escutando em http://localhost:${porta}/`)
})