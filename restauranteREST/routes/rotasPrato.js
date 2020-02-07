const express = require('express')
const Prato = require('../models/prato')

const pratoRouter = express.Router()

const { verifyAdmin } = require('../autenticacao')

pratoRouter.route('/')
    .all((req, res, next) => {
        res.status(200).append('Content-Type', 'application/json')
        next()
    })
    .get((req, res, next) => {
        Prato.find({}).exec()
            .then((pratos) => {
                res.json(pratos)
            })
            .catch(next)
    })
    .post(verifyAdmin, (req, res, next) => {
        Prato.create(req.body)
            .then((prato) => {
                res.json(prato)
            })
            .catch(next)
    })
    .put(verifyAdmin, (req, res) => {
        res.status(405).json({ error: 'operação PUT não suportada em /pratos' })
    })
    .delete(verifyAdmin, (req, res, next) => {
        Prato.remove({}).exec()
            .then((pratos) => {
                res.json(pratos)
            })
            .catch(next)
    })

pratoRouter.route('/:pratoId')
    .get((req, res, next) => {
        Prato.findById(req.params.pratoId).exec()
            .then((prato) => {
                res.json(prato)
            })
            .catch(next)
    })
    .post(verifyAdmin, (req, res) => {
        res.status(405).json({ error: 'operação POST não suportada ' + req.originalUrl })
    })
    .put(verifyAdmin, (req, res, next) => {
        Prato.findByIdAndUpdate(req.params.pratoId,
            { $set: req.body }, { new: true }).exec()
            .then((prato) => {
                res.json(prato)
            })
            .catch(next)
    })
    .delete(verifyAdmin, (req, res, next) => {
        Prato.findByIdAndRemove(req.params.pratoId).exec()
            .then((prato) => {
                res.json(prato)
            })
            .catch(next)
    })

pratoRouter.route('/:pratoId/comments')
    .all((req, res, next) => {
        res.status(200).append('Content-Type', 'application/json')
        next()
    })
    .get((req, res, next) => {
        Prato.findById(req.params.pratoId).exec()
            .then((prato) => {
                const { comments = null } = prato || {}
                res.json({ comments })
            })
            .catch(next)
    })
    .post((req, res, next) => {
        Prato.findById(req.params.pratoId).exec()
            .then((prato) => {
                if (prato != null) {
                    prato.comments.push({
                        author: req.user.username,
                        comment: req.body.comment,
                        rating: req.body.rating
                    })
                    return prato.save()
                } else {
                    res.json({ error: 'prato não encontrado' })
                }
            })
            .then((prato) => {
                res.json(prato)
            })
            .catch(next)
    })
    .put((req, res, next) => {
        const { originalUrl } = req
        res.status(405).json({ error: `operação PUT não suportada em ${originalUrl}` })
    })
    .delete(verifyAdmin, (req, res, next) => {
        Prato.findById(req.params.pratoId).exec()
            .then((prato) => {
                if (prato != null) {
                    for (let i = (prato.comments.length - 1); i >= 0; i--) {
                        prato.comments.id(prato.comments[i]._id).remove()
                    }
                    return prato.save()
                } else {
                    res.json({ error: 'prato não encontrado' })
                }
            })
            .then((prato) => {
                res.json(prato)
            })
            .catch(next)
    })

pratoRouter.route('/:pratoId/comments/:commentId')
    .all((req, res, next) => {
        res.status(200).append('Content-Type', 'application/json')
        next()
    })
    .get((req, res, next) => {
        Prato.findById(req.params.pratoId).exec()
            .then((prato) => {
                if (prato != null && prato.comments.id(req.params.commentId) != null) {
                    res.json(prato.comments.id(req.params.commentId))
                } else if (prato == null) {
                    res.json({ error: 'prato não encontrado' })
                } else {
                    res.json({ error: 'commentário não encontrado' })
                }
            })
            .catch(next)
    })
    .post((req, res) => {
        const { originalUrl } = req
        res.status(405).json({ error: `operação POST não suportada em ${originalUrl}` })
    })
    .put((req, res, next) => {
        Prato.findById(req.params.pratoId).exec()
            .then((prato) => {
                if (prato != null && prato.comments.id(req.params.commentId) != null) {
                    if (req.user.username !== prato.comments.id(req.params.commentId).author) {
                        res.send('usuario não tem permissão para editar o comentário')
                    } else {
                        if (req.body.rating) {
                            prato.comments.id(req.params.commentId).rating = req.body.rating
                        }
                        if (req.body.comment) {
                            prato.comments.id(req.params.commentId).comment = req.body.comment
                        }
                        return prato.save()
                    }
                } else if (prato == null) {
                    res.json({ error: 'prato não encontrado' })
                } else {
                    res.json({ error: 'commentário não encontrado' })
                }
            })
            .then((prato) => {
                res.json(prato)
            })
            .catch(next)
    })
    .delete((req, res, next) => {
        Prato.findById(req.params.pratoId).exec()
            .then((prato) => {
                if (prato != null && prato.comments.id(req.params.commentId) != null) {
                    if (req.user.username !== prato.comments.id(req.params.commentId).author) {
                        res.send('usuario não tem permissão para editar o comentário')
                    } else {
                        prato.comments.id(req.params.commentId).remove()
                        return prato.save()
                    }
                } else if (prato == null) {
                    res.json({ error: 'prato não encontrado' })
                } else {
                    res.json({ error: 'commentário não encontrado' })
                }
            })
            .then((prato) => {
                res.json(prato)
            })
            .catch(next)
    })

module.exports = pratoRouter