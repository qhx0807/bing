var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var schedule = require('node-schedule');


var bingUtil = require('./utlis/bingUtil')
var dbUtil = require('./utlis/dbUtil')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testRouter = require('./routes/test');
var picRouter = require('./routes/picture');
var photoRouter = require('./routes/photo');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/', testRouter);
app.use('/', picRouter);
app.use('/', photoRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


var rule = new schedule.RecurrenceRule()
rule.hour = 8;
rule.minute = 0;
rule.second = 0;
var j = schedule.scheduleJob(rule, function(){
  var opts = {}
  bingUtil.fetchDailyPic(opts, function (data) {
    dbUtil.insert('picture', data, function(result){
      if (result.insertId){
        console.log(new Date().toLocaleString()+ '今日已更新' + result.insertId)
      }else{
        console.log(new Date().toLocaleString()+ '更新失败')
      }
    })
  })
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
