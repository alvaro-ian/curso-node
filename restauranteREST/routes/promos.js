const express = require('express')
const rotas = express.Router()

rotas.route('/')
    .all((req, res, next) => {
        res.status(200)
        res.append('Content-type', 'text-plain')
        next()
    })
    .get((req, res) => {
        res.end('enviando promoções!')
    })
    .post((req, res) => {
        const { name, description } = req.body
        res.end(`adicionando a promoção: ${name}, ${description}`)
    })
    .put((req, res) => {
        res.status(405)
        res.append('Allow', ['GET', 'POST', 'DELETE'])
        res.end('operação PUT não é suportada em /promos')
    })
    .delete((req, res) => {
        res.end('deletando todas as promoções')
    })

rotas.route('/:promoId')
    .all((req, res, next) => {
        res.status(200)
        res.append('Content-type', 'text-plain')
        next()
    })
    .get((req, res) => {
        const { promoId } = req.params
        res.end(`informações da promo: ${promoId}`)
    })
    .post((req, res) => {
        const { promoId } = req.params
        res.status(405)
        res.append('Allow', ['GET', 'PUT', 'DELETE'])
        res.end(`operação POST não é suportada em /promos/${promoId}`)
    })
    .put((req, res) => {
        const { promoId } = req.params
        const { name, description } = req.body
        res.write(`atualizando promoção: ${promoId} `)
        res.write(`novo nome: ${name}, `)
        res.end(`nova descrição: ${description}`)
    })
    .delete((req, res) => {
        const { promoId } = req.params
        res.end(`deletando promoção: ${promoId}`)
    })

module.exports = rotas