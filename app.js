var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var path = require('path');
var templating = require('consolidate');
var request = require('request');
var urlutils = require('url');
var cheerio = require('cheerio');
var cookie = require('cookie');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');
var passport = require('passport');
var request = require('request');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var md5 = require('md5');

var session = require('cookie-session');
app.use(session({keys : ['secret']}));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/static', express.static('public'));/*
app.engine('hbs', templating.handlebars);
app.set('view engine', 'hbs');
app.set('views', __dirname);*/
app.use(express.static(path.join(__dirname, 'client')));

app.get('/', function(req, res){
	res.render('index.html');
});

app.use(session({keys : ['secret']}));
app.use(passport.initialize());
app.use(passport.session());

var config = require('./config');
var pool = mysql.createPool(config);
var taskModel = require('./model/model')(pool);
var view = require('./view/view')
var controller = require('./controller/controller')(taskModel, view, request, cheerio);

app.get('/getWords', controller.getWords);
app.patch('/changeStatusWord', controller.setStatusWord);

app.listen(8080);
console.log('Listening 8080...');
