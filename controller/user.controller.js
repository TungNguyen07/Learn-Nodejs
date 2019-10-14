var shortId = require('shortId');
//var db = require('../db');
var User = require('../model/user.model');
var md5 =  require('md5');

module.exports.index = async function(req, res){ //export module get user
	var page = parseInt(req.query.page) || 1;
	var perPage = 10;
	// var users = db.get('users').value();
	// var lengthOfPage = Math.ceil(users.length/10);
	// res.render('users/index',{
	// 	users: users.slice(begin, end),
	// 	page: page,
	// 	lengthOfPage: lengthOfPage
	// });
	var users = await User.find();
	var lengthOfPage = Math.ceil(users.length/10);
	var begin = (page - 1) * perPage;
	var end = page * perPage;
	res.render('users/index', {
		users: users,
		page: page,
		lengthOfPage: lengthOfPage
	});
}

module.exports.search =async function(req, res){ //export module search user
	var q = req.query.q;
	var page = parseInt(req.query.page) || 1;
	var perPage = 10;
	//var users = db.get('users').value();
	var begin = (page - 1) * perPage;
	var end = page * perPage;
	
	var users = await User.find({name: {
		$regex: new RegExp(q)
	}});
	//var matchedUsers = users.filter(user =>{
		//return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	//});
	var lengthOfPage = Math.ceil(users.length/10);
	res.render('users/search',{
		users: users.slice(begin, end),
		page: page,
		lengthOfPage: lengthOfPage,
		q: q
	});
}

module.exports.create = function(req, res) { //export module page create users
	res.render('users/create');
}

module.exports.id = async function(req, res){ //export module see info of user
	var id = req.params.id;
	var user = await User.findById(id);
	res.render('users/view',{
		user: user
	});
}

module.exports.postCreateUser = function(req, res){ //export module create user and add into array
	//req.body.id = shortId.generate(); //req.body return all value input from website
	req.body.avatar = req.file.path.split('\\').slice(1).join('/');
	req.body.password = md5(req.body.password);
	//db.get('users').push(req.body).write();
	User.create(req.body);
	res.redirect('/users');	//return page xxx/users;
}

module.exports.logOut = function(req, res, next){
	res.clearCookies('userId');
	res.redirect('auth/login');
}