const mongoose = require('mongoose');


const orderschema = new mongoose.Schema({
    orderID:Number,
    productId:Number,
    Common_Name:String,
    userId:String,
    Price:Number,
    quantity:Number,
    statusbar:String,
    Photo_1:String,
    date:String,
});

const order = mongoose.model('order',orderschema);

module.exports = order;