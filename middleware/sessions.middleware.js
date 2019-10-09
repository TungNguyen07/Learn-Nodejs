var shortid = require('shortid');
var id = shortid.generate();
var db = require('../db');

module.exports = function(req,res, next){
    if(!req.signedCookies.sessionId){
        res.cookie('sessionId', id, {
            signed: true
        });
        db.get('sessions').push({
            id: id
        }).write();
    }
    next();
}