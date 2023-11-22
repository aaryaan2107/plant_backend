const mongoose = require('mongoose');


const trend = new mongoose.Schema({
    ID: String,
    Family: String,
    Common_Name: String,
    Botanical_Name: String,
    Photo_1: String,
    trending: Boolean
})

const model = mongoose.model('trending', trend);
module.exports = model;
