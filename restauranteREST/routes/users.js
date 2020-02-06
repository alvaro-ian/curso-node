var express = require('express');
var router = express.Router();

var User = require('../models/user')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', (req, res, next) => {
  const { username, password } = req.body
  User.create({ username, password })
    .then(res.json.bind(res))
    .catch(next)
})

router.post('/login', (req, res, next) => {
  function unauthorized() {
    const err = new Error('Não autorizado')
    res.setHeader('WWW-Authenticate', 'Basic')
    err.status = 401
    return next(err)
  }

  if (req.session.user) {
    return next()
  }

  const header = req.headers.authorization

  if (!header) return unauthorized()

  const credentials = Buffer.from(header.split(' ')[1], 'base64')
  const [username, password] = credentials.toString().split(':')

  User.findOne({ username })
    .then((user) => {
      if (user == null) {
        const err = new Error(`usuário ${username} não existe`)
        err.status = 403
        return next(err)
      } else if (user.password != password) {
        const err = new Error('credenciais incorretas')
        err.status = 403
        return next(err)
      } else if (user.username == username) {
        req.session.user = username
        res.status(200).end('usuário autenticado')
      }
    })
    .catch((err) => next(err))
})

router.get('/logout', (req, res, next) => {
  if (req.session) {
    req.session.destroy()
    res.clearCookie('session-id')
  }
  res.redirect('/')
})

module.exports = router;
