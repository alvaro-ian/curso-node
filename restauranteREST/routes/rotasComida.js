const express = require('express')
const rotas = express.Router()

rotas.route('/')
    .all((req, res, next) => {
        res.status(200)
        res.append('Content-Type', 'text/plain')
        next()
    })
    .get((req, res) => {
        res.end('enviando o cardápio!')
    })
    .post((req, res) => {
        const { name, description } = req.body
        res.end(`adicionando a comida: ${name}, ${description}`)
    })
    .put((req, res) => {
        res.status(405)
        res.append('Allow', ['GET', 'POST', 'DELETE'])
        res.end('operação PUT não é suportada em /comidas')
    })
    .delete((req, res) => {
        res.end('deletando todo o cardápio!')
    })

rotas.route('/:comidaId')
    .all((req, res, next) => {
        res.status(200)
        res.append('Content-Type', 'text/plain')
        next()
    })
    .get((req, res) => {
        const { comidaId } = req.params
        res.end(`informações da comida: ${comidaId}`)
    })
    .post((req, res) => {
        const { comidaId } = req.params
        res.status(405)
        res.append('Allow', ['GET', 'PUT', 'DELETE'])
        res.end(`operação POST não é suportada em /comidas/${comidaId}`)
    })
    .put((req, res) => {
        const { comidaId } = req.params
        const { name, description } = req.body
        res.write(`atualizando comida: ${comidaId}`)
        res.write(`novo nome: ${name}`)
        res.end(`nova descrição: ${description}`)
    })
    .delete((req, res) => {
        const { comidaId } = req.params
        res.end(`deletando comida: ${comidaId}`)
    })
    
module.exports = rotas