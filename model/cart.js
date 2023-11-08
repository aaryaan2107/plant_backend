const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  userId: String,
  productId: String,
  quantity:Number,
  Price:Number,
  orderID:Number,
});

module.exports = mongoose.model('cartdatabase', cartItemSchema);
