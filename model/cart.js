const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  userId: String,
  productId: String,
  quantity:Number,
  Price:Number,
  Common_Name:String,
  Botanical_Name:String,
  Photo_1:String,
  orderID:Number,
});

module.exports = mongoose.model('cartdatabase', cartItemSchema);
