const express = require('express')
const Combo = require('../models/combo')

const comboRouter = express.Router()

const { verifyAdmin } = require('../autenticacao')

comboRouter.route('/')
    .all((req, res, next) => {
        res.status(200).append('Content-Type', 'application/json')
        next()
    })
    .get((req, res, next) => {
        Combo.find({}).exec()
            .then((combos) => {
                res.json(combos)
            })
            .catch(next)
    })
    .post(verifyAdmin, (req, res, next) => {
        Combo.create(req.body)
            .then((combo) => {
                res.json(combo)
            })
            .catch(next)
    })
    .put(verifyAdmin, (req, res) => {
        res.status(405).json({ error: 'operação PUT não suportada em /combos' })
    })
    .delete(verifyAdmin, (req, res, next) => {
        Combo.remove({}).exec()
            .then((combos) => {
                res.json(combos)
            })
            .catch(next)
    })

comboRouter.route('/:comboId')
    .get((req, res, next) => {
        Combo.findById(req.params.comboId).exec()
            .then((combo) => {
                res.json(combo)
            })
            .catch(next)
    })
    .post((req, res) => {
        res.status(405).json({ error: 'operação POST não suportada em ' + req.originalUrl })
    })
    .put((req, res, next) => {
        Combo.findByIdAndUpdate(req.params.comboId,
            { $set: req.body }, { new: true }).exec()
            .then((combo) => {
                res.json(combo)
            })
            .catch(next)
    })
    .delete((req, res, next) => {
        Combo.findByIdAndRemove(req.params.comboId).exec()
            .then((combo) => {
                res.json(combo)
            })
            .catch(next)
    })

module.exports = comboRouter