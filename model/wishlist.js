const mongoose = require('mongoose');

const wishlistschema = new mongoose.Schema({
    productId:Number,
    userId:String,
    class:String
});

const wishlist = mongoose.model('wishlist',wishlistschema);

module.exports = wishlist;