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
var sessionExp = require('express-session');
var passport = require('passport');
var request = require('request');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var generator = require('generate-password');
var uuid = require('node-uuid');
var RememberMeStrategy = require('passport-remember-me').Strategy;

//app.use(session({keys : ['secret'], cookie: { maxAge: 60000 }}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/static', express.static('public'));
app.use(express.static(path.join(__dirname, 'client')));

app.use(session({keys : ['secret']}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('remember-me'));
//app.use(app.router);

var config = require('./config');
var pool = mysql.createPool(config);
var taskModel = require('./model/model')(pool);
var view = require('./view/view')
var controller = require('./controller/controller')(taskModel, view, request, cheerio);
var controllerUser =  require('./controller/controllerUser')(taskModel, view, nodemailer, smtpTransport, generator, uuid);

var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(
	{usernameField: 'useremail', passwordField: 'password'},
	function(username, password, done){
		taskModel.checkUser(username, function(err, ansQuery){
			if (ansQuery.length != 0){
				if(ansQuery[0].activated == 1) 
				{
					if (password != ansQuery[0].password)
						return done(null, false, {message: 'Неправильний пароль'});
					return done(null, ansQuery[0])
				}						
			}
			return done(null, false, {message: 'Неправильний логін'});
		});
	}
));

passport.serializeUser(function(user, done){
	var id;
	console.log(user);
	if(user.unIdUser != undefined){
		id = user.unIdUser
	}
	else {
		id = user[0].unIdUser;
	}
	
	done(null,id);
	
});

passport.deserializeUser(function(id, done){
	taskModel.findUserById(id, function(err, user){
		done(err, user);
	});
	
});	

var mustBeAuthenticated = function(req, res, next){
	req.isAuthenticated() ? /**/ next() : res.send({ success : false, message : 'authentication failed' });
}

passport.use(new RememberMeStrategy({
                    key: 'remember_me' //Указываем имя cookie, где хранится ваш token
                },						
  function(token, done) {
    taskModel.findUser(token, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      return done(null, user);
    });
  },
  function(user, done) {
    var token = generator.generate({length: 64, numbers: true});
    taskModel.writeToken(token, user[0].unIdUser, function(err, Newuser) {
      if (err) { return done(err); }
      return done(null, token);
    });
  }
));


app.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err); // will generate a 500 error
    }
    // Generate a JSON response reflecting authentication status
    if (! user) {
      return res.send({ success : false, message : 'authentication failed' });
    }
    req.login(user, loginErr => {
      if (loginErr) {
        return next(loginErr);
      }
		if (req.body.rememberme) {
			 var token = generator.generate({length: 64, numbers: true});
    		 taskModel.writeTokenByEmail(token, req.body.useremail, function(err) {
			  	if (err) { /*return done(err);*/ }
			  	res.cookie('remember_me', token, { path: '/', httpOnly: true, maxAge: 604800000 }).send({ success : true, message : 'authentication succeeded' }); // 7 days
			}(req, res));
        }
		else {
			res.send({ success : true, message : 'authentication succeeded' });
		}
    });      
  })(req, res, next);
});

app.get('/logout', function(req, res){
	taskModel.delToken(req.session.passport.user, function(err, answerDB){
		if(!err){
			req.logout();
			res.cookie('remember_me',{}, { path: '/', httpOnly: true, maxAge: -604800000 }).send({ success : true, message : 'logout' });
		}
	});
	
});



app.get('/', function(req, res){
	res.render('index.html');
});
app.get('/cabinet', mustBeAuthenticated);
app.get('/cabinet/*', mustBeAuthenticated);

app.get('/cabinet', controllerUser.okCabinter);
app.get('/cabinet/getCatalog', controller.getCatalog);
app.post('/cabinet/addCard', controller.addCardToUser);

app.post('/isemail', controllerUser.isEmail);
app.post('/confirmRegist', controllerUser.confirmRegist);
app.get('/getWords', controller.getWords);
app.patch('/changeStatusWord', controller.setStatusWord);

app.listen(8080);
console.log('Listening 8080...');
