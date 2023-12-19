const mongoose = require('mongoose');

const trancationschema = new mongoose.Schema({
    ID: Number,
    userID:String,
    orderID:Number,
    Common_Name: String,
    Price: Number,
    Size: String,
    date:String,
    quantity: Number,
    Description : String,
});

const trancation = mongoose.model('trancation', trancationschema);

module.exports = trancation;