
const mongoose = require('mongoose');

const wishlistschema = new mongoose.Schema({
    productId:Number,
    userId:String,
    Photo_1:String,
    Common_Name:String,
    Botanical_Name:String,
    Price:String,
    ID:String,
    class:String
});

const wishlist = mongoose.model('wishlist',wishlistschema);

module.exports = wishlist;