var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    email: String,
    password: String,
    phone: String,
    name: String,
    avatar: String
    },
    {versionKey: false});


var User = mongoose.model('User', userSchema, 'users');

module.exports = User;