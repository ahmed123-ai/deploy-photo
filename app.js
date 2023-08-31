var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var mongoose = require('mongoose');
require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var galleryRouter = require('./routes/gallery');

var app = express();


 
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() =>  console.log('connection successful'))
  .catch((err) => console.error(err));

 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/dist/client')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use('/gallery', galleryRouter);

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app; 
