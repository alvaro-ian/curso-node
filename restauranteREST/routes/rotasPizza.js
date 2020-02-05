const express = require('express')
const Pizza = require('../models/pizza')

const pizzaRouter = express.Router()

pizzaRouter.route('/')
    .all((req, res, next) => {
        res.status(200).append('Content-Type', 'application/json')
        next()
    })
    .get((req, res, next) => {
        Pizza.find({}).exec()
            .then((pizzas) => {
                res.json(pizzas)
            })
            .catch(next)
    })
    .post((req, res, next) => {
        Pizza.create(req.body)
            .then((pizza) => {
                res.json(pizza)
            })
            .catch(next)
    })
    .put((req, res) => {
        res.status(405).json({ error: 'operação PUT não suportada em /pizzas' })
    })
    .delete((req, res, next) => {
        Pizza.remove({}).exec()
            .then((pizzas) => {
                res.json(pizzas)
            })
            .catch(next)
    })

pizzaRouter.route('/:pizzaId')
    .get((req, res, next) => {
        Pizza.findById(req.params.pizzaId).exec()
            .then((pizza) => {
                res.json(pizza)
            })
            .catch(next)
    })
    .post((req, res) => {
        res.status(405).json({ error: 'operação POST não suportada ' + req.originalUrl })
    })
    .put((req, res, next) => {
        Pizza.findByIdAndUpdate(req.params.pizzaId,
            { $set: req.body }, { new: true }).exec()
            .then((pizza) => {
                res.json(pizza)
            })
            .catch(next)
    })
    .delete((req, res, next) => {
        Pizza.findByIdAndRemove(req.params.pizzaId).exec()
            .then((pizza) => {
                res.json(pizza)
            })
            .catch(next)
    })

module.exports = pizzaRouter