const mongoose = require('mongoose');

const trancationschema = new mongoose.Schema({
    ID: Number,
    orderID:Number,
    Common_Name: String,
    Size: String,
    date:String,
    quantity: Number,
    Description : String,
});

const trancation = mongoose.model('trancation', trancationschema);

module.exports = trancation;