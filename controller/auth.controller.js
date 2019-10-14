var db = require('../db');
var md5 = require('md5');
var User = require('../model/user.model');

module.exports.login = function(req, res){
    res.render('auth/login');
}

module.exports.postLogin = function(req, res){
    var email = req.body.email;
    var password = req.body.password;
    var user = User.find({email: email});

    if(!user){
        res.render('auth/login',{
            errors: ['Email does not exist!']
        });
        return;
    }
        
    var hashedPassword = md5(password); //md5 hash password
    if(user.password !== hashedPassword){
        res.render('auth/login',{
            errors: ['Password is incorrect!']
        });
        return;
    }

    res.cookie('userId', user._id, {
        signed: true //signed cookie, convert cookie(id) to another cookie
    });
    res.redirect('/users');
}