var shortId = require('shortId');
var db = require('../db');

module.exports.index = function(req, res){ //export module get user
	var page = parseInt(req.query.page) || 1;
	var perPage = 10;
	var users = db.get('users').value();
	var lengthOfPage = Math.ceil(users.length/10);
	var begin = (page - 1) * perPage;
	var end = page * perPage;
	res.render('users/index',{
		users: users.slice(begin, end),
		page: page,
		lengthOfPage: lengthOfPage
	});
}

module.exports.search = function(req, res){ //export module search user
	var q = req.query.q;
	var page = parseInt(req.query.page) || 1;
	var perPage = 10;
	var users = db.get('users').value();
	var begin = (page - 1) * perPage;
	var end = page * perPage;
	var matchedUsers = users.filter(user =>{
		return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	});
	var lengthOfPage = Math.ceil(matchedUsers.length/10);
	res.render('users/search',{
		users: matchedUsers.slice(begin, end),
		page: page,
		lengthOfPage: lengthOfPage,
		q: q
	});
}

module.exports.create = function(req, res) { //export module page create users
	res.render('users/create');
}

module.exports.id = function(req, res){ //export module see info of user
	var id = req.params.id;
	var user = db.get('users').find({id: id}).value();
	res.render('users/view',{
		user: user
	});
}

module.exports.postCreateUser = function(req, res){ //export module create user and add into array
	req.body.id = shortId.generate(); //req.body return all value input from website
	req.body.avatar = req.file.path.split('\\').slice(1).join("/");

	db.get('users').push(req.body).write();
	res.redirect('/users');	//return page xxx/users
}