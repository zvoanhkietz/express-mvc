var express = require('express');
var path = require('path');
var fs = require('fs');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var layouts = require('express-ejs-layouts');
var router = require('./config/routes');
var Db = require('./libs/Models/Db');
var app = express();

// connect database
var dbInstance = new Db(app);
global._db = dbInstance.connect();

// require all controller
var controllers = {};
fs.readdirSync(__dirname + '/controllers').forEach(function(file) {
	if (file.match(/.+\.js/g) !== null && file !== 'index.js') {
		var name = file.replace('.js', '');
		var controller = require('./controllers/' + file);
		app.use(function(req, res, next) {
			controller.init(req, res);
			next();
		});
		controllers[name] = controller;
	}
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(layouts);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// load all route & controller
router(app, controllers);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
