
const mongoose = require('mongoose');

const orderschema = new mongoose.Schema({
    orderID:Number,
    productId:Number,
    userId:String,
    Price:Number,
    quantity:Number,
    statusbar:String,
    date:String,
});

const order = mongoose.model('order',orderschema);

module.exports = order;