
const mongoose = require('mongoose');

const stokdetails = new mongoose.Schema({
    plantId: Number,
    plantName: String,
    vendername:String,
    invoiceNumber: Number,
    invoiceDate: Date,
    quantity: Number,
    price: Number
});

const stock = mongoose.model('stock-details', stokdetails);

module.exports = stock;
