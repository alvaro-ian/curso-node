const http = require('http')
const express = require('express')
const path = require('path')
const morgan = require('morgan')

const porta = 3000

const app = express()

const rotasPizzas = require('./rotas/pizzas')

app.use(morgan('dev'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/pizzas', rotasPizzas)

const servidor = http.createServer(app)
servidor.listen(porta, () => {
    console.log(`servidor escutando em http://localhost:${porta}/`)
})