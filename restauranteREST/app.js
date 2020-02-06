const mongoose = require('mongoose')
const Pizza = require('./models/pizza')
const url = 'mongodb://localhost:27017/pizzaPlace'

const connection = mongoose.connect(url)
connection.then((db) => {
  console.log('conectado ao mongodb')
}).catch(console.log)

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var comidasRouter = require('./routes/rotasComida');
var promosRouter = require('./routes/rotasPromo');
var combosRouter = require('./routes/rotasCombo');
// Exemplo
var pizzasRouter = require('./routes/rotasPizza');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/comidas', comidasRouter);
app.use('/promos', promosRouter);
app.use('/combos', combosRouter);
// Exemplo
app.use('/pizzas', pizzasRouter);

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
