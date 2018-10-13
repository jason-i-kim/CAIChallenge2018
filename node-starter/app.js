var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var registerRouter = require('./routes/register');
var registeredRouter = require('./routes/registered');
const bodyParser = require('body-parser');

var app = express();

//https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function renderHTML(path, response) {
	fs.readFile(path, null, function(error, data){
		if (error) {
			response.writeHead(404);
			response.write('File not found');
		}
		else {
			response.write(data);
		}
		response.end();
	});
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/register', registerRouter);
app.use('/registered', registeredRouter);

app.post('/registeraction', function(req, res) {
	var finalstr = (JSON.stringify(req.body)).substring(0, (JSON.stringify(req.body)).length - 1) + ', "faaid"="' + guid() + '"}';
	console.log(finalstr);/*
	document.body.innerHTML = '<h1>You have successfully registered!</h1><p>You can modify the text in the box to the left any way you like, and then click the "Show Page" button below the box to display the result here. Go ahead and do this as often and as long as you like.</p>';*/
	fs.appendFile('./data.txt', finalstr, function(err) {
		if (err) {
			return console.log(err);
		}
		console.log("saved!");
	});
	res.redirect('./registered');	
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
