const mongoose = require('mongoose');

const stockschema = new mongoose.Schema({
    ID: Number,
    Common_Name: String,
    Stock: Number,
    Size: String
});

const stock = mongoose.model('stock', stockschema);

module.exports = stock;