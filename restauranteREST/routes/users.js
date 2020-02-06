var express = require('express');
var router = express.Router();

const passport = require('passport')
const { getToken } = require('../autenticacao')

var User = require('../models/user')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', (req, res, next) => {
  User.register(new User({
    username: req.body.username
  }), req.body.password, (err, usuario) => {
    if (err) {
      return next(err)
    } else {
      passport.authenticate('local')(req, res, () => {
        res.send('usuário adicionado com sucesso')
      })
    }
  })
})

router.post('/login', passport.authenticate('local'), (req, res) => {
  const token = getToken({ _id: req.user._id })
  res.send({ success: true, token, message: 'usuário autenticado' })
})

module.exports = router;
