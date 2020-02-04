const http = require('http')
const express = require('express')
const path = require('path')
const morgan = require('morgan')

const porta = 3000

const app = express()

app.use(morgan('dev'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.all('/pizzas', (req, res, next) => {
    res.status(200)
    res.append('Content-Type', 'text/plain')
    next()
})

app.get('/pizzas', (req, res) => {
    res.end('enviando todas as pizzas!')
})

app.post('/pizzas', (req, res) => {
    const p = req.body
    res.end(`adicionando a pizza: ${p.name}, ${p.description}`)
})

app.put('/pizzas', (req, res) => {
    res.status(405)
    res.append('Allow', ['GET', 'POST', 'DELETE'])
    res.end('operação PUT não é suportada em /pizzas')
})

app.delete('/pizzas', (req, res) => {
    res.end('deletando todas as pizzas!')
})

const servidor = http.createServer(app)
servidor.listen(porta, () => {
    console.log(`servidor escutando em http://localhost:${porta}/`)
})