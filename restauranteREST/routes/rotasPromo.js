const express = require('express')
const Promo = require('../models/promo')

const promoRouter = express.Router()

const { verifyAdmin } = require('../autenticacao')

promoRouter.route('/')
    .all((req, res, next) => {
        res.status(200).append('Content-Type', 'application/json')
        next()
    })
    .get((req, res, next) => {
        Promo.find({}).exec()
            .then((promos) => {
                res.json(promos)
            })
            .catch(next)
    })
    .post(verifyAdmin, (req, res, next) => {
        Promo.create(req.body)
            .then((promo) => {
                res.json(promo)
            })
            .catch(next)
    })
    .put(verifyAdmin, (req, res) => {
        res.status(405).json({ error: 'operação PUT não suportada em /promos' })
    })
    .delete(verifyAdmin, (req, res, next) => {
        Promo.remove({}).exec()
            .then((promos) => {
                res.json(promos)
            })
            .catch(next)
    })

promoRouter.route('/:promoId')
    .get((req, res, next) => {
        Promo.findById(req.params.promoId).exec()
            .then((promo) => {
                res.json(promo)
            })
            .catch(next)
    })
    .post(verifyAdmin, (req, res) => {
        res.status(405).json('operação POST não suportada ' + req.originalUrl)
    })
    .put(verifyAdmin, (req, res, next) => {
        Promo.findByIdAndUpdate(req.params.promoId,
            { $set: req.body }, { new: true }).exec()
            .then((promo) => {
                res.json(promo)
            })
            .catch(next)
    })
    .delete(verifyAdmin, (req, res, next) => {
        Promo.findByIdAndRemove(req.params.promoId).exec()
            .then((promo) => {
                res.json(promo)
            })
            .catch(next)
    })

module.exports = promoRouter