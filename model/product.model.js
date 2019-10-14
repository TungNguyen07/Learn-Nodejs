var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    description: String,
    name: String,
    avatar: String
    },
    {versionKey: false
    
});

var Product = mongoose.model('Product', productSchema, 'Products');

module.exports = Product;