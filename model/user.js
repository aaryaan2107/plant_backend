const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    phone: Number,
    home_address: String,
    office_address: String,
    other_address: String,
    role: String
});

const user = mongoose.model('userdata',userschema);

module.exports = user;