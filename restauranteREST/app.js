const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017/restauranteREST'

const connection = mongoose.connect(url)
connection.then((db) => {
  console.log('conectado ao mongodb')
}).catch(console.log)

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const session = require('express-session')
const FileStore = require('session-file-store')(session)

const passport = require('passport')
const auth = require('./autenticacao');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const pratosRouter = require('./routes/rotasPrato');
const promosRouter = require('./routes/rotasPromo');
const combosRouter = require('./routes/rotasCombo');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('secret'));
/*
app.use(session({
  name: 'session-id',
  secret: 'secret',
  saveUninitialized: false,
  resave: false,
  store: new FileStore()
}));
*/

app.use(passport.initialize());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/pratos', pratosRouter);
app.use('/promos', promosRouter);
app.use('/combos', auth.verifyUser, combosRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
