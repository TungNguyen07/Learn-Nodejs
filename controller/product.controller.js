var shortId = require('shortId');
var db = require('../db');

module.exports.index = function(req, res, next){
    var page = parseInt(req.query.page) || 1;
	var perPage = 10;
	var products = db.get('products').value();
	var lengthOfPage = Math.ceil(products.length/10);
	var begin = (page - 1) * perPage;
	var end = page * perPage;
	res.render('products/index',{
		products: products.slice(begin, end),
		page: page,
		lengthOfPage: lengthOfPage
	});
}

module.exports.search = function(req, res, next){
    var q = req.query.q;
	var page = parseInt(req.query.page) || 1;
	var perPage = 10;
	var products = db.get('products').value();
	var begin = (page - 1) * perPage;
	var end = page * perPage;
	var matchedProducts = products.filter(product =>{
		return product.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	});
	var lengthOfPage = Math.ceil(matchedProducts.length/10);
	res.render('products/search',{
		products: matchedProducts.slice(begin, end),
		page: page,
		lengthOfPage: lengthOfPage,
		q: q
	});
}