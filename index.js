var bodyParser = require('body-parser');
var port = 8080;
var router = require('./routes/user.route');
var express = require('express');
var app = express();
var login = require('./routes/auth.route');
var authLogin = require('./validate/login.validate');
var cookiePaser = require('cookie-parser');
var productRoute = require('./routes/products.route');
var cartRoute = require('./routes/cart.route');
var sessionMiddleware = require('./middleware/sessions.middleware');
var mongoose = require('mongoose');
//var db = require('./db');
//var shortId = require('shortId');

mongoose.connect('mongodb://localhost/express');
app.set('view engine', 'pug');
app.set('views', './views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookiePaser('oyMawj0nbQ'));
app.use(sessionMiddleware);


app.get('/', function(req, res){ //homepage
	res.render('index',{
		name: 'Tung'
	})
});

app.use('/users',authLogin.authLogin, router); //use router with /users at the first
app.use('/auth', login); //user router with /auth at the first
app.use('/products', productRoute);
app.use('/cart', cartRoute);

app.listen(port, function(){ //run server
	console.log('Server listening on port '+ port);
});

//alksdjasklds