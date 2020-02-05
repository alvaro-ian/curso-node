const express = require('express')
const Pizza = require('../models/pizza')

const pizzaRouter = express.Router()

pizzaRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        next()
    })
    .get((req, res, next) => {
        Pizza.find({}).exec()
            .then(res.json)
            .catch(next)
    })
    .post((req, res, next) => {
        Pizza.create(req.body)
            .then((pizza) => {
                return res.json(pizza)
            })
            .catch(next)
    })
    .put((req, res) => {
        res.statusCode = 403
        res.json({ error: 'operação PUT não suportada em /pizzas' })
    })
    .delete((req, res, next) => {
        Pizza.remove({}).exec()
            .then(res.json)
            .catch(next)
    })

pizzaRouter.route('/:pizzaId')
    .get((req, res, next) => {
        Pizza.findById(req.params.pizzaId).exec()
            .then(res.json)
            .catch(next)
    })
    .post((req, res) => {
        res.statusCode = 403
        res.json({
            error: 'operação POST não suportada em /pizzas/' + req.params.pizzaId
        })
    })
    .put((req, res, next) => {
        Pizza.findByIdAndUpdate(
            req.params.pizzaId,
            { $set: req.body },
            { new: true })
            .exec()
            .then(res.json)
            .catch(next)
    })
    .delete((req, res, next) => {
        Pizza.findByIdAndRemove(req.params.pizzaId)
            .exec()
            .then(res.json)
            .catch(next)
    })

module.exports = pizzaRouter