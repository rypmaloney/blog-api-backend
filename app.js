require('./passport');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

require('dotenv').config();
const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');
const adminRounter = require('./routes/admin');
const authRouter = require('./routes/auth');

//MongoDB connection
const mongoDb = `${process.env.DB_URI}`;
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connection error'));

var corsOptions = {
    origin: 'http://localhost:3001', //current ADMIN localhost
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

var app = express();

app.use(logger('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
//API Routes: these routes will be accessed by the front end app
app.use('/api/', apiRouter);

//All CMS routes to display backend views and post
app.use('/admin/', cors(corsOptions), adminRounter);
//Login and sign up routes
app.use('/admin/', authRouter);

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
