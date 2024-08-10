var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const employeesRouter = require('./routes/employees'); // เรียกใช้งานไฟล์ employees.js

const connectDB = require('./db'); // เรียกใช้งานไฟล์ db.js
const mongoURI = "mongodb+srv://admin:admin123456@employee.scllmfb.mongodb.net/?retryWrites=true&w=majority&appName=Employee";
connectDB(mongoURI); // เรียกใช้งานฟังก์ชัน connectDB

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Use the CORS middleware to allow requests from the frontend
app.use(cors({
  origin: 'http://localhost:3001' // Replace with your frontend URL
}));

// npm start 

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/employees', employeesRouter); // ใช้งาน employeesRouter ที่เราเรียกใช้งานไฟล์ employees.js มา

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
