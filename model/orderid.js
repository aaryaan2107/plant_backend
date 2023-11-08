const mongoose = require('mongoose');

const orderidschema = new mongoose.Schema({
    orderID:Number,
    randomId:String,
    userId:String,
    Price:Number,
    quantity:Number,
    address:String,
});

const orderid = mongoose.model('orderid',orderidschema);

module.exports = orderid;