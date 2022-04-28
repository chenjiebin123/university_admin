var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const auth = require('./utils/auth'); //中间组件，检测是否登录
const cors = require('cors')



const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

var admin_Router = require('./routes/admin');
var appUser_Router = require('./routes/appUser');
var newPortRouter = require('./routes/newPort');
var majorRouter = require('./routes/major');
var universityRouter = require('./routes/university');


var api_Router = require('./routes/api/appRoutes');

var app = express();

// view engine setup
app.engine('html', require('express-art-template'));
app.set('view options', {
    debug: process.env.NODE_ENV !== 'production'
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use(express.urlencoded({ extended: false }));


app.use('/home',auth.checkLogin, indexRouter);
app.use('/back', usersRouter);


app.use('/admin/admin',auth.checkLogin,admin_Router);
app.use('/admin/appUser',auth.checkLogin,appUser_Router);
app.use('/admin/newPort',auth.checkLogin,newPortRouter);
app.use('/admin/major',auth.checkLogin,majorRouter);
app.use('/admin/university',auth.checkLogin,universityRouter);


//接口
app.use('/api', api_Router);



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
