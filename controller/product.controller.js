var shortId = require('shortId');
//var db = require('../db');
var Product = require('../model/product.model');

module.exports.index = async function(req, res, next){
    var page = parseInt(req.query.page) || 1;
	var perPage = 10;
	var products = await Product.find();
	var lengthOfPage = Math.ceil(products.length/10);
	var begin = (page - 1) * perPage;
	var end = page * perPage;
	res.render('products/index',{
		products: products.slice(begin, end),
		page: page,
		lengthOfPage: lengthOfPage
	});
}

module.exports.search = async function(req, res, next){
    var q = req.query.q;
	var page = parseInt(req.query.page) || 1;
	var perPage = 10;
	var products = await Product.find();
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
